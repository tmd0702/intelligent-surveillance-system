import { Topics, Producer, EmailVerificationCompleteEvent } from '@softzone/common';

export class VerificationCompleteProducer extends Producer<EmailVerificationCompleteEvent> {
    topic: Topics.EmailVerificationCompleted = Topics.EmailVerificationCompleted;
}
