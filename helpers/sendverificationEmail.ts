import { resend } from "@/lib/resend";
import VerificationEmail from "@/emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export const sendverificationEmail = async (
  email: string,
  username: string,
  verifyCode: string,
): Promise<ApiResponse> => {
  try {
    await resend.emails.send({
      from: "you@example.com",
      to: email,
      subject: "Verification Mail",
      react: VerificationEmail({ username, otp: verifyCode }),
    });
    return { success: true, message: "Verificatio email send successfully" };
  } catch (error) {
    console.error("Error sending verification email: ", error);
    return { success: false, message: "Faild to send verificatio email" };
  }
};
