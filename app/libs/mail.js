import nodemailer from 'nodemailer';

export async function sendEmail({email, subject, body}) {

    const {SMTP_PASSWORD, SMTP_EMAIL, ADMIN_EMAIL} = process.env;
    const transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: SMTP_EMAIL,
            pass: SMTP_PASSWORD
        }
    })
    try{
        const testResult = transport.verify();
        console.log(testResult);
    }
    catch(error){
        console.log(error);
        return
    }
    try{
        const sendResult = await transport.sendMail({
            from: ADMIN_EMAIL,
            to: SMTP_EMAIL,
            subject,
            text: body
        })
        console.log(sendResult);
    } catch(error){
        console.log(error);
    }
}