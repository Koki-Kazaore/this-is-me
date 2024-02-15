import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.FROM_EMAIL!;

// 環境変数の確認
if (!resendApiKey || !fromEmail) {
    throw new Error('resendApiKeyまたはfromEmailの環境変数が存在しません。')
}

const resend = new Resend(resendApiKey);

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    const { email, subject, message } = req.body;
    console.log(email, subject, message);

    try {
        const data = await resend.emails.send({
            from: 'onbording@resend.dev',
            to: fromEmail,
            subject: subject,
            react: (
                <>
                    <h1>{subject}</h1>
                    <p>Thank you for contacting me!</p>
                    <p>New message submitted:</p>
                    <p>{message}</p>
                </>
            ),
        });

        return NextResponse.json(data);
        // res.status(200).json(data);
    } catch (error) {
        // if (error instanceof Error) {
        //     // TypeScript は「error」が Error タイプであることを認識するため、「message」にアクセスできる
        //     res.status(500).json({ error: error.message });
        // } else {
        //     // スローされた他のタイプのオブジェクト (文字列など) を処理します。
        //     res.status(500).json({ error: 'An unknown error occurred' });
        // }
        return NextResponse.json({ error });
    }
}

// import { EmailTemplate } from '../../components/EmailTemplate';
// import { Resend } from 'resend';

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST() {
//   try {
//     const data = await resend.emails.send({
//       from: 'Koki <xxx@gmail.com>',
//       to: ['xxx@gmail.com'],
//       subject: 'Hello world',
//       react: EmailTemplate({ firstName: 'John' }),
//     });

//     return Response.json(data);
//   } catch (error) {
//     return Response.json({ error });
//   }
// }