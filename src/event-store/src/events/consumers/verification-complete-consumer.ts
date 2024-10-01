import {Consumer, EmailStatus, EmailVerificationCompleteEvent, Topics, UserStatus} from '@softzone/common';
import EventModel from "../../models/event.model";

export class VerificationCompleteConsumer extends Consumer<EmailVerificationCompleteEvent> {
    topic: Topics.EmailVerificationCompleted = Topics.EmailVerificationCompleted;

    async onMessage(data: EmailVerificationCompleteEvent['data']) {
        const newEvent = {
            eventType: this.topic,
            payload: data,
        };
        await EventModel.create(newEvent);
    }
}
