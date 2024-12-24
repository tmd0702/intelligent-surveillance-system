export interface FrameLogDto {
    id?: string;
    camera_id: string;
    captured_at?: string;
    frame_url: string;
    size_mb: number;
    is_archived: boolean;
    byte_data?: Buffer;
    resolution?: string;
    encoding_format?: string;
}