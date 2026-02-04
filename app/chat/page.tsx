"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChatAiProvider, useChatAi } from "@/context/ChatAI_Context";
import ChatAI from "@/lib/ChatAI";
// local loading handled by adding a placeholder history entry
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import style from "@/public/styles/chat_ai.module.css";
import remarkGfm from "remark-gfm";
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
          remarkPlugins={[remarkGfm]}
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
  const { history, setHistory } = useChatAi();

  const searchChatAi = async () => {
    if (!textarea.trim()) return;

    // เพิ่ม entry ชั่วคราวในประวัติการสนทนาเพื่อตัวบ่งชี้สถานะการโหลด
    // - ใช้ตัวแปร `placeholderIndex` เก็บตำแหน่ง (index) ของรายการที่เพิ่มเข้ามา
    // - ตั้งค่าเริ่มต้นเป็น -1 เพื่อเป็น sentinel ว่ายังไม่ได้ถูกตั้งค่า
    let placeholderIndex: number = -1;
    setHistory((prev) => {
      // บันทึกตำแหน่งที่รายการใหม่จะถูกวาง (ความยาวของ prev)
      // รายการที่เพิ่มจะอยู่ที่ index = prev.length
      placeholderIndex = prev.length;
      // เพิ่ม entry ชั่วคราวที่มี answer เป็น "search..." เพื่อให้ UI แสดงสถานะการค้นหา
      return [...prev, { question: textarea, answer: "search..." }];
    });

    try {
      // รอคำตอบจาก ChatAI
      const answer = await ChatAI.Ask(textarea);

      // เมื่อได้คำตอบ ให้แทนที่เฉพาะรายการ placeholder ที่ตำแหน่ง `placeholderIndex`
      // ทำเช่นนี้เพื่อไม่ต้องเพิ่มรายการใหม่ และให้ UI แสดงผลในตำแหน่งเดิม
      setHistory((prev) =>
        prev.map((it, idx) =>
          idx === placeholderIndex ? { question: textarea, answer } : it
        )
      );
    } catch (err) {
      // เกิดข้อผิดพลาดขณะเรียก AI — แจ้งผู้ใช้และอัปเดต placeholder เป็นข้อความแสดงความล้มเหลว
      alert("An error occurred while fetching the answer.");
      setHistory((prev) =>
        prev.map((it, idx) =>
          idx === placeholderIndex
            ? { question: textarea, answer: "(failed to get response)" }
            : it
        )
      );
    } finally {
      // ล้าง textarea เสมอเมื่อเสร็จ
      setTextarea("");
    }

    /*
      หมายเหตุสำคัญ (ข้อควรระวัง):
      - การใช้ `index` (ตำแหน่งในอาเรย์) เป็นตัวอ้างอิงทำงานได้ดีเมื่อผู้ใช้ส่งคำขอทีละคำ
      - ถ้ามีการส่งคำขอพร้อมกันหลายครั้ง (concurrent) ตัวแปร `placeholderIndex` ที่แชร์กันใน scope เดียวกันอาจถูกเขียนทับ
        ทำให้การอัปเดตรายการผิดรายการได้ (race condition)
      - ถ้าต้องการรองรับหลายคำขอพร้อมกัน แนะนำให้เพิ่ม `id` ให้แต่ละ entry เช่น
          { id: Date.now() + Math.random(), question, answer }
        แล้วอัปเดตโดยแมตช์ `id` แทนการแมตช์ `index` เพื่อความปลอดภัย
    */
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
          <div className="flex justify-center items-center space-x-2">
            <CirclePlus size="40" />
          </div>
          <div className="flex justify-center items-center space-x-2 border border-white rounded-4xl py-1 px-2">
            <CircleWorld size="30" />
            <p className="mt-1">ค้นหา</p>
          </div>
          <div className="flex justify-center items-center space-x-2 border border-white rounded-4xl py-1 px-2">
            <LightBulb size="30" />
            <p className="mt-1">คิดเหตุผล</p>
          </div>
          <div className="flex justify-center items-center space-x-2 border border-white rounded-4xl py-1 px-2">
            <ImageIcon size="30" />
            <p className="mt-1">สร้างภาพ</p>
          </div>
          <div className="flex justify-center items-center space-x-2">
            <CircleDots size="40" />
          </div>
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
