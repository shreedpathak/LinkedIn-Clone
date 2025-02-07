import {client, sender} from '../lib/mailTrap.js'
import { createWelcomeEmailTemplate } from './emailTemplate.js';

export const sendWelcomeEmail = async (email, name, profileURL) => {
    const reciepient = [{email}];
    try{
        const response = await client.send({
            from:sender,
            to:reciepient,
            subject:"Welcome to UnLinked",
            html: createWelcomeEmailTemplate(name, profileURL),
            category:"Welcome"
        });
        console.log("Welcome Email sent succesffully", response);
    }
    catch(error){
        console.log({"ERROR IN SENDING WELCOME EMAIL": error.message});
        throw new Error(error);
    }
};