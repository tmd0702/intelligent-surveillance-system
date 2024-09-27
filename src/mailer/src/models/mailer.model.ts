import {createTransport, Transporter, TransportOptions} from 'nodemailer';
const config = require('config');

class Mailer {
    private _transporter: Transporter;

    constructor() {
        this._transporter = createTransport({
            host: config.get(`MAILER.GOOGLE.HOST`),
            port: config.get(`MAILER.GOOGLE.PORT`),
            secure: true,
            auth: {
                user: config.get(`PRIVATE_INFORM.EMAIL.GOOGLE.ADDRESS`),
                pass: config.get(`PRIVATE_INFORM.EMAIL.GOOGLE.PASSWORD`),
            },
        });
    }
    async sendMail(recipientEmail: string, subject: string, content: string) {
        const mailConfigs = {
            from: config.get(`PRIVATE_INFORM.EMAIL.GOOGLE.ADDRESS`),
            to: recipientEmail,
            subject: subject,
            html: content,
        };
        return new Promise((resolve, reject) => {
            this._transporter.sendMail(mailConfigs, function (error, info) {
                if (error) {
                    reject(error);
                } else {
                    resolve('success')
                }
            });
        })

    }
}

export const mailer = new Mailer();