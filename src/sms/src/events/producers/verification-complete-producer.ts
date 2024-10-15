import { Topics, Producer, SmsVerificationCompleteEvent } from '@softzone/common';

export class VerificationCompleteProducer extends Producer<SmsVerificationCompleteEvent> {
    topic: Topics.SMSVerificationCompleted = Topics.SMSVerificationCompleted;
}
