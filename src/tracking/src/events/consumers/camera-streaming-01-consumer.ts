import {Consumer, CameraStreamingEvent, Topics} from '@softzone/common';
import {processFrame} from "./process-frame";

export class CameraStreaming01Consumer extends Consumer<CameraStreamingEvent> {
    topic: Topics.CameraStreaming01 = Topics.CameraStreaming01;

    async onMessage(data: CameraStreamingEvent['data']) {
        await processFrame(data);
    }
}
