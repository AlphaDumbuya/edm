// src/emails/reset-password-template.ts
export function resetPasswordEmail({ resetUrl }: { resetUrl: string }) {
  return {
    subject: "Reset your EDM account password",
    html: `
      <p>Hello,</p>
      <p>Click the link below to reset your password:</p>
      <p><a href="${resetUrl}">${resetUrl}</a></p>
      <p>If you did not request this, you can ignore this email.</p>
      <p>Thank you.</p>
    `,
    text: `Hello,\n\nClick the link below to reset your password:\n${resetUrl}\n\nIf you did not request this, you can ignore this email.\n\nThank you.`
  };
}