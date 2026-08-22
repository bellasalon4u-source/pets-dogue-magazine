export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");

    return res.status(405).json({
      error: "Method not allowed."
    });
  }

  const stripeSecretKey = String(
    process.env.STRIPE_SECRET_KEY || ""
  ).trim();

  if (!stripeSecretKey) {
    console.error(
      "PETS & DOGUE: STRIPE_SECRET_KEY is missing."
    );

    return res.status(500).json({
      error: "Stripe is not configured."
    });
  }

  try {
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body || "{}")
        : req.body || {};

    const setupIntentId = String(
      body.setupIntentId || ""
    ).trim();

    if (
      !setupIntentId ||
      !setupIntentId.startsWith("seti_")
    ) {
      return res.status(400).json({
        error: "Invalid Stripe SetupIntent."
      });
    }

    async function stripeRequest(
      path,
      method = "GET",
      params = null
    ) {
      const options = {
        method,
        headers: {
          Authorization:
            `Bearer ${stripeSecretKey}`
        }
      };

      if (params) {
        options.headers["Content-Type"] =
          "application/x-www-form-urlencoded";

        options.body =
          params.toString();
      }

      const response =
        await fetch(
          `https://api.stripe.com/v1${path}`,
          options
        );

      let data = {};

      try {
        data =
          await response.json();
      } catch (error) {
        throw new Error(
          "Stripe returned an invalid response."
        );
      }

      if (!response.ok) {
        const message =
          data &&
          data.error &&
          data.error.message
            ? data.error.message
            : "Stripe request failed.";

        const stripeError =
          new Error(message);

        stripeError.status =
          response.status || 500;

        throw stripeError;
      }

      return data;
    }

    /*
      Retrieve the SetupIntent directly
      from Stripe.

      We never trust browser data alone.
    */

    const setupIntent =
      await stripeRequest(
        `/setup_intents/${encodeURIComponent(
          setupIntentId
        )}`,
        "GET"
      );

    if (
      !setupIntent ||
      setupIntent.status !== "succeeded"
    ) {
      return res.status(400).json({
        error:
          "The payment method has not been confirmed."
      });
    }

    const metadata =
      setupIntent.metadata &&
      typeof setupIntent.metadata === "object"
        ? setupIntent.metadata
        : {};

    /*
      Make sure this SetupIntent was created
      by PETS & DOGUE and specifically for
      the free membership.
    */

    if (
      metadata.project !== "PETS & DOGUE" ||
      metadata.plan !== "free"
    ) {
      return res.status(403).json({
        error:
          "This payment setup does not belong to PETS & DOGUE Club."
      });
    }

    const customerId =
      typeof setupIntent.customer === "string"
        ? setupIntent.customer
        : (
            setupIntent.customer &&
            setupIntent.customer.id
              ? setupIntent.customer.id
              : ""
          );

    const paymentMethodId =
      typeof setupIntent.payment_method === "string"
        ? setupIntent.payment_method
        : (
            setupIntent.payment_method &&
            setupIntent.payment_method.id
              ? setupIntent.payment_method.id
              : ""
          );

    if (!customerId) {
      return res.status(400).json({
        error:
          "Stripe customer is missing."
      });
    }

    if (!paymentMethodId) {
      return res.status(400).json({
        error:
          "Stripe payment method is missing."
      });
    }

    /*
      Prevent accidental duplicate subscriptions.

      If the browser retries the request,
      we first look for an existing subscription
      created from this same SetupIntent.
    */

    const existingSubscriptions =
      await stripeRequest(
        `/subscriptions?customer=${encodeURIComponent(
          customerId
        )}&status=all&limit=20`,
        "GET"
      );

    if (
      existingSubscriptions &&
      Array.isArray(
        existingSubscriptions.data
      )
    ) {
      const existing =
        existingSubscriptions.data.find(
          subscription =>
            subscription &&
            subscription.metadata &&
            subscription.metadata.project ===
              "PETS & DOGUE" &&
            subscription.metadata.setup_intent ===
              setupIntentId &&
            [
              "trialing",
              "active"
            ].includes(subscription.status)
        );

      if (existing) {
        return res.status(200).json({
          ok: true,
          alreadyCreated: true,
          membership:
            buildMembership(
              existing,
              metadata.email || ""
            )
        });
      }
    }

    /*
      Set the confirmed payment method
      as the customer's default payment method.
    */

    const customerParams =
      new URLSearchParams();

    customerParams.append(
      "invoice_settings[default_payment_method]",
      paymentMethodId
    );

    if (metadata.firstName) {
      customerParams.append(
        "name",
        String(metadata.firstName)
          .trim()
          .slice(0, 100)
      );
    }

    await stripeRequest(
      `/customers/${encodeURIComponent(
        customerId
      )}`,
      "POST",
      customerParams
    );

    /*
      Create the actual membership subscription.

      £0 today
      30-day free trial
      then £1/month automatically
      unless cancelled.
    */

    const subscriptionParams =
      new URLSearchParams();

    subscriptionParams.append(
      "customer",
      customerId
    );

    subscriptionParams.append(
      "default_payment_method",
      paymentMethodId
    );

    subscriptionParams.append(
      "trial_period_days",
      "30"
    );

    subscriptionParams.append(
      "collection_method",
      "charge_automatically"
    );

    subscriptionParams.append(
      "payment_settings[save_default_payment_method]",
      "on_subscription"
    );

    /*
      £1 recurring monthly price.
    */

    subscriptionParams.append(
      "items[0][price_data][currency]",
      "gbp"
    );

    subscriptionParams.append(
      "items[0][price_data][unit_amount]",
      "100"
    );

    subscriptionParams.append(
      "items[0][price_data][recurring][interval]",
      "month"
    );

    subscriptionParams.append(
      "items[0][price_data][product_data][name]",
      "PETS & DOGUE Club — Monthly Membership"
    );

    subscriptionParams.append(
      "items[0][price_data][product_data][description]",
      "First 30 days free, then £1 per month."
    );

    /*
      Membership metadata.
    */

    subscriptionParams.append(
      "metadata[project]",
      "PETS & DOGUE"
    );

    subscriptionParams.append(
      "metadata[plan]",
      "free"
    );

    subscriptionParams.append(
      "metadata[setup_intent]",
      setupIntentId
    );

    subscriptionParams.append(
      "metadata[language]",
      String(metadata.language || "en")
        .trim()
        .slice(0, 10)
    );

    subscriptionParams.append(
      "metadata[member_email]",
      String(metadata.email || "")
        .trim()
        .slice(0, 150)
    );

    subscriptionParams.append(
      "metadata[firstName]",
      String(metadata.firstName || "")
        .trim()
        .slice(0, 100)
    );

    subscriptionParams.append(
      "metadata[country]",
      String(metadata.country || "")
        .trim()
        .slice(0, 20)
    );

    subscriptionParams.append(
      "metadata[petName]",
      String(metadata.petName || "")
        .trim()
        .slice(0, 100)
    );

    subscriptionParams.append(
      "metadata[petType]",
      String(metadata.petType || "")
        .trim()
        .slice(0, 50)
    );

    subscriptionParams.append(
      "metadata[breed]",
      String(metadata.breed || "")
        .trim()
        .slice(0, 150)
    );

    subscriptionParams.append(
      "metadata[breedId]",
      String(metadata.breedId || "")
        .trim()
        .slice(0, 100)
    );

    const subscription =
      await stripeRequest(
        "/subscriptions",
        "POST",
        subscriptionParams
      );

    if (
      !subscription ||
      !subscription.id
    ) {
      return res.status(500).json({
        error:
          "Stripe did not create the membership."
      });
    }

    if (
      ![
        "trialing",
        "active"
      ].includes(subscription.status)
    ) {
      console.error(
        "PETS & DOGUE unexpected subscription status:",
        subscription.status
      );

      return res.status(400).json({
        error:
          "The membership could not be activated."
      });
    }

    return res.status(200).json({
      ok: true,
      alreadyCreated: false,
      membership:
        buildMembership(
          subscription,
          metadata.email || ""
        )
    });

  } catch (error) {
    console.error(
      "PETS & DOGUE complete trial error:",
      error
    );

    return res
      .status(
        Number(error.status) || 500
      )
      .json({
        error:
          error.message ||
          "Unable to activate the free trial."
      });
  }
}

