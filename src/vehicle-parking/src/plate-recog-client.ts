import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { promisify } from 'util';
import {Ports} from "@softzone/common";
import { resolve } from 'path';

const PROTO_PATH = resolve(__dirname, '../protos/plate-recog.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const plateRecogProto = grpc.loadPackageDefinition(packageDefinition).plate_recog as any;

const client = new plateRecogProto.PlateRecog(`localhost:${Ports.PLATE_RECOG}`, grpc.credentials.createInsecure());

export async function extractPlate(b64Data: string) {
    const extractPlateAsync = promisify(client.ExtractPlate.bind(client));
    try {
        const response = await extractPlateAsync({ b64_data: b64Data });
        return response.plate;
    } catch (error: any) {
        throw new Error('Error calling ExtractPlate: ' + error.message);
    }
}

