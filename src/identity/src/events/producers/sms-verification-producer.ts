import { Topics, Producer, SMSVerificationEvent } from '@softzone/common';

export class SMSVerificationProducer extends Producer<SMSVerificationEvent> {
    topic: Topics.SMSVerificationNeeded = Topics.SMSVerificationNeeded;
}
