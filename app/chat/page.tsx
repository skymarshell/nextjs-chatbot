"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChatAiProvider, useChatAi } from "@/context/ChatAI_Context";
import ChatAI from "@/lib/ChatAI";
import { setLoading } from "@/Components/Loading";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import style from "@/public/styles/chat_ai.module.css";
import {
  CirclePlus,
  CircleWorld,
  LightBulb,
  ImageIcon,
  CircleDots,
} from "@/public/icon/icon_export";

export default function Page() {
  return (
    <ChatAiProvider>
      <div className="h-screen flex flex-col mt-4">
        <Chat_History className="h-[80%] p-4 overflow-y-auto backdrop-blur-md bg-white/5 rounded-xl border border-white/10 shadow-lg" />
        <Chat_Search className="h-[20%] mt-4 p-4 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 shadow-lg" />
      </div>
    </ChatAiProvider>
  );
}

type Chat_HistoryProps = {
  className: string;
};

function Chat_History({ className }: Chat_HistoryProps) {
  const { history } = useChatAi();
  const lastItemRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (lastItemRef.current) {
      lastItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [history]);

  function ChatHistory({ chat_history }: { chat_history: string }) {
    return (
      <div className="ms-auto w-[50%] p-4 rounded-4xl bg-[#988080]">
        <p>{chat_history}</p>
      </div>
    );
  }

  function ChatAnswer({ chat_answer }: { chat_answer: string }) {
    return (
      <div className={`${style._chat_answer} prose prose-xl max-w-full`}>
        <Markdown
          components={{
            code({ children, className, ...rest }) {
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  PreTag="div"
                  // eslint-disable-next-line react/no-children-prop
                  children={String(children).replace(/\n$/, "")}
                  language={match[1]}
                  style={dark}
                />
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              );
            },
          }}
        >
          {chat_answer}
        </Markdown>
      </div>
    );
  }

  return (
    <div className={className}>
      {history.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-3xl font-bold">No history found.</p>
        </div>
      ) : (
        history.map((item, index) => {
          const isLast: boolean = index === history.length - 1;

          return (
            <div
              key={index}
              ref={isLast ? lastItemRef : null}
              className="flex flex-col border-b-2 p-2"
            >
              <ChatHistory chat_history={item.question} />
              <ChatAnswer chat_answer={item.answer} />
            </div>
          );
        })
      )}
    </div>
  );
}

type Chat_SearchProps = {
  className: string;
};

function Chat_Search({ className }: Chat_SearchProps) {
  const [textarea, setTextarea] = useState("");
  const { setHistory } = useChatAi();

  const searchChatAi = async () => {
    setLoading(true);
    const answer = await ChatAI.Ask(textarea);
    setHistory((prev) => [...prev, { question: textarea, answer: answer }]);
    setTextarea("");
    setLoading(false);
  };

  return (
    <div className={className}>
      <div className="h-[80%] w-full p-3">
        <textarea
          onChange={(e) => setTextarea(e.target.value)}
          value={textarea}
          className="h-full w-full p-2 resize-none text-white outline-none border rounded-xl"
        />
      </div>
      <div className="h-[20%] w-full p-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <CirclePlus size="30" />
          <CircleWorld size="30" />
          <CirclePlus size="30" />
          <LightBulb size="30" />
          <ImageIcon size="30" />
          <CircleDots size="30" />
        </div>
        <div className="flex items-center space-x-3">
          <button
            type="submit"
            onClick={searchChatAi}
            className="btn btn-sm btn-primary"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
