import { useEffect, useState } from "react";
import { wsClient } from "@/services/websocket";
import type { WSStatus } from "@/services/websocket";

export function useWebSocket<T = unknown>(
  event: string,
  handler: (data: T) => void,
  deps: unknown[] = [],
) {
  const [status, setStatus] = useState<WSStatus>(wsClient.getStatus());

  useEffect(() => {
    const unbindEvent = wsClient.on<T>(event, handler);
    const unbindStatus = wsClient.onStatus(setStatus);
    return () => {
      unbindEvent();
      unbindStatus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event, handler, ...deps]);

  return status;
}

export function useWSStatus() {
  const [status, setStatus] = useState<WSStatus>(wsClient.getStatus());
  useEffect(() => wsClient.onStatus(setStatus), []);
  return status;
}
