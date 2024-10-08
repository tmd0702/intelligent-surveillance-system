export interface FaceRecognitionLogDto {
    id?: string;
    camera_id: string;
    face_id: string;
    frame_id: string;
    confidence_score: number;
    recognized_at?: string;
}