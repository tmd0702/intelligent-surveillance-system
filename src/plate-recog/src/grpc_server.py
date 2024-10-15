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
import plate_recog_pb2
import plate_recog_pb2_grpc
import base64
import utils
import json
import datetime
from plate_recognizer import PlateRecognizer


class PlateRecog(plate_recog_pb2_grpc.PlateRecogServicer):
    def __init__(self):
        _cfg = utils.read_config()
        self._plate_recognizer = PlateRecognizer(_cfg)
    def ExtractPlates(self, request, context):
        print(f"\nServer received request - {datetime.datetime.now()}")
        recog_result = self._plate_recognizer.recog(base64.b64decode(request.b64_data.encode('utf-8')))
        # yield plate_recog_pb2.ServerOutput(extracted_data=json.dumps(ocr.get_json_data()))
        return plate_recog_pb2.ServerOutput(plate={'plate_number': recog_result['text'], 'confidence_score': (recog_result['rec_conf'] + recog_result['det_conf']) / 2})


def serve(cfg):
    port = cfg['gRPC']['port']
    server = grpc.server(futures.ThreadPoolExecutor(max_workers=1))

    # server_credentials = grpc.ssl_server_credentials(
    #     ((private_key, cert_chain),), root_cert, require_client_auth=True)
    # server.add_secure_port('%s:%d' % ("localhost", port), server_credentials)

    # with open('CA/rootCA/private/ca.key.pem', 'rb') as f:
    #     private_key = f.read()
    # with open('CA/rootCA/certs/ca.cert.pem', 'rb') as f:
    #     certificate_chain = f.read()
    # server_credentials = grpc.ssl_server_credentials(((private_key, certificate_chain),))
    # server.add_secure_port('%s:%d' % ("localhost", port), server_credentials)

    plate_recog_pb2_grpc.add_PlateRecogServicer_to_server(PlateRecog(), server)
    server.add_insecure_port("[::]:" + str(port))
    server.start()
    print(f"Server started, listening on {port}")
    server.wait_for_termination()


if __name__ == "__main__":
    cfg = utils.read_config()
    logging.basicConfig()
    serve(cfg)