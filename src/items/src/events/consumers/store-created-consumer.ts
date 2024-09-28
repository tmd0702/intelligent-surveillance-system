import {Consumer, StoreCreatedEvent, Topics} from '@softzone/common';
import {Store} from "../../models/store.model";
export class StoreCreatedConsumer extends Consumer<StoreCreatedEvent> {
    topic: Topics.StoreCreated = Topics.StoreCreated;

    async onMessage(data: StoreCreatedEvent['data']) {
        Store.create(data);
    }
}
