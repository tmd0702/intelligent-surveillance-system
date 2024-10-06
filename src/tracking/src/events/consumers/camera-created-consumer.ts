import {Consumer, CameraCreatedEvent, Topics} from '@softzone/common';
import {Camera} from "../../models/camera.model";
export class CameraCreatedConsumer extends Consumer<CameraCreatedEvent> {
    topic: Topics.CameraCreated = Topics.CameraCreated;

    async onMessage(data: CameraCreatedEvent['data']) {
        await Camera.create(data);
    }
}
