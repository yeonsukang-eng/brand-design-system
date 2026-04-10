"use client";

import "./tooltip-preview.css";

function TooltipExample({ text, direction }: {
  text: string;
  direction: "right" | "left" | "bottom" | "top";
}) {
  const wrapperClass = direction === "bottom" || direction === "top"
    ? `ax-tooltip-wrapper ax-tooltip-${direction}`
    : "ax-tooltip-wrapper";

  return (
    <div className={wrapperClass}>
      {direction === "left" && <div className="ax-tooltip-arrow-left" />}
      {direction === "top" && <div className="ax-tooltip-arrow-top" />}
      <div className="ax-tooltip">
        <span className="ax-tooltip-text">{text}</span>
      </div>
      {direction === "right" && <div className="ax-tooltip-arrow-right" />}
      {direction === "bottom" && <div className="ax-tooltip-arrow-bottom" />}
    </div>
  );
}

export function TooltipPreview() {
  return (
    <div className="flex flex-col gap-6 mt-3 p-4 rounded-lg bg-zinc-50 dark:bg-zinc-800/50">
      {/* 방향별 Tooltip */}
      <div>
        <p className="text-[10px] font-medium text-zinc-400 uppercase mb-3">방향별 Tooltip</p>
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] text-zinc-400">Right</span>
            <TooltipExample text="클릭 한번으로 AI가 지식그래프에 저장해줘요" direction="right" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] text-zinc-400">Left</span>
            <TooltipExample text="툴팁 메시지" direction="left" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] text-zinc-400">Bottom</span>
            <TooltipExample text="툴팁 메시지" direction="bottom" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[10px] text-zinc-400">Top</span>
            <TooltipExample text="툴팁 메시지" direction="top" />
          </div>
        </div>
      </div>
    </div>
  );
}
