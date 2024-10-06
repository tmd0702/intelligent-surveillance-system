import {Consumer, CameraStreamingEvent, Topics} from '@softzone/common';
import {processFrame} from "./process-frame";

export class CameraStreamingB2Consumer extends Consumer<CameraStreamingEvent> {
    topic: Topics.CameraStreamingB2 = Topics.CameraStreamingB2;

    async onMessage(data: CameraStreamingEvent['data']) {
        await processFrame(data);
    }
}
