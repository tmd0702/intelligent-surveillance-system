import {Topics, Consumer, EmailVerificationEvent, UserStatus} from '@softzone/common';
import {verifyAccount} from "../../controllers/mailer.controller";
import {VerificationCompleteProducer} from "../producers/verification-complete-producer";
import {kafkaWrapper} from "../../kafka-wrapper";

export class AccountVerificationConsumer extends Consumer<EmailVerificationEvent> {
    topic: Topics.EmailVerificationNeeded = Topics.EmailVerificationNeeded;

    async onMessage(data: EmailVerificationEvent['data']) {
        const status = await verifyAccount(data);
        await new VerificationCompleteProducer(kafkaWrapper.producer).produce({
            ...data,
            status: status
        });
    }
}
