import {Resend} from 'resend'
import { render } from '@react-email/render';

export const sendEmail = async (to:string, subject:string,template:React.ReactNode) => {
    const resend = new Resend(process.env.RESEND_API_KEY)

const html = await render(template as React.ReactElement);

  const { data, error } = await resend.emails.send({
    from: 'onboarding@resend.dev',
    to,
    subject,
    html,
  });

    if(error) {
        throw error
    }

    return data;
}