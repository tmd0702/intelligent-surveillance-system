import {Consumer, StoreCreatedEvent, Topics} from '@softzone/common';
const Store = require("../../models/store.model");

export class StoreCreatedConsumer extends Consumer<StoreCreatedEvent> {
    topic: Topics.StoreCreated = Topics.StoreCreated;

    async onMessage(data: StoreCreatedEvent['data']) {
        Store.create(data);
    }
}
