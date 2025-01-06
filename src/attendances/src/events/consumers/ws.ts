import WebSocket from 'ws';

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
console.log('wss', wss)
export const broadcastFrame = (data: string): void => {
    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};
