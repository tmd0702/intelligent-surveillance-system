import { Topics, Producer, PaymentCreatedEvent } from '@softzone/common';

export class PaymentCreatedProducer extends Producer<PaymentCreatedEvent> {
    topic: Topics.PaymentCreated = Topics.PaymentCreated;
}
