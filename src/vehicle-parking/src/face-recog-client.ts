import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { promisify } from 'util';
import {Ports} from "@softzone/common";
import { resolve } from 'path';

const PROTO_PATH = resolve(__dirname, '../protos/face-recog.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const faceRecogProto = grpc.loadPackageDefinition(packageDefinition).face_recog as any;

const client = new faceRecogProto.FaceRecog(`localhost:${Ports.FACE_RECOG}`, grpc.credentials.createInsecure());

export async function extractFaces(b64Data: string, isRegis: boolean) {
    const extractFacesAsync = promisify(client.ExtractFaces.bind(client));
    try {
        const response = await extractFacesAsync({ b64_data: b64Data, is_regis: isRegis });
        return response.faces;
    } catch (error: any) {
        throw new Error('Error calling ExtractFaces: ' + error.message);
    }
}



