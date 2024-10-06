import {CameraStreamingEvent} from "@softzone/common";
import {FrameLog} from "../../models/frame-log.model";
import {FaceRecognitionLog} from "../../models/face-recognition-log.model";

export const processFrame = async (data: CameraStreamingEvent['data']) => {
    const faceRecogMetadata = {
        face_id: 'uuid',
        confidence_score: 0.8,

    };
    const frame = await FrameLog.create({
        captured_at: data.timestamp,
        camera_id: data.camera_id,
        frame_url: 'test',
        is_archieved: false,
        size_mb: 1,
        byte_data: data.frame_bytes,
        encoding_format: data.encoding_format,
        resolution: data.resolution
    });
    await FaceRecognitionLog.create({
        camera_id: frame.camera_id,
        face_id: faceRecogMetadata.face_id,
        frame_id: frame.id,
        confidence_score: faceRecogMetadata.confidence_score,
        recogized_at: frame.captured_at
    })

}