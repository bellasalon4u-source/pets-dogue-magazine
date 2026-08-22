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

  const stripePublishableKey = String(
    process.env.STRIPE_PUBLISHABLE_KEY || ""
  ).trim();

  if (!stripeSecretKey) {
    return res.status(500).json({
      error: "Stripe secret key is not configured."
    });
  }

  if (!stripePublishableKey) {
    return res.status(500).json({
      error: "Stripe publishable key is not configured."
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

    const allowedPlans = [
      "free",
      "monthly",
      "annual"
    ];

    if (!allowedPlans.includes(plan)) {
      return res.status(400).json({
        error: "Invalid membership plan."
      });
    }

    const cleanEmail = String(email || "")
      .trim()
      .toLowerCase();

    const cleanFirstName = String(firstName || "")
      .trim()
      .slice(0, 100);

    if (
      !cleanEmail ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)
    ) {
      return res.status(400).json({
        error: "A valid email address is required."
      });
    }

    const plans = {
      free: {
        name: "PETS & DOGUE Club — 30 Day Free Trial",
        description:
          "First 30 days free, then £1 per month.",
        amount: 100,
        interval: "month",
        trialDays: 30
      },

      monthly: {
        name: "PETS & DOGUE Club — Monthly Membership",
        description:
          "PETS & DOGUE Club membership — £1 per month.",
        amount: 100,
        interval: "month",
        trialDays: 0
      },

      annual: {
        name: "PETS & DOGUE Club — Annual Membership",
        description:
          "PETS & DOGUE Club membership — £10 per year.",
        amount: 1000,
        interval: "year",
        trialDays: 0
      }
    };

    const selected = plans[plan];

    async function stripeRequest(
      path,
      method = "POST",
      params = null
    ) {
      const options = {
        method,
        headers: {
          Authorization: `Bearer ${stripeSecretKey}`
        }
      };

      if (params) {
        options.headers["Content-Type"] =
          "application/x-www-form-urlencoded";

        options.body = params.toString();
      }

      const response = await fetch(
        `https://api.stripe.com/v1${path}`,
        options
      );

      let data = {};

      try {
        data = await response.json();
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

        const stripeError = new Error(message);

        stripeError.status =
          response.status || 500;

        throw stripeError;
      }

      return data;
    }

    /*
      Try to reuse an existing Stripe customer
      with the same email address.
    */

    const customerList =
      await stripeRequest(
        `/customers?email=${encodeURIComponent(cleanEmail)}&limit=1`,
        "GET"
      );

    let customer =
      customerList &&
      Array.isArray(customerList.data) &&
      customerList.data.length
        ? customerList.data[0]
        : null;

    /*
      Create a Stripe Customer when this email
      has not been used before.
    */

    if (!customer) {
      const customerParams =
        new URLSearchParams();

      customerParams.append(
        "email",
        cleanEmail
      );

      if (cleanFirstName) {
        customerParams.append(
          "name",
          cleanFirstName
        );
      }

      customerParams.append(
        "metadata[project]",
        "PETS & DOGUE"
      );

      customerParams.append(
        "metadata[language]",
        String(language || "en")
          .trim()
          .slice(0, 10)
      );

      customerParams.append(
        "metadata[country]",
        String(country || "")
          .trim()
          .slice(0, 20)
      );

      customer =
        await stripeRequest(
          "/customers",
          "POST",
          customerParams
        );
    }

    if (!customer || !customer.id) {
      return res.status(500).json({
        error: "Unable to create Stripe customer."
      });
    }

    /*
      ==================================================
      FREE PLAN
      ==================================================

      £0 today.

      We do NOT create the subscription yet.

      First we securely collect and authenticate
      the payment method with a SetupIntent.

      After successful confirmation the next API
      endpoint will create the 30-day trial and
      attach this payment method to the subscription.
    */

    if (plan === "free") {
      const setupParams =
        new URLSearchParams();

      setupParams.append(
        "customer",
        customer.id
      );

      setupParams.append(
        "usage",
        "off_session"
      );

      setupParams.append(
        "automatic_payment_methods[enabled]",
        "true"
      );

      setupParams.append(
        "metadata[project]",
        "PETS & DOGUE"
      );

      setupParams.append(
        "metadata[plan]",
        "free"
      );

      setupParams.append(
        "metadata[email]",
        cleanEmail
      );

      setupParams.append(
        "metadata[language]",
        String(language || "en")
          .trim()
          .slice(0, 10)
      );

      setupParams.append(
        "metadata[firstName]",
        cleanFirstName
      );

      setupParams.append(
        "metadata[country]",
        String(country || "")
          .trim()
          .slice(0, 20)
      );

      setupParams.append(
        "metadata[petName]",
        String(petName || "")
          .trim()
          .slice(0, 100)
      );

      setupParams.append(
        "metadata[petType]",
        String(petType || "")
          .trim()
          .slice(0, 50)
      );

      setupParams.append(
        "metadata[breed]",
        String(breed || "")
          .trim()
          .slice(0, 150)
      );

      setupParams.append(
        "metadata[breedId]",
        String(breedId || "")
          .trim()
          .slice(0, 100)
      );

      const setupIntent =
        await stripeRequest(
          "/setup_intents",
          "POST",
          setupParams
        );

      if (
        !setupIntent ||
        !setupIntent.id ||
        !setupIntent.client_secret
      ) {
        return res.status(500).json({
          error:
            "Stripe did not return a valid payment setup."
        });
      }

      return res.status(200).json({
        ok: true,

        flow: "setup",

        plan: "free",

        customerId:
          customer.id,

        intentId:
          setupIntent.id,

        clientSecret:
          setupIntent.client_secret,

        publishableKey:
          stripePublishableKey,

        amountToday: 0,

        currency: "gbp",

        trialDays:
          selected.trialDays
      });
    }

    /*
      ==================================================
      MONTHLY / ANNUAL PLAN
      ==================================================

      Create an incomplete subscription.

      Stripe generates the first invoice and
      a payment confirmation secret.

      club.html will use this secret with
      Stripe Elements / Payment Element.
    */

    const subscriptionParams =
      new URLSearchParams();

    subscriptionParams.append(
      "customer",
      customer.id
    );

    subscriptionParams.append(
      "payment_behavior",
      "default_incomplete"
    );

    subscriptionParams.append(
      "payment_settings[save_default_payment_method]",
      "on_subscription"
    );

    subscriptionParams.append(
      "items[0][price_data][currency]",
      "gbp"
    );

    subscriptionParams.append(
      "items[0][price_data][unit_amount]",
      String(selected.amount)
    );

    subscriptionParams.append(
      "items[0][price_data][recurring][interval]",
      selected.interval
    );

    subscriptionParams.append(
      "items[0][price_data][product_data][name]",
      selected.name
    );

    subscriptionParams.append(
      "items[0][price_data][product_data][description]",
      selected.description
    );

    subscriptionParams.append(
      "metadata[project]",
      "PETS & DOGUE"
    );

    subscriptionParams.append(
      "metadata[plan]",
      plan
    );

    subscriptionParams.append(
      "metadata[language]",
      String(language || "en")
        .trim()
        .slice(0, 10)
    );

    subscriptionParams.append(
      "metadata[member_email]",
      cleanEmail
    );

    subscriptionParams.append(
      "metadata[firstName]",
      cleanFirstName
    );

    subscriptionParams.append(
      "metadata[country]",
      String(country || "")
        .trim()
        .slice(0, 20)
    );

    subscriptionParams.append(
      "metadata[petName]",
      String(petName || "")
        .trim()
        .slice(0, 100)
    );

    subscriptionParams.append(
      "metadata[petType]",
      String(petType || "")
        .trim()
        .slice(0, 50)
    );

    subscriptionParams.append(
      "metadata[breed]",
      String(breed || "")
        .trim()
        .slice(0, 150)
    );

    subscriptionParams.append(
      "metadata[breedId]",
      String(breedId || "")
        .trim()
        .slice(0, 100)
    );

    /*
      Newer Stripe invoice APIs expose the
      payment confirmation secret here.
    */

    subscriptionParams.append(
      "expand[]",
      "latest_invoice.confirmation_secret"
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
          "Stripe did not create the subscription."
      });
    }

    const invoice =
      subscription.latest_invoice &&
      typeof subscription.latest_invoice === "object"
        ? subscription.latest_invoice
        : null;

    const confirmationSecret =
      invoice &&
      invoice.confirmation_secret &&
      typeof invoice.confirmation_secret === "object"
        ? invoice.confirmation_secret.client_secret
        : null;

    if (!confirmationSecret) {
      console.error(
        "PETS & DOGUE: Stripe subscription has no confirmation secret.",
        {
          subscriptionId:
            subscription.id,

          invoiceId:
            invoice && invoice.id
              ? invoice.id
              : null
        }
      );

      return res.status(500).json({
        error:
          "Stripe could not prepare the secure payment form."
      });
    }

    return res.status(200).json({
      ok: true,

      flow: "payment",

      plan,

      customerId:
        customer.id,

      subscriptionId:
        subscription.id,

      invoiceId:
        invoice && invoice.id
          ? invoice.id
          : null,

      clientSecret:
        confirmationSecret,

      publishableKey:
        stripePublishableKey,

      amountToday:
        selected.amount,

      currency:
        "gbp"
    });

  } catch (error) {
    console.error(
      "PETS & DOGUE embedded payment error:",
      error
    );

    return res
      .status(
        Number(error.status) || 500
      )
      .json({
        error:
          error.message ||
          "Unable to prepare secure payment."
      });
  }
}
