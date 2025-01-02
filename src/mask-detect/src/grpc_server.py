# Copyright 2015 gRPC authors.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from concurrent import futures
import logging
import grpc
import base64
import mask_detect_pb2
import mask_detect_pb2_grpc
import base64
import utils
from mask_detector import MaskDetector
import json
import datetime


class MaskDetect(mask_detect_pb2_grpc.MaskDetectServicer):
    def __init__(self):
        _cfg = utils.read_config()
        self._mask_detector = MaskDetector(_cfg)
    def DetectMasks(self, request, context):
        print(f"\nServer received request - {datetime.datetime.now()}")
        result = self._mask_detector.detect(base64.b64decode(request.b64_data.encode('utf-8')))
        # yield mask_detect_pb2.ServerOutput(extracted_data=json.dumps(ocr.get_json_data()))
        return mask_detect_pb2.ServerOutput(mask_detect=result)


def serve(cfg):
    port = cfg['gRPC']['port']
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=1))

    mask_detect_pb2_grpc.add_MaskDetectServicer_to_server(MaskDetect(), server)
    server.add_insecure_port("[::]:" + str(port))
    server.start()
    print(f"Server started, listening on {port}")
    server.wait_for_termination()


if __name__ == "__main__":
    cfg = utils.read_config()
    logging.basicConfig()
    serve(cfg)
