import {Consumer, StoreUpdatedEvent, Topics} from '@softzone/common';
import {Store} from "../../models/store.model";
export class StoreUpdatedConsumer extends Consumer<StoreUpdatedEvent> {
    topic: Topics.StoreUpdated = Topics.StoreUpdated;

    async onMessage(data: StoreUpdatedEvent['data']) {
        Store.updateByID(data.id, data);
    }
}
