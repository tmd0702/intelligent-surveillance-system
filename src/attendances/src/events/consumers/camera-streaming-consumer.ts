import {Consumer, CameraStreamingEvent, Topics} from '@softzone/common';
import {processFrame} from "./process-frame";

export class CameraStreamingConsumer extends Consumer<CameraStreamingEvent> {
    topic: Topics.CameraStreamingOffice = Topics.CameraStreamingOffice;

    async onMessage(data: CameraStreamingEvent['data']) {
        await processFrame(data);
    }
}
