import { Resend } from "resend";
import { getInternalNotificationTemplate } from "../../layouts/emailTemplates/InternalNotification";
import { getCustomerAcknowledgmentTemplate } from "../../layouts/emailTemplates/CustomerAcknowledgment";
import { getSupportChatFailureTemplate } from "../../layouts/emailTemplates/SupportChatFailure";
import { getNewsletterInternalTemplate } from "../../layouts/emailTemplates/NewsletterInternal";
import { getNewsletterWelcomeTemplate } from "../../layouts/emailTemplates/NewsletterWelcome";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, error: "Method not allowed" });
  }

  try {
    const {
      from_name,
      from_email,
      from_phone,
      from_BusinessName,
      from_Address,
      message,
      source,
    } = req.body;

    // Special handling for Newsletter
    if (source === "newsletter") {
      if (!from_email) {
        return res
          .status(400)
          .json({ success: false, error: "Email is required." });
      }

      const internalToEmail = "admin@creative3bx.com"; // Define admin email once
      const internalTask = resend.emails.send({
        from: "Creative3Bx System <NoReply@creative3bx.com.au>",
        to: [internalToEmail],
        subject: `Growth Alert: New Newsletter Subscriber`,
        ...getNewsletterInternalTemplate(from_email),
      );

      const welcomeTask = resend.emails.send({
        from: "Creative3Bx <NoReply@creative3bx.com.au>",
        to: [from_email],
        subject: `Welcome to the Creative3Bx Inner Circle!`,
        ...getNewsletterWelcomeTemplate(from_email),
      );

      const [internalResult, welcomeResult] = await Promise.all([
        internalTask,
        welcomeTask,
      ]);

      if (internalResult.error || welcomeResult.error) {
        const errorMessage =
          internalResult.error?.message ||
          welcomeResult.error?.message ||
          "Failed to send one or more newsletter emails.";
        throw new Error(errorMessage);
      }
      return res
        .status(200)
        .json({ success: true, message: "Subscription confirmed" });
    }

    // Standard Server-side validation for other forms
    if (!from_email || !message) {
      return res
        .status(400)
        .json({ success: false, error: "Missing required fields." });
    }

    let internalTemplate;
    let emailSubject = `New Contact Message from ${from_name}`;
    let status = "New Website Inquiry";

    if (source === "live_chat_failure") {
      status = "Follow up with customer - Chat Failed";
      internalTemplate = getSupportChatFailureTemplate({ ...req.body, status });
      emailSubject = `CRITICAL: Chat Connection Failed for ${from_name}`;
    } else if (source === "live_chat_success") {
      status = "Working Convo - Chat Started";
      internalTemplate = getInternalNotificationTemplate({
        ...req.body,
        status,
      });
      emailSubject = `Live Chat Started: ${from_name}`;
    } else {
      internalTemplate = getInternalNotificationTemplate({
        ...req.body,
        status,
      });
    }

    const customerTemplate = getCustomerAcknowledgmentTemplate(from_name);

    // 1. Internal Notification (To Admin)
    const internalEmailTask = resend.emails.send({
      from: "Creative3Bx Contact <NoReply@creative3bx.com.au>",
      to: ["admin@creative3bx.com"],
      replyTo: from_email,
      subject: emailSubject,
      ...internalTemplate,
    });

    // 2. Automatic Acknowledgment (To Customer)
    const acknowledgmentEmailTask = resend.emails.send({
      from: "Creative3Bx Support <NoReply@creative3bx.com.au>",
      to: [from_email],
      subject: `We've received your message - Creative3Bx Support`,
      ...customerTemplate,
    });

    // Run both email sends in parallel for better performance
    const [adminRes, customerRes] = await Promise.all([
      internalEmailTask,
      acknowledgmentEmailTask,
    ]);

    // Check for errors in either task
    if (adminRes.error || customerRes.error) {
      const errorMessage =
        adminRes.error?.message ||
        customerRes.error?.message ||
        "One or more emails failed to send.";
      return res.status(400).json({ success: false, error: errorMessage });
    }

    return res.status(200).json({
      success: true,
      message: "Notification and Acknowledgment sent successfully",
      data: { adminEmail: adminRes.data, customerEmail: customerRes.data },
    });
  } catch (error) {
    // This catch block handles errors from Promise.all or any other synchronous errors
    // It's crucial for catching failures from resend.emails.send if they reject the promise.
    return res
      .status(500)
      .json({ success: false, error: "Internal server error." });
  }
}
