const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { promisify } = require('util');
const { Ports } = require('@softzone/common');
const { resolve } = require('path');

const PROTO_PATH = resolve(__dirname, './protos/face-recog.proto');

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const faceRecogProto = grpc.loadPackageDefinition(packageDefinition).face_recog;

const client = new faceRecogProto.FaceRecog(`localhost:${Ports.FACE_RECOG}`, grpc.credentials.createInsecure());

async function extractFaces(b64Data) {
    const extractFacesAsync = promisify(client.ExtractFaces.bind(client));
    try {
        const response = await extractFacesAsync({ b64_data: b64Data });
        return response.faces;
    } catch (error) {
        throw new Error('Error calling ExtractFaces: ' + error.message);
    }
}

async function regisFaces(b64Data) {
    const regisFacesAsync = promisify(client.RegisFaces.bind(client));
    try {
        const response = await regisFacesAsync({ b64_data: b64Data });
        return response.face_id;
    } catch (error) {
        throw new Error('Error calling RegisFaces: ' + error.message);
    }
}

module.exports = {
    extractFaces,
    regisFaces,
};
