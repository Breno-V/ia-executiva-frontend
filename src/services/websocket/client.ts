type WSEventHandler = (data: unknown) => void;

export type WSStatus = "connecting" | "connected" | "disconnected";

const INITIAL_BACKOFF = 1000;
const MAX_BACKOFF = 30000;
const PING_INTERVAL = 30000;

export class WSClient {
  private ws: WebSocket | null = null;
  private url = "";
  private token = "";
  private status: WSStatus = "disconnected";
  private handlers = new Map<string, Set<WSEventHandler>>();
  private statusHandlers = new Set<(s: WSStatus) => void>();
  private backoff = INITIAL_BACKOFF;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private pingTimer: ReturnType<typeof setInterval> | null = null;
  private destroyed = false;
  private pendingMessages: string[] = [];

  connect(url: string, token: string) {
    this.url = url;
    this.token = token;
    this.destroyed = false;
    this.backoff = INITIAL_BACKOFF;
    this.doConnect();
  }

  private doConnect() {
    if (this.destroyed) return;
    this.cleanup();

    const ws = new WebSocket(this.url);
    this.ws = ws;

    ws.onopen = () => {
      if (this.destroyed) return;
      ws.send(JSON.stringify({ type: "auth", data: { token: this.token } }));
      this.setStatus("connected");
      this.backoff = INITIAL_BACKOFF;
      this.flushPending();
      this.startPing();
    };

    ws.onmessage = (event) => {
      if (this.destroyed) return;
      try {
        const msg = JSON.parse(event.data);
        const { type, data } = msg;
        if (type) {
          const set = this.handlers.get(type);
          if (set) {
            for (const cb of set) {
              cb(data ?? msg);
            }
          }
        }
      } catch {
        // ignore malformed messages
      }
    };

    ws.onclose = () => {
      if (this.destroyed) return;
      this.setStatus("disconnected");
      this.stopPing();
      this.scheduleReconnect();
    };

    ws.onerror = () => {
      ws.close();
    };
  }

  private scheduleReconnect() {
    if (this.destroyed) return;
    this.reconnectTimer = setTimeout(() => {
      this.backoff = Math.min(this.backoff * 2, MAX_BACKOFF);
      this.doConnect();
    }, this.backoff);
  }

  private startPing() {
    this.pingTimer = setInterval(() => {
      if (this.ws?.readyState === WebSocket.OPEN) {
        this.ws.send(JSON.stringify({ type: "ping" }));
      }
    }, PING_INTERVAL);
  }

  private stopPing() {
    if (this.pingTimer) {
      clearInterval(this.pingTimer);
      this.pingTimer = null;
    }
  }

  private flushPending() {
    for (const msg of this.pendingMessages) {
      this.ws?.send(msg);
    }
    this.pendingMessages = [];
  }

  private cleanup() {
    this.stopPing();
    if (this.ws) {
      this.ws.onopen = null;
      this.ws.onmessage = null;
      this.ws.onclose = null;
      this.ws.onerror = null;
      this.ws.close();
      this.ws = null;
    }
  }

  disconnect() {
    this.destroyed = true;
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    this.cleanup();
    this.setStatus("disconnected");
    this.pendingMessages = [];
  }

  send(type: string, payload?: Record<string, unknown>) {
    const msg = JSON.stringify({ type, data: payload ?? {} });
    if (this.ws?.readyState === WebSocket.OPEN) {
      this.ws.send(msg);
    } else {
      this.pendingMessages.push(msg);
    }
  }

  on<T = unknown>(event: string, handler: (data: T) => void): () => void {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    this.handlers.get(event)!.add(handler as WSEventHandler);
    return () => {
      this.handlers.get(event)?.delete(handler as WSEventHandler);
    };
  }

  onStatus(handler: (status: WSStatus) => void): () => void {
    this.statusHandlers.add(handler);
    handler(this.status);
    return () => {
      this.statusHandlers.delete(handler);
    };
  }

  getStatus(): WSStatus {
    return this.status;
  }

  private setStatus(s: WSStatus) {
    this.status = s;
    for (const cb of this.statusHandlers) {
      cb(s);
    }
  }
}

export const wsClient = new WSClient();