function stripeDate(timestamp) {
  const value =
    Number(timestamp);

  if (
    !Number.isFinite(value) ||
    value <= 0
  ) {
    return null;
  }

  return new Date(
    value * 1000
  ).toISOString();
}

function getPeriodEnd(subscription) {
  if (
    subscription.current_period_end
  ) {
    return subscription.current_period_end;
  }

  if (
    subscription.items &&
    Array.isArray(
      subscription.items.data
    ) &&
    subscription.items.data.length
  ) {
    return (
      subscription.items.data[0]
        .current_period_end ||
      null
    );
  }

  return null;
}

function buildMembership(
  subscription,
  fallbackEmail = ""
) {
  const metadata =
    subscription.metadata &&
    typeof subscription.metadata === "object"
      ? subscription.metadata
      : {};

  const startTimestamp =
    subscription.start_date ||
    subscription.created ||
    null;

  const trialEnd =
    subscription.trial_end ||
    null;

  const periodEnd =
    getPeriodEnd(subscription);

  let validUntil =
    stripeDate(
      trialEnd ||
      periodEnd
    );

  let nextPayment =
    stripeDate(
      trialEnd ||
      periodEnd
    );

  if (
    subscription.cancel_at_period_end === true
  ) {
    nextPayment = null;
  }

  if (
    subscription.cancel_at
  ) {
    validUntil =
      stripeDate(
        subscription.cancel_at
      ) ||
      validUntil;

    nextPayment = null;
  }

  return {
    active: true,

    plan: "free",

    status:
      subscription.status,

    email:
      metadata.member_email ||
      fallbackEmail ||
      "",

    dates: {
      startedAt:
        stripeDate(startTimestamp),

      validUntil,

      nextPayment
    },

    stripe: {
      subscriptionId:
        subscription.id,

      customerId:
        typeof subscription.customer === "string"
          ? subscription.customer
          : (
              subscription.customer &&
              subscription.customer.id
                ? subscription.customer.id
                : null
            )
    }
  };
}
