import { Resend } from "resend";
import { NextResponse } from "next/server";

const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.FROM_EMAIL!;

// 環境変数の確認
if (!resendApiKey || !fromEmail) {
  throw new Error("resendApiKeyまたはfromEmailの環境変数が存在しません。");
}

const resend = new Resend(resendApiKey);

export async function POST(request: Request) {
  // Retrieving data from a request
  const { email, subject, message } = await request.json();

  try {
    // Send Email
    const data = await resend.emails.send({
      from: "onbording@resend.dev",
      reply_to: email, // Inquirer's e-mail address
      to: fromEmail,
      subject: subject,
      react: (
        <>
          <h1>{subject}</h1>
          <p>Thank you for contacting me!</p>
          <p>New message submitted:</p>
          <p>{message}</p>
          <br />
          <p>Reply to: {email}</p>
        </>
      ),
    });

    return new NextResponse(JSON.stringify(data));
  } catch (error) {
    return new NextResponse(JSON.stringify({ error }), { status: 500 });
  }
}
