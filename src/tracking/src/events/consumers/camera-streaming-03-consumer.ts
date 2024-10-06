import {Consumer, CameraStreamingEvent, Topics} from '@softzone/common';
import {processFrame} from "./process-frame";

export class CameraStreaming03Consumer extends Consumer<CameraStreamingEvent> {
    topic: Topics.CameraStreaming03 = Topics.CameraStreaming03;

    async onMessage(data: CameraStreamingEvent['data']) {
        await processFrame(data);
    }
}
