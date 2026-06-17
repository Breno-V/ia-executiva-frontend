import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { WSClient } from "@/services/websocket/client";
import { useWebSocket, useWSStatus } from "@/hooks/useWebSocket";

function mockWebSocket() {
  let onopen: (() => void) | null = null;
  let onmessage: ((event: MessageEvent) => void) | null = null;
  let onclose: ((event: CloseEvent) => void) | null = null;
  let readyState: number = WebSocket.OPEN;

  const ws = {
    send: vi.fn(),
    close: vi.fn(),
  } as unknown as WebSocket;

  Object.defineProperties(ws, {
    readyState: { get: () => readyState, configurable: true },
    onopen: {
      get: () => onopen,
      set: (fn: typeof onopen) => { onopen = fn; },
      configurable: true,
    },
    onmessage: {
      get: () => onmessage,
      set: (fn: typeof onmessage) => { onmessage = fn; },
      configurable: true,
    },
    onclose: {
      get: () => onclose,
      set: (fn: typeof onclose) => { onclose = fn; },
      configurable: true,
    },
  });

  vi.stubGlobal(
    "WebSocket",
    vi.fn().mockImplementation(function MockWebSocket() {
      return ws;
    }),
  );

  return {
    ws,
    triggerOpen: () => { readyState = WebSocket.OPEN; onopen?.(); },
    triggerClose: () => { onclose?.(new CloseEvent("close")); },
    triggerMessage: (data: string) => {
      onmessage?.(new MessageEvent("message", { data }));
    },
  };
}

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
  vi.useRealTimers();
});

describe("WSClient", () => {
  it("starts disconnected", () => {
    const client = new WSClient();
    expect(client.getStatus()).toBe("disconnected");
  });

  it("connects and creates a WebSocket with token", () => {
    const wsMock = mockWebSocket();
    const client = new WSClient();
    client.connect("ws://test", "secret");
    expect(WebSocket).toHaveBeenCalledWith("ws://test?token=secret");
  });

  it("transitions to connected on open", () => {
    const { triggerOpen } = mockWebSocket();
    const client = new WSClient();
    const statuses: string[] = [];
    client.onStatus((s) => statuses.push(s));
    client.connect("ws://t", "t");
    triggerOpen();
    expect(statuses).toContain("connected");
  });

  it("sends ping on interval when connected", () => {
    const { ws, triggerOpen } = mockWebSocket();
    const client = new WSClient();
    client.connect("ws://t", "t");
    triggerOpen();

    act(() => { vi.advanceTimersByTime(30000); });
    expect(ws.send).toHaveBeenCalledWith(JSON.stringify({ type: "ping" }));
  });

  it("queues messages while disconnected, flushes on open", () => {
    const { ws, triggerOpen } = mockWebSocket();
    const client = new WSClient();
    client.connect("ws://t", "t");
    client.send("evt", { x: 1 });
    expect(ws.send).not.toHaveBeenCalled();

    triggerOpen();
    expect(ws.send).toHaveBeenCalledWith(JSON.stringify({ type: "evt", data: { x: 1 } }));
  });

  it("dispatches typed events to registered handlers", () => {
    const { triggerMessage } = mockWebSocket();
    const client = new WSClient();
    const handler = vi.fn();
    client.connect("ws://t", "t");

    client.on("alert:new", handler);
    triggerMessage(JSON.stringify({ type: "alert:new", data: { id: 1 } }));

    expect(handler).toHaveBeenCalledWith({ id: 1 });
  });

  it("disconnects cleanly and stops reconnecting", () => {
    const { ws } = mockWebSocket();
    const client = new WSClient();
    client.connect("ws://t", "t");

    client.disconnect();
    expect(ws.close).toHaveBeenCalled();
    expect(client.getStatus()).toBe("disconnected");
  });
});

describe("useWebSocket", () => {
  it("binds and unbinds event on mount/unmount", () => {
    const handler = vi.fn();
    const { unmount } = renderHook(() => useWebSocket("test:evt", handler, []));
    expect(handler).not.toHaveBeenCalled();
    unmount();
  });

  it("returns current status", () => {
    const { result } = renderHook(() => useWSStatus());
    expect(result.current).toBe("disconnected");
  });
});