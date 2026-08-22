export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");

    return res.status(405).json({
      error: "Method not allowed."
    });
  }

  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecretKey) {
    console.error("PETS & DOGUE: STRIPE_SECRET_KEY is missing.");

    return res.status(500).json({
      error: "Stripe verification is not configured."
    });
  }

  try {
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body || "{}")
        : req.body || {};

    const sessionId = String(body.sessionId || "").trim();

    if (
      !sessionId ||
      !(
        sessionId.startsWith("cs_") ||
        sessionId.startsWith("cs_test_") ||
        sessionId.startsWith("cs_live_")
      )
    ) {
      return res.status(400).json({
        error: "Invalid Stripe Checkout Session ID."
      });
    }

    /*
      Step 1:
      Retrieve the Checkout Session directly from Stripe.
    */

    const sessionUrl =
      "https://api.stripe.com/v1/checkout/sessions/" +
      encodeURIComponent(sessionId) +
      "?expand[]=subscription&expand[]=customer";

    const sessionResponse = await fetch(sessionUrl, {
      method: "GET",

      headers: {
        Authorization: `Bearer ${stripeSecretKey}`
      }
    });

    const session = await sessionResponse.json();

    if (!sessionResponse.ok) {
      console.error(
        "PETS & DOGUE Stripe session verification error:",
        session
      );

      return res.status(sessionResponse.status || 500).json({
        verified: false,
        error:
          session &&
          session.error &&
          session.error.message
            ? session.error.message
            : "Unable to verify Stripe Checkout Session."
      });
    }

    /*
      Checkout must actually be completed.

      For a free-trial subscription the payment_status
      may be "no_payment_required", which is valid because
      £0 is due today.

      For immediately charged subscriptions it is normally "paid".
    */

    const checkoutComplete =
      session.status === "complete";

    const acceptablePaymentStatus =
      session.payment_status === "paid" ||
      session.payment_status === "no_payment_required";

    if (!checkoutComplete || !acceptablePaymentStatus) {
      return res.status(200).json({
        verified: false,
        state: "checkout_not_complete"
      });
    }

    /*
      Step 2:
      Resolve the Stripe Subscription.
    */

    let subscription = session.subscription || null;

    if (typeof subscription === "string") {
      const subscriptionResponse = await fetch(
        "https://api.stripe.com/v1/subscriptions/" +
          encodeURIComponent(subscription),
        {
          method: "GET",

          headers: {
            Authorization: `Bearer ${stripeSecretKey}`
          }
        }
      );

      const subscriptionData =
        await subscriptionResponse.json();

      if (!subscriptionResponse.ok) {
        console.error(
          "PETS & DOGUE Stripe subscription verification error:",
          subscriptionData
        );

        return res.status(subscriptionResponse.status || 500).json({
          verified: false,
          error:
            subscriptionData &&
            subscriptionData.error &&
            subscriptionData.error.message
              ? subscriptionData.error.message
              : "Unable to verify Stripe subscription."
        });
      }

      subscription = subscriptionData;
    }

    if (!subscription || typeof subscription !== "object") {
      return res.status(200).json({
        verified: false,
        state: "subscription_missing"
      });
    }

    /*
      A valid PETS & DOGUE membership can be:
      - trialing: 30-day free trial
      - active: paid monthly or annual membership
    */

    const activeStatuses = [
      "trialing",
      "active"
    ];

    if (!activeStatuses.includes(subscription.status)) {
      return res.status(200).json({
        verified: false,
        state: subscription.status || "subscription_not_active"
      });
    }

    /*
      Step 3:
      Make sure this subscription belongs to PETS & DOGUE.

      The create-checkout endpoint writes these metadata
      values into subscription_data.
    */

    const metadata =
      subscription.metadata &&
      typeof subscription.metadata === "object"
        ? subscription.metadata
        : {};

    if (metadata.project !== "PETS & DOGUE") {
      console.error(
        "PETS & DOGUE: Stripe subscription project metadata mismatch.",
        subscription.id
      );

      return res.status(403).json({
        verified: false,
        error: "This subscription does not belong to PETS & DOGUE."
      });
    }

    const allowedPlans = [
      "free",
      "monthly",
      "annual"
    ];

    let plan =
      String(
        metadata.plan ||
        (
          session.metadata &&
          session.metadata.plan
        ) ||
        ""
      ).trim();

    if (!allowedPlans.includes(plan)) {
      return res.status(200).json({
        verified: false,
        state: "membership_plan_missing"
      });
    }

    /*
      Step 4:
      Resolve member email.

      Depending on Stripe's Checkout state it can be found
      in customer_details, customer or subscription metadata.
    */

    let memberEmail = "";

    if (
      session.customer_details &&
      session.customer_details.email
    ) {
      memberEmail =
        String(session.customer_details.email).trim();
    }

    if (
      !memberEmail &&
      session.customer &&
      typeof session.customer === "object" &&
      session.customer.email
    ) {
      memberEmail =
        String(session.customer.email).trim();
    }

    if (
      !memberEmail &&
      metadata.member_email
    ) {
      memberEmail =
        String(metadata.member_email).trim();
    }

    /*
      Step 5:
      Determine membership dates.

      Stripe timestamps are Unix seconds.
    */

    function stripeDate(timestamp) {
      const value = Number(timestamp);

      if (!Number.isFinite(value) || value <= 0) {
        return null;
      }

      return new Date(value * 1000).toISOString();
    }

    const startedAt =
      stripeDate(subscription.start_date) ||
      stripeDate(subscription.created) ||
      new Date().toISOString();

    let validUntil = null;
    let nextPayment = null;

    /*
      Free trial:
      trial_end is the moment the first £1 monthly payment
      becomes due if the member does not cancel.
    */

    if (
      subscription.status === "trialing" &&
      subscription.trial_end
    ) {
      validUntil =
        stripeDate(subscription.trial_end);

      nextPayment =
        stripeDate(subscription.trial_end);
    }

    /*
      Paid monthly / annual subscription:
      current_period_end is normally the renewal boundary.

      We support both the subscription-level field and
      the period value on the first subscription item,
      so the endpoint remains resilient across Stripe
      API object variations.
    */

    if (!validUntil || !nextPayment) {
      let periodEnd =
        subscription.current_period_end || null;

      if (
        !periodEnd &&
        subscription.items &&
        Array.isArray(subscription.items.data) &&
        subscription.items.data.length
      ) {
        periodEnd =
          subscription.items.data[0].current_period_end ||
          null;
      }

      if (periodEnd) {
        validUntil =
          stripeDate(periodEnd);

        nextPayment =
          stripeDate(periodEnd);
      }
    }

    /*
      If Stripe has cancelled the subscription at period end,
      the membership remains active until that date,
      but there should be no next automatic payment.
    */

    if (
      subscription.cancel_at_period_end === true ||
      subscription.cancel_at
    ) {
      nextPayment = null;

      if (subscription.cancel_at) {
        validUntil =
          stripeDate(subscription.cancel_at) ||
          validUntil;
      }
    }

    /*
      Step 6:
      Return only the membership information needed
      by club.html.

      Never send the Stripe secret key or raw payment
      information to the browser.
    */

    const membership = {
      active: true,

      plan,

      status: subscription.status,

      email: memberEmail,

      dates: {
        startedAt,
        validUntil,
        nextPayment
      },

      stripe: {
        checkoutSessionId: session.id,
        subscriptionId: subscription.id,
        customerId:
          typeof session.customer === "string"
            ? session.customer
            : (
                session.customer &&
                session.customer.id
                  ? session.customer.id
                  : null
              )
      }
    };

    return res.status(200).json({
      verified: true,
      membership
    });
  } catch (error) {
    console.error(
      "PETS & DOGUE verify checkout fatal error:",
      error
    );

    return res.status(500).json({
      verified: false,
      error: "Unable to verify the membership. Please try again."
    });
  }
}
