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
      error: "Secure payment is not configured yet."
    });
  }

  try {
    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body || "{}")
        : req.body || {};

    const {
      plan,
      language,
      firstName,
      email,
      country,
      petName,
      petType,
      breed,
      breedId
    } = body;

    const allowedPlans = ["free", "monthly", "annual"];

    if (!allowedPlans.includes(plan)) {
      return res.status(400).json({
        error: "Invalid membership plan."
      });
    }

    const cleanEmail = String(email || "").trim().toLowerCase();

    if (!cleanEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      return res.status(400).json({
        error: "A valid email address is required."
      });
    }

    const plans = {
      free: {
        productName: "PETS & DOGUE Club — 30 Day Free Trial",
        description: "First 30 days free, then £1 per month.",
        unitAmount: 100,
        interval: "month",
        trialDays: 30
      },

      monthly: {
        productName: "PETS & DOGUE Club — Monthly Membership",
        description: "PETS & DOGUE Club membership — £1 per month.",
        unitAmount: 100,
        interval: "month",
        trialDays: 0
      },

      annual: {
        productName: "PETS & DOGUE Club — Annual Membership",
        description: "PETS & DOGUE Club membership — £10 per year.",
        unitAmount: 1000,
        interval: "year",
        trialDays: 0
      }
    };

    const selected = plans[plan];

    const forwardedProto =
      req.headers["x-forwarded-proto"] ||
      "https";

    const forwardedHost =
      req.headers["x-forwarded-host"] ||
      req.headers.host;

    let siteUrl = process.env.SITE_URL || "";

    if (!siteUrl && forwardedHost) {
      siteUrl = `${forwardedProto}://${forwardedHost}`;
    }

    siteUrl = String(siteUrl).replace(/\/+$/, "");

    if (!siteUrl) {
      return res.status(500).json({
        error: "Website URL is not configured."
      });
    }

    const successUrl =
      `${siteUrl}/club.html?membership=success&plan=${encodeURIComponent(plan)}` +
      `&session_id={CHECKOUT_SESSION_ID}`;

    const cancelUrl =
      `${siteUrl}/club.html?membership=cancelled&plan=${encodeURIComponent(plan)}`;

    const params = new URLSearchParams();

    params.append("mode", "subscription");

    params.append(
      "success_url",
      successUrl
    );

    params.append(
      "cancel_url",
      cancelUrl
    );

    params.append(
      "customer_email",
      cleanEmail
    );

    params.append(
      "client_reference_id",
      `pets-dogue-${Date.now()}`
    );

    params.append(
      "allow_promotion_codes",
      "true"
    );

    /*
      Important for the £0 trial:
      Stripe should still collect a payment method
      so the membership can continue automatically
      at £1/month after the 30-day trial.
    */
    params.append(
      "payment_method_collection",
      "always"
    );

    params.append(
      "billing_address_collection",
      "auto"
    );

    /*
      We deliberately allow Stripe to determine the
      available payment methods for the visitor.

      Card is supported by the recurring subscription.

      Google Pay / Apple Pay can appear automatically
      when available on the user's browser/device and
      enabled for the Stripe account.

      Other Stripe-supported methods can also appear
      when they are enabled and compatible with the
      account, country, currency and subscription.
    */

    params.append(
      "line_items[0][quantity]",
      "1"
    );

    params.append(
      "line_items[0][price_data][currency]",
      "gbp"
    );

    params.append(
      "line_items[0][price_data][unit_amount]",
      String(selected.unitAmount)
    );

    params.append(
      "line_items[0][price_data][recurring][interval]",
      selected.interval
    );

    params.append(
      "line_items[0][price_data][product_data][name]",
      selected.productName
    );

    params.append(
      "line_items[0][price_data][product_data][description]",
      selected.description
    );

    params.append(
      "metadata[project]",
      "PETS & DOGUE"
    );

    params.append(
      "metadata[plan]",
      plan
    );

    params.append(
      "metadata[language]",
      String(language || "en").slice(0, 10)
    );

    params.append(
      "metadata[firstName]",
      String(firstName || "").slice(0, 100)
    );

    params.append(
      "metadata[country]",
      String(country || "").slice(0, 20)
    );

    params.append(
      "metadata[petName]",
      String(petName || "").slice(0, 100)
    );

    params.append(
      "metadata[petType]",
      String(petType || "").slice(0, 50)
    );

    params.append(
      "metadata[breed]",
      String(breed || "").slice(0, 150)
    );

    params.append(
      "metadata[breedId]",
      String(breedId || "").slice(0, 100)
    );

    params.append(
      "subscription_data[metadata][project]",
      "PETS & DOGUE"
    );

    params.append(
      "subscription_data[metadata][plan]",
      plan
    );

    params.append(
      "subscription_data[metadata][language]",
      String(language || "en").slice(0, 10)
    );

    params.append(
      "subscription_data[metadata][member_email]",
      cleanEmail
    );

    if (selected.trialDays > 0) {
      params.append(
        "subscription_data[trial_period_days]",
        String(selected.trialDays)
      );
    }

    const stripeResponse = await fetch(
      "https://api.stripe.com/v1/checkout/sessions",
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${stripeSecretKey}`,
          "Content-Type": "application/x-www-form-urlencoded"
        },

        body: params.toString()
      }
    );

    const stripeData = await stripeResponse.json();

    if (!stripeResponse.ok) {
      console.error(
        "PETS & DOGUE Stripe Checkout error:",
        stripeData
      );

      return res.status(stripeResponse.status || 500).json({
        error:
          stripeData &&
          stripeData.error &&
          stripeData.error.message
            ? stripeData.error.message
            : "Unable to create secure checkout."
      });
    }

    if (!stripeData.id || !stripeData.url) {
      console.error(
        "PETS & DOGUE Stripe returned an incomplete Checkout Session:",
        stripeData
      );

      return res.status(500).json({
        error: "Stripe did not return a checkout page."
      });
    }

    return res.status(200).json({
      ok: true,
      sessionId: stripeData.id,
      checkoutUrl: stripeData.url,
      plan
    });
  } catch (error) {
    console.error(
      "PETS & DOGUE create checkout fatal error:",
      error
    );

    return res.status(500).json({
      error: "Unable to start secure payment. Please try again."
    });
  }
}
