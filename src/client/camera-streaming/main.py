import cv2
import base64
from bson import json_util
from datetime import datetime, timedelta, timezone
from kafka import KafkaProducer, KafkaAdminClient
from models.camera import fetch_cameras
from utils import load_config
import asyncio
import os, json
import random
async def mockup_stream(producer):
    config = load_config('configs/development.yaml')
    cameras = fetch_cameras(config)
    mm = {}
    dir_list = os.listdir('data')
    videos = list(map(lambda x: os.path.join('data', x), dir_list))
    if len(videos) < len(cameras):
        raise ValueError("Not enough videos for all cameras")
    while True:
        random.shuffle(videos)
        random.shuffle(cameras)

        tasks = []
        for camera in cameras:
            topic = f'camera.streaming.{camera[6]}' if mm.get(f'camera.streaming.{camera[6]}', None) == None else f'camera.streaming.{camera[6]}.tmp'
            mm[f'camera.streaming.{camera[6]}'] = mm.get(f'camera.streaming.{camera[6]}', 0) + 1
            video_file = random.choice(videos)
            tasks.append(asyncio.create_task(publish_video(video_file, camera[0], topic, producer)))

        await asyncio.gather(*tasks)

        # await asyncio.sleep(5)

def get_video_resolution_label(height):
    if height >= 1080:
        return '1080p'
    elif height >= 720:
        return '720p'
    elif height >= 480:
        return '480p'
    elif height >= 360:
        return '360p'
    else:
        return '240p'


async def publish_video(video_file, camera_id, topic, producer):
    print(f"Starting stream: {video_file}, Camera: {camera_id}, Topic: {topic}")

    video = cv2.VideoCapture(video_file)
    height = int(video.get(cv2.CAP_PROP_FRAME_HEIGHT))

    while video.isOpened():
        success, frame = video.read()
        if not success:
            break

        ret, buffer = cv2.imencode(".jpg", frame)
        # print(success, len(buffer.tobytes()), topic)
        if not ret:
            continue
        local_timezone = timezone(timedelta(hours=7))
        now = datetime.now(local_timezone)
        formatted_timestamp = now.strftime('%Y-%m-%d %H:%M:%S.%f%z')
        msg = {
                "topic": topic,
                "frame_bytes": buffer.tobytes(),#base64.b64encode(buffer.tobytes()).decode("utf-8"),
                "camera_id": camera_id,
                "resolution": get_video_resolution_label(height),
                "encoding_format": "JPEG",
                "timestamp": formatted_timestamp
            }
        producer.send(topic, json.dumps(msg, default=json_util.default).encode('utf-8'))
        await asyncio.sleep(0.1)  # Simulating ~30fps

    video.release()
    print(f"Finished streaming video {video_file} from camera {camera_id}")
if __name__ == '__main__':
    producer = KafkaProducer(bootstrap_servers=['localhost:9092'], api_version=(2, 5, 0))
    asyncio.run(mockup_stream(producer))
