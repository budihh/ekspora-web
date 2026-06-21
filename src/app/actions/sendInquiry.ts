"use server";

import { Resend } from "resend";

export async function submitInquiry(formData: FormData) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("ERROR: RESEND_API_KEY tidak ditemukan di environment variables!");
    return { error: "Konfigurasi server bermasalah (Missing API Key). Silakan hubungi admin." };
  }

  const resend = new Resend(apiKey);
  const companyName = formData.get("companyName") as string;
  const email = formData.get("email") as string;
  const commodity = formData.get("commodity") as string;
  const volume = formData.get("volume") as string;
  const message = formData.get("message") as string;

  if (!companyName || !email || !commodity) {
    return { error: "Missing required fields" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Ekspora Website <onboarding@resend.dev>",
      to: process.env.INQUIRY_RECIPIENT_EMAIL || "budiutoyo158@gmail.com",
      replyTo: email,
      subject: `New Inquiry from ${companyName} - ${commodity}`,
      html: `
        <h2>New Inquiry Received</h2>
        <p><strong>Company Name:</strong> ${companyName}</p>
        <p><strong>Work Email:</strong> ${email}</p>
        <p><strong>Commodity of Interest:</strong> ${commodity}</p>
        <p><strong>Estimated Volume (MOQ):</strong> ${volume || "Not specified"}</p>
        <p><strong>Message / Specifications:</strong></p>
        <p>${message ? message.replace(/\n/g, "<br>") : "None provided"}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { error: error.message || "Failed to send inquiry" };
    }

    return { success: true };
  } catch (error) {
    console.error("Server Action error:", error);
    return { error: "Failed to send inquiry" };
  }
}
