import {Consumer, StoreCreatedEvent, StoreUpdatedEvent, Topics} from '@softzone/common';
const Store = require("../../models/store.model");

export class StoreUpdatedConsumer extends Consumer<StoreUpdatedEvent> {
    topic: Topics.StoreUpdated = Topics.StoreUpdated;

    async onMessage(data: StoreCreatedEvent['data']) {
        Store.updateByID(data.id, data);
    }
}
