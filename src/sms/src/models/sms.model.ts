import {MessageInstance} from "twilio/lib/rest/api/v2010/account/message";
import {SMSStatus} from "@softzone/common";
const config = require('config');
const twilio = require('twilio')(config.get('PRIVATE_INFORM.TWILIO.ACCOUNT_SID'), config.get('PRIVATE_INFORM.TWILIO.AUTH_TOKEN'))

class SMS {
    async send(recipientPhoneNumber: string, content: string): Promise<SMSStatus> {
        return new Promise((resolve, reject) => {
            twilio.messages
                .create({
                    body: content,
                    to: recipientPhoneNumber,
                    from: config.get('PRIVATE_INFORM.PHONE'),
                })
                .then((message: MessageInstance) => resolve(SMSStatus.SUCCESS))
                .catch((error: any) => {
                    console.error('Error sending OTP:', error);
                    reject(SMSStatus.FAIL);
                });
        })

    }
}

export const SMSSender = new SMS();