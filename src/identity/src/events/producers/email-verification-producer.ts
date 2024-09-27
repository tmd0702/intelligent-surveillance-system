import { Topics, Producer, EmailVerificationEvent } from '@softzone/common';

export class EmailVerificationProducer extends Producer<EmailVerificationEvent> {
    topic: Topics.EmailVerificationNeeded = Topics.EmailVerificationNeeded;
}
