export interface FrameLogDto {
    id?: string;
    camera_id: string;
    captured_at?: string;
    frame_url: string;
    size_mb: number;
    is_archieved: boolean;
    byte_data?: string;
    resolution?: string;
    encoding_format?: string;
}