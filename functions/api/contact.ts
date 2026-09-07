interface ContactPayload {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  website?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function onRequestPost(context: {
  request: Request;
  env: { BREVO_API_KEY?: string; SUPPORT_EMAIL?: string };
}): Promise<Response> {
  const apiKey = context.env.BREVO_API_KEY;
  const supportEmail = context.env.SUPPORT_EMAIL ?? "support@byhtimepiece.com";

  if (!apiKey) {
    return Response.json(
      { ok: false, error: "Contact form is not configured yet." },
      { status: 503 },
    );
  }

  let payload: ContactPayload;

  try {
    payload = await context.request.json();
  } catch {
    return Response.json(
      { ok: false, error: "Invalid request body." },
      { status: 400 },
    );
  }

  if (payload.website?.trim()) {
    return Response.json({ ok: true });
  }

  const name = payload.name?.trim() ?? "";
  const email = payload.email?.trim() ?? "";
  const subject = payload.subject?.trim() ?? "Website contact form";
  const message = payload.message?.trim() ?? "";

  if (!name || !email || !message) {
    return Response.json(
      { ok: false, error: "Name, email, and message are required." },
      { status: 400 },
    );
  }

  if (!EMAIL_PATTERN.test(email)) {
    return Response.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeSubject = escapeHtml(subject);
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br />");

  const brevoResponse = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: {
        name: "BYH Website",
        email: supportEmail,
      },
      to: [{ email: supportEmail, name: "BYH Support" }],
      replyTo: { email, name },
      subject: `[Contact] ${subject}`,
      htmlContent: `
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Subject:</strong> ${safeSubject}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
      textContent: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
    }),
  });

  if (!brevoResponse.ok) {
    const brevoError = await brevoResponse.text();

    console.error("Brevo API error:", brevoResponse.status, brevoError);

    return Response.json(
      {
        ok: false,
        error:
          brevoResponse.status === 401
            ? "Email service authentication failed. Check the BREVO_API_KEY setting."
            : "Unable to send your message right now. Please try again later.",
      },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
