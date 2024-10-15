import {Topics, Consumer, SMSVerificationEvent, UserStatus} from '@softzone/common';
import {verifyAccount} from "../../controllers/sms.controller";
import {VerificationCompleteProducer} from "../producers/verification-complete-producer";
import {kafkaWrapper} from "../../kafka-wrapper";

export class AccountVerificationConsumer extends Consumer<SMSVerificationEvent> {
    topic: Topics.SMSVerificationNeeded = Topics.SMSVerificationNeeded;

    async onMessage(data: SMSVerificationEvent['data']) {
        const status = await verifyAccount(data);
        await new VerificationCompleteProducer(kafkaWrapper.producer).produce({
            ...data,
            status: status
        });
    }
}
