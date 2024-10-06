import {Consumer, CameraStreamingEvent, Topics} from '@softzone/common';
import {processFrame} from "./process-frame";

export class CameraStreamingB4Consumer extends Consumer<CameraStreamingEvent> {
    topic: Topics.CameraStreamingB4 = Topics.CameraStreamingB4;

    async onMessage(data: CameraStreamingEvent['data']) {
        await processFrame(data);
    }
}
