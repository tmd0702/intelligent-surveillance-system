import {Consumer, CameraStreamingEvent, Topics} from '@softzone/common';
import {processFrame} from "./process-frame";

export class CameraStreamingB1Consumer extends Consumer<CameraStreamingEvent> {
    topic: Topics.CameraStreamingB1 = Topics.CameraStreamingB1;

    async onMessage(data: CameraStreamingEvent['data']) {
        await processFrame(data);
    }
}
