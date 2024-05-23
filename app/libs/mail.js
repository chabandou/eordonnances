import nodemailer from 'nodemailer';

export async function sendEmail({email, subject, body}) {

    const { ADMIN_EMAIL, EMAIL_PORT, EMAIL_HOST, ADMIN_EMAIL_FULL, SMTP_PASSWORD, SMTP_EMAIL} = process.env;
    const transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        secure: true,
        auth: {
            user: SMTP_EMAIL,
            pass: SMTP_PASSWORD
        }
    })

    try{
        const sendResult = await transporter.sendMail({
            from: ADMIN_EMAIL_FULL,
            to: SMTP_EMAIL,
            subject,
            text: body
        })
        console.log(sendResult);
    } catch(error){
        console.log(error);
    }
}