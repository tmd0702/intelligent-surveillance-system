import {Consumer, CameraStreamingEvent, Topics} from '@softzone/common';
import {processFrame} from "./process-frame";

export class CameraStreamingGConsumer extends Consumer<CameraStreamingEvent> {
    topic: Topics.CameraStreamingG = Topics.CameraStreamingG;

    async onMessage(data: CameraStreamingEvent['data']) {
        await processFrame(data);
    }
}
