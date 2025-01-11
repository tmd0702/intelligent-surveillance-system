
import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import {startWebsocketConnection, startTrackingWebsocketConnection} from 'services/WebSocketServices';
import App from "App";

// Softzone Context Provider
import { MaterialUIControllerProvider } from "context";

const container = document.getElementById("app");
const root = createRoot(container);
startWebsocketConnection();
startTrackingWebsocketConnection();
root.render(
  <HashRouter>
    <MaterialUIControllerProvider>
      <App />
    </MaterialUIControllerProvider>
  </HashRouter>
);


