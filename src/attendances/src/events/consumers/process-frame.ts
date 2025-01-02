import { broadcastFrame } from './ws';
import {extractFaces} from "../../face-recog-client";
import {Topics} from "@softzone/common";
/**
 * Processes a video frame and sends it to connected WebSocket clients
 * @param frame - The video frame as a Buffer or Base64 string
 */
export const processFrame = async (data: any): Promise<void> => {
    try {

        broadcastFrame(JSON.stringify({
            "event": Topics.CameraStreamingOffice,
            "data": data.frame_bytes['$binary']['base64']
        }));
        // extractFaces(data.frame_bytes['$binary']['base64'], true).then((faces) => {
        //
        // })
    } catch (error) {
        console.error('Error processing frame:', error);
    }
};
