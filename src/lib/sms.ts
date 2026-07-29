interface SendResult {
  ok: boolean;
  error?: string;
}

/**
 * Sends an OTP SMS via MSG91's Flow API. Requires a DLT-registered sender ID
 * and an approved OTP template in India (regulatory requirement, not
 * optional) — see docs/project-spec.md for setup steps. The template must
 * expose a variable literally named "OTP" (MSG91's own convention).
 */
export async function sendOtpSms(phone: string, code: string): Promise<SendResult> {
  const authKey = process.env.MSG91_AUTH_KEY;
  const templateId = process.env.MSG91_TEMPLATE_ID;
  if (!authKey || !templateId) {
    return { ok: false, error: "SMS isn't configured yet." };
  }

  try {
    const res = await fetch("https://control.msg91.com/api/v5/flow/", {
      method: "POST",
      headers: {
        authkey: authKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        template_id: templateId,
        short_url: "0",
        recipients: [{ mobiles: `91${phone}`, OTP: code }],
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error("MSG91 send failed:", res.status, text);
      return { ok: false, error: "Could not send the code. Please try again." };
    }
    return { ok: true };
  } catch (err) {
    console.error("MSG91 request failed:", err);
    return { ok: false, error: "Could not send the code. Please try again." };
  }
}
