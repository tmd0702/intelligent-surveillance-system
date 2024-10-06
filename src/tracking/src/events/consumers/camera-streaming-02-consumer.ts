import {Consumer, CameraStreamingEvent, Topics} from '@softzone/common';
import {processFrame} from "./process-frame";

export class CameraStreaming02Consumer extends Consumer<CameraStreamingEvent> {
    topic: Topics.CameraStreaming02 = Topics.CameraStreaming02;

    async onMessage(data: CameraStreamingEvent['data']) {
        await processFrame(data);
    }
}
