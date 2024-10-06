import {Consumer, CameraStreamingEvent, Topics} from '@softzone/common';
import {processFrame} from "./process-frame";

export class CameraStreaming04Consumer extends Consumer<CameraStreamingEvent> {
    topic: Topics.CameraStreaming04 = Topics.CameraStreaming04;

    async onMessage(data: CameraStreamingEvent['data']) {
        await processFrame(data);
    }
}
