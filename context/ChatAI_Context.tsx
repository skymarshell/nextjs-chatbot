import React, { createContext, useContext, useState } from "react";
import ChatHistory from "@/types/ChatHistory";

// 1. Define the context interface
export interface IChatAi {
  currentAnswer: string;
  setCurrentAnswer: React.Dispatch<React.SetStateAction<string>>;
  history: ChatHistory[];
  setHistory: React.Dispatch<React.SetStateAction<ChatHistory[]>>;
}

// 2. Create context
export const ChatAiContext = createContext<IChatAi | null>(null);

// 3. Custom hook to use context
export const useChatAi = () => {
  const context = useContext(ChatAiContext);
  if (!context) {
    throw new Error("useChatAi must be used within a ChatAiProvider");
  }
  return context;
};

// 4. Provider component

/**
 *
 * @example
 * ```tsx
      <ChatAiProvider>
        <div className="h-screen flex flex-col mt-4">
          <Chat_History className="h-[80%] p-2 overflow-y-auto bg-[#2b2a2a]" />
        </div>
      </ChatAiProvider>


      function Chat_History({ className }: Chat_HistoryProps) {
        const { history } = useChatAi();
      }
    ```
 */
export const ChatAiProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [history, setHistory] = useState<ChatHistory[]>([]);

  const value: IChatAi = {
    currentAnswer,
    setCurrentAnswer,
    history,
    setHistory,
  };

  return (
    <ChatAiContext.Provider value={value}>{children}</ChatAiContext.Provider>
  );
};
