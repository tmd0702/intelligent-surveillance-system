const host = 'wss://dev.softzoneglobal.com/websocket/';
const trackingHost = 'wss://dev.softzoneglobal.com/trackingWebsocket/';
export let send
export const startWebsocketConnection = () => {
  const ws = new window.WebSocket(host)
  console.log('attendance ws start', ws)
  ws.onopen = () => {
    console.log('opened ws connection')
  }

  ws.onclose = (e) => {
    console.log('close ws connection: ', e.code, e.reason)
  }

  ws.onmessage = (event) => {
    const receivedData = JSON.parse(event.data);
    if (receivedData.event === 'camera.streaming.office' && onLoggerCallback) {//&& onLoggerCallback) {
      onLoggerCallback(receivedData);
    } else if (receivedData.event === 'attendance.check' && onAttendCallback) {
      onAttendCallback(receivedData);
    }

  };

  send = (props) => {
    console.log('props', props);
    const dataProps = JSON.parse(props)
    if (ws.readyState === WebSocket.OPEN) {
      // if (dataProps.action === 'live-chat') {
      //   ws.send(JSON.stringify({ event: "message", message: dataProps.message, attachment_public_id: dataProps.public_id }));
      // }

    }
  }
}

export const startTrackingWebsocketConnection = () => {
  const trackingWS = new window.WebSocket(trackingHost)
  console.log('tracking ws start', trackingWS)
  trackingWS.onopen = () => {
    console.log('opened ws connection')
  }

  trackingWS.onclose = (e) => {
    console.log('close ws connection: ', e.code, e.reason)
  }

  trackingWS.onmessage = (event) => {
    const receivedData = JSON.parse(event.data);
    if (onViewerCallback) onViewerCallback(receivedData);

  };

  send = (props) => {
    const dataProps = JSON.parse(props)
    if (trackingWS.readyState === WebSocket.OPEN) {
      // if (dataProps.action === 'live-chat') {
      //   ws.send(JSON.stringify({ event: "message", message: dataProps.message, attachment_public_id: dataProps.public_id }));
      // }

    }
  }
}

let onLoggerCallback, onViewerCallback, onAttendCallback;

export const registerOnLoggerCallback = (fn) => {
  onLoggerCallback = fn
}

export const registerOnAttendCallback = (fn) => {
  onAttendCallback = fn;
}

export const registerOnViewerCallback = (fn) => {
  onViewerCallback = fn
}