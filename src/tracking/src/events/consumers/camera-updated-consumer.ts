import {Consumer, CameraUpdatedEvent, Topics} from '@softzone/common';
import {Camera} from "../../models/camera.model";
export class CameraUpdatedConsumer extends Consumer<CameraUpdatedEvent> {
    topic: Topics.CameraUpdated = Topics.CameraUpdated;

    async onMessage(data: CameraUpdatedEvent['data']) {
        await Camera.updateByID(data.id, data);
    }
}
