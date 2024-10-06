import {Consumer, CameraStreamingEvent, Topics} from '@softzone/common';
import {processFrame} from "./process-frame";

export class CameraStreamingB3Consumer extends Consumer<CameraStreamingEvent> {
    topic: Topics.CameraStreamingB3 = Topics.CameraStreamingB3;

    async onMessage(data: CameraStreamingEvent['data']) {
        await processFrame(data);
    }
}
