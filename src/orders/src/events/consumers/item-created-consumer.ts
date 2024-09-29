import {Consumer, ItemCreatedEvent, Topics} from '@softzone/common';
const Item = require("../../models/item.model");

export class ItemCreatedConsumer extends Consumer<ItemCreatedEvent> {
    topic: Topics.ItemCreated = Topics.ItemCreated;

    async onMessage(data: ItemCreatedEvent['data']) {
        Item.create(data);
    }
}
