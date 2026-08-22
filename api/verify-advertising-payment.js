export default async function handler(req, res) {

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");

    return res.status(405).json({
      ok: false,
      error: "Method not allowed"
    });
  }

  try {

    const STRIPE_SECRET_KEY =
      process.env.STRIPE_SECRET_KEY;

    if (!STRIPE_SECRET_KEY) {
      return res.status(500).json({
        ok: false,
        error: "STRIPE_SECRET_KEY is not configured."
      });
    }

    const body =
      typeof req.body === "string"
        ? JSON.parse(req.body)
        : (req.body || {});

    const sessionId =
      String(body.sessionId || "").trim();

    if (
      !sessionId ||
      !sessionId.startsWith("cs_")
    ) {
      return res.status(400).json({
        ok: false,
        error: "A valid Stripe Checkout Session ID is required."
      });
    }

    async function stripeGet(path) {

      const response =
        await fetch(
          `https://api.stripe.com/v1${path}`,
          {
            method: "GET",

            headers: {
              Authorization:
                `Bearer ${STRIPE_SECRET_KEY}`
            }
          }
        );

      const data =
        await response.json();

      if (!response.ok) {

        throw new Error(
          data?.error?.message ||
          "Stripe request failed."
        );
      }

      return data;
    }

    const session =
      await stripeGet(
        `/checkout/sessions/${encodeURIComponent(sessionId)}?expand[]=invoice&expand[]=payment_intent`
      );

    if (
      !session ||
      session.object !== "checkout.session"
    ) {
      return res.status(404).json({
        ok: false,
        error: "Checkout Session was not found."
      });
    }

    const metadata =
      session.metadata || {};

    if (
      metadata.source !==
      "pets_dogue_advertising"
    ) {
      return res.status(400).json({
        ok: false,
        error:
          "This payment does not belong to a PETS & DOGUE advertising campaign."
      });
    }

    const expectedPlans = {
      "50": 5000,
      "100": 10000,
      "200": 20000
    };

    const plan =
      String(
        metadata.advertising_plan || ""
      );

    const expectedAmount =
      expectedPlans[plan];

    if (!expectedAmount) {
      return res.status(400).json({
        ok: false,
        error:
          "The advertising package attached to this payment is invalid."
      });
    }

    const amountTotal =
      Number(
        session.amount_total || 0
      );

    if (
      amountTotal !== expectedAmount
    ) {
      return res.status(400).json({
        ok: false,
        error:
          "The paid amount does not match the advertising package."
      });
    }

    if (
      String(session.currency || "")
        .toLowerCase() !== "gbp"
    ) {
      return res.status(400).json({
        ok: false,
        error:
          "The advertising payment currency is invalid."
      });
    }

    const paid =
      session.payment_status === "paid";

    const complete =
      session.status === "complete";

    if (!paid || !complete) {

      return res.status(200).json({
        ok: true,

        verified: false,

        paid: false,

        sessionId:
          session.id,

        checkoutStatus:
          session.status || null,

        paymentStatus:
          session.payment_status || null,

        campaignId:
          metadata.campaign_id || null,

        message:
          "The Stripe payment has not been completed."
      });
    }

    const invoice =
      session.invoice &&
      typeof session.invoice === "object"
        ? session.invoice
        : null;

    const paymentIntent =
      session.payment_intent &&
      typeof session.payment_intent === "object"
        ? session.payment_intent
        : null;

    const customerEmail =
      session.customer_details?.email ||
      session.customer_email ||
      metadata.partner_email ||
      "";

    const paidAtUnix =
      paymentIntent?.created ||
      session.created ||
      Math.floor(Date.now() / 1000);

    const paidAt =
      new Date(
        paidAtUnix * 1000
      ).toISOString();

    const result = {

      ok: true,

      verified: true,

      paid: true,

      campaign: {

        id:
          metadata.campaign_id || "",

        plan:
          Number(plan),

        amount:
          amountTotal,

        amountFormatted:
          `£${(
            amountTotal / 100
          ).toFixed(2)}`,

        currency:
          "GBP",

        businessName:
          metadata.business_name || "",

        partnerEmail:
          customerEmail,

        contactName:
          metadata.contact_name || "",

        category:
          metadata.category || "",

        headline:
          metadata.headline || "",

        cta:
          metadata.cta || "",

        destinationUrl:
          metadata.destination_url || "",

        start:
          metadata.campaign_start || "",

        end:
          metadata.campaign_end || "",

        placement:
          metadata.placement || "",

        language:
          metadata.language || "en",

        status:
          "paid",

        paidAt
      },

      stripe: {

        sessionId:
          session.id,

        customerId:
          typeof session.customer === "string"
            ? session.customer
            : session.customer?.id || null,

        paymentIntentId:
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : paymentIntent?.id || null,

        invoiceId:
          typeof session.invoice === "string"
            ? session.invoice
            : invoice?.id || null,

        paymentStatus:
          session.payment_status,

        checkoutStatus:
          session.status,

        livemode:
          Boolean(session.livemode)
      },

      receipt: {

        invoiceNumber:
          invoice?.number || null,

        hostedInvoiceUrl:
          invoice?.hosted_invoice_url || null,

        invoicePdf:
          invoice?.invoice_pdf || null,

        amountPaid:
          invoice?.amount_paid != null
            ? invoice.amount_paid
            : amountTotal,

        currency:
          String(
            invoice?.currency ||
            session.currency ||
            "gbp"
          ).toUpperCase()
      }
    };

    return res
      .status(200)
      .json(result);

  } catch (error) {

    console.error(
      "verify-advertising-payment error:",
      error
    );

    return res.status(500).json({
      ok: false,
      verified: false,
      error:
        error?.message ||
        "Unable to verify advertising payment."
    });
  }
}
