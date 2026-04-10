"use client";

import { useState } from "react";
import "./toast-preview.css";

interface ToastItem {
  id: number;
  message: string;
  time: string;
}

const SAMPLE_TOASTS: ToastItem[] = [
  { id: 1, message: "'제목파일'이 자료 목록에 추가되었습니다.", time: "3분 전" },
  { id: 2, message: "복사가 완료되었습니다.", time: "오후 12:25" },
  { id: 3, message: "원인 분석 요청이 완료되었습니다.", time: "오후 12:25" },
];

function ToastCard({ message, time, onDelete }: {
  message: string;
  time: string;
  onDelete?: () => void;
}) {
  return (
    <div className="ax-toast-card">
      <span className="ax-toast-message">{message}</span>
      <span className="ax-toast-time">{time}</span>
      {onDelete && (
        <button className="ax-toast-delete" onClick={onDelete} aria-label="삭제" />
      )}
    </div>
  );
}

export function ToastPreview() {
  const [toasts, setToasts] = useState<ToastItem[]>(SAMPLE_TOASTS);

  const handleDeleteAll = () => {
    setToasts([]);
    setTimeout(() => setToasts(SAMPLE_TOASTS), 1000);
  };

  const handleDelete = (id: number) => {
    setToasts((prev) => {
      const next = prev.filter((t) => t.id !== id);
      if (next.length === 0) {
        setTimeout(() => setToasts(SAMPLE_TOASTS), 1000);
      }
      return next;
    });
  };

  return (
    <div className="flex flex-col gap-6 mt-3 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
      {/* 3개 이상: 전체 삭제 버튼 포함 */}
      <div>
        <p className="text-[10px] font-medium text-zinc-400 uppercase mb-3">3개 이상 — 전체 삭제 버튼 노출</p>
        <div className="ax-toast-container">
          {toasts.length >= 3 && (
            <button className="ax-toast-clear-all" onClick={handleDeleteAll}>
              전체 삭제하기
            </button>
          )}
          {toasts.map((t) => (
            <ToastCard
              key={t.id}
              message={t.message}
              time={t.time}
              onDelete={() => handleDelete(t.id)}
            />
          ))}
        </div>
      </div>

      {/* 2개 이하: 기본 */}
      <div>
        <p className="text-[10px] font-medium text-zinc-400 uppercase mb-3">2개 이하 — 기본</p>
        <div className="ax-toast-container">
          <ToastCard message="'제목파일'이 자료 목록에 추가되었습니다." time="오후 12:25" onDelete={() => {}} />
          <ToastCard message="복사가 완료되었습니다." time="오후 12:25" onDelete={() => {}} />
        </div>
      </div>
    </div>
  );
}
