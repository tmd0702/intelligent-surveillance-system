import {Topics, Consumer, EmailVerificationEvent, UserStatus} from '@softzone/common';
import EventModel from "../../models/event.model";

export class AccountVerificationConsumer extends Consumer<EmailVerificationEvent> {
    topic: Topics.EmailVerificationNeeded = Topics.EmailVerificationNeeded;

    async onMessage(data: EmailVerificationEvent['data']) {
        const newEvent = {
            eventType: this.topic,
            payload: data,
        };
        await EventModel.create(newEvent);
    }
}
