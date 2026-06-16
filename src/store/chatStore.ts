import { create } from "zustand";
import type { ChatMessage } from "@/types";

interface ChatState {
  summary: string;
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  setSummary: (text: string) => void;
  addMessage: (msg: ChatMessage) => void;
  setMessages: (msgs: ChatMessage[]) => void;
  setLoading: (v: boolean) => void;
  setError: (e: string | null) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  summary: "",
  messages: [],
  loading: false,
  error: null,

  setSummary: (text) => set({ summary: text }),
  addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
  setMessages: (msgs) => set({ messages: msgs }),
  setLoading: (v) => set({ loading: v }),
  setError: (e) => set({ error: e }),
}));
