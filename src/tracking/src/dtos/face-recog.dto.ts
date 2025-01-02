export interface FaceRecogDto {
    face_id: string;
    confidence_score: number;
    fake_prob: number;
    cropped_image: string;
}