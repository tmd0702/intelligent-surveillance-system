import {Consumer, ItemUpdatedEvent, Topics} from '@softzone/common';
import {Item} from "../../models/item.model";
export class ItemUpdatedConsumer extends Consumer<ItemUpdatedEvent> {
    topic: Topics.ItemUpdated = Topics.ItemUpdated;

    async onMessage(data: ItemUpdatedEvent['data']) {
        Item.updateByID(data.id, data);
    }
}
