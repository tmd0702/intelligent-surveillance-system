import {CameraStreamingEvent} from "@softzone/common";
import {FrameLog} from "../../models/frame-log.model";
import {FaceRecognitionLog} from "../../models/face-recognition-log.model";
import {extractFaces} from "../../face-recog-client";
import {FaceRecogDto} from "../../dtos/face-recog.dto";
import WebSocket from 'ws';

const clients: Set<WebSocket> = new Set();

const wss = new WebSocket.Server({ port: 3848 });

wss.on('connection', (ws: WebSocket) => {
    console.log('WebSocket client connected');
    clients.add(ws);

    ws.on('close', () => {
        console.log('WebSocket client disconnected');
        clients.delete(ws);
    });

    ws.on('error', (err) => {
        console.error('WebSocket error:', err);
        clients.delete(ws);
    });
});

const broadcastFrame = (data: string): void => {
    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

function getSizeInMB(base64String: string): number {
    const buffer = Buffer.from(base64String, 'base64');
    const sizeInBytes = buffer.length;
    const sizeInMB = sizeInBytes / (1024 * 1024);
    return sizeInMB;
}
export const processFrame = async (data: any) => {
    broadcastFrame(JSON.stringify({
        "event": data.topic,
        "data": data.frame_bytes['$binary']['base64']
    }));
    const faces = await extractFaces(data.frame_bytes['$binary']['base64'], true);
    const frame = await FrameLog.create({
        captured_at: data.timestamp,
        camera_id: data.camera_id,
        frame_url: 'test',
        is_archived: false,
        size_mb: getSizeInMB(data.frame_bytes['$binary']['base64']),
        byte_data: Buffer.from(data.frame_bytes['$binary']['base64'], 'base64'),
        // byte_data: data.frame_bytes['$binary']['base64'],
        encoding_format: data.encoding_format,
        resolution: data.resolution
    });
    faces.forEach((recogMetadata: FaceRecogDto) => {
        // console.log(recogMetadata)
        FaceRecognitionLog.create({
            camera_id: frame.camera_id,
            face_id: recogMetadata.face_id,
            frame_id: frame.id,
            confidence_score: recogMetadata.confidence_score,
            recognized_at: frame.captured_at,
            byte_data: Buffer.from(recogMetadata.cropped_image, 'base64')
        })
    })
}