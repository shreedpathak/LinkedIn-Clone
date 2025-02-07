import  {MailtrapClient} from "mailtrap"
import dotenv from "dotenv" 

dotenv.config({ path: './.env' });

const TOKEN = process.env.TOKEN;

console.log(process.env.MAIL_SENDER) ;
console.log(process.env.TOKEN) ;
console.log(process.env.MAIL_SENDER_NAME) ;

export const client = new MailtrapClient({
  token: TOKEN,
});

export const sender = {
  email: process.env.MAIL_SENDER,
  name: process.env.MAIL_SENDER_NAME,
};
