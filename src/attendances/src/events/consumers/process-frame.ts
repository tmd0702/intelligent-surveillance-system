import {extractFaces} from "../../face-recog-client";
import {AttendanceStatus, Topics} from "@softzone/common";
/**
 * Processes a video frame and sends it to connected WebSocket clients
 * @param frame - The video frame as a Buffer or Base64 string
 */

import WebSocket from 'ws';
import {Employee} from "../../models/employee.model";
import {Attendance} from "../../models/attendance.model";

const clients: Set<WebSocket> = new Set();

const wss = new WebSocket.Server({ port: 3849 });

wss.on('connection', (ws: WebSocket) => {
    console.log('WebSocket client connected');
    clients.add(ws);

    ws.on('close', () => {
        console.log('WebSocket client disconnected');
        clients.delete(ws);
    });

    ws.on('error', (err) => {
        console.error('WebSocket error:', err);
        clients.delete(ws);
    });
});

const broadcastFrame = (data: string): void => {
    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

const secondsDiffFromNow = (date: Date | string) => {
    try {
        const timestamp: Date = new Date(date);
        const currentTimestamp = new Date();

        const timeDifference = Math.abs(currentTimestamp.getTime() - timestamp.getTime()) / 1000;
        // console.log('timeDifference', timeDifference)
        return timeDifference;
    } catch (err) {
        return 0;
    }
}
let lastRecog = new Date();
export const processFrame = async (data: any): Promise<void> => {
    try {
        // console.log('data', data.frame_bytes['$binary']['base64'].length);
        broadcastFrame(JSON.stringify({
            "event": Topics.CameraStreamingOffice,
            "data": data.frame_bytes['$binary']['base64']
        }));
        if (secondsDiffFromNow(lastRecog) >= 3) {
            lastRecog = new Date();
            extractFaces(data.frame_bytes['$binary']['base64'], false).then(faces => {
                faces.map((face: any) => {
                    if (face.confidence_score > 0) {
                        Employee.findByFaceID(face.face_id).then(employee => {
                            if (employee) {
                                Attendance.findLastByEmployeeID(employee.id).then(attendance => {
                                    if (!attendance || (attendance && secondsDiffFromNow(attendance.created_at) > 20)) {
                                        Attendance.create({confidence_score: Number(face.confidence_score),employee_id: employee.id, status: AttendanceStatus.PRESENT, byte_data: Buffer.from(face.cropped_image, 'base64')}).then(attendance => {
                                            attendance['employee'] = employee;
                                            broadcastFrame(JSON.stringify({
                                                "event": 'attendance.check',
                                                "data": attendance
                                            }));
                                        })

                                    }
                                })

                            }

                        })
                    }
                })

            })
        }



    } catch (error) {
        console.error('Error processing frame:', error);
    }
};
