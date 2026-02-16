"use client";

export function VerticalGuidelines() {
  return (
    <div className="absolute inset-0 pointer-events-none z-30 overflow-hidden hidden xl:block h-full">
      <div className="max-w-7xl mx-auto h-full relative px-6 lg:px-12">
        {/* Left line */}
        <div className="absolute left-0 lg:left-0 top-0 bottom-0 w-px bg-[#777777]/15" />
        {/* Right line */}
        <div className="absolute right-0 lg:right-0 top-0 bottom-0 w-px bg-[#777777]/15" />

        {/* LEFT COLUMN MARKERS
         */}

        {/* 5% - Engine Version */}
        <div className="absolute left-[-2px] top-[5%] flex flex-col gap-2 items-end -translate-x-full pr-4 opacity-[0.2] hover:opacity-80 transition-opacity duration-500 pointer-events-auto cursor-default">
          <div className="[writing-mode:vertical-rl] rotate-180 font-mono text-[9px] tracking-[0.3em] uppercase whitespace-nowrap">
            Paperflow Core v0.9.2 (Beta)
          </div>
          <div className="w-px h-12 bg-[#777777]/30 mr-px" />
        </div>

        {/* 15% - Storage Mode (emphasizing Local/Offline) */}
        <div className="absolute left-[-2px] top-[15%] flex flex-col gap-3 items-end -translate-x-full pr-4 opacity-[0.15] hover:opacity-80 transition-opacity duration-500 pointer-events-auto cursor-default">
          <div className="w-4 h-px bg-[#777777]/30" />
          <div className="[writing-mode:vertical-rl] rotate-180 font-mono text-[8px] tracking-widest uppercase opacity-60">
            Storage: Encrypted
          </div>
        </div>

        {/* 30% - The Diff (Writing context) */}
        <div className="absolute left-[-2px] top-[30%] flex flex-col gap-4 items-end -translate-x-full pr-4 opacity-[0.15] hover:opacity-80 transition-opacity duration-500 pointer-events-auto cursor-default">
          <div className="font-mono text-[9px] tracking-widest uppercase text-right">
            Diff: +1,204 / -32 words
            <br />
            <span className="opacity-60">Context: ch3_draft_v2</span>
          </div>
          <div className="w-8 h-px bg-[#777777]/30" />
        </div>

        {/* 45% - Merge Status */}
        <div className="absolute left-[-2px] top-[45%] flex flex-col gap-4 items-end -translate-x-full pr-4 opacity-[0.15] hover:opacity-80 transition-opacity duration-500 pointer-events-auto cursor-default">
          <div className="w-px h-16 bg-linear-to-b from-transparent via-[#777777]/30 to-transparent mr-px" />
          <div className="font-mono text-[9px] tracking-widest uppercase text-right opacity-60 text-primary">
            Merge: experiment/alt-ending
          </div>
        </div>

        {/* 60% - Format */}
        <div className="absolute left-[-2px] top-[60%] flex flex-col gap-2 items-end -translate-x-full pr-4 opacity-[0.15] hover:opacity-80 transition-opacity duration-500 pointer-events-auto cursor-default">
          <div className="w-6 h-px bg-[#777777]/30" />
          <div className="[writing-mode:vertical-rl] rotate-180 font-mono text-[8px] tracking-[0.2em] uppercase opacity-60">
            Format: CommonMark / MD
          </div>
        </div>

        {/* 75% - Data Ownership */}
        <div className="absolute left-[-2px] top-[75%] flex flex-col gap-4 items-end -translate-x-full pr-4 opacity-[0.15] hover:opacity-80 transition-opacity duration-500 pointer-events-auto cursor-default">
          <div className="font-mono text-[9px] tracking-widest uppercase text-right">
            Export: .docx / .pdf / .md
          </div>
          <div className="w-4 h-px bg-[#777777]/30" />
        </div>

        {/* RIGHT COLUMN MARKERS
         */}

        {/* 10% - Snapshot ID */}
        <div className="absolute right-[-2px] top-[10%] flex flex-col gap-3 items-start translate-x-full pl-4 opacity-[0.15] hover:opacity-80 transition-opacity duration-500 pointer-events-auto cursor-default">
          <div className="w-px h-12 bg-[#777777]/30 ml-px" />
          <div className="[writing-mode:vertical-rl] font-mono text-[8px] tracking-[0.3em] uppercase opacity-60">
            Snapshot: #8a2f9c
          </div>
        </div>

        {/* 25% - Active Branch */}
        <div className="absolute right-[-2px] top-[25%] flex flex-col gap-4 items-start translate-x-full pl-4 opacity-[0.15] hover:opacity-80 transition-opacity duration-500 pointer-events-auto cursor-default">
          <div className="font-mono text-[9px] tracking-widest uppercase">
            Head: main
            <br />
            <span className="opacity-60">Status: Clean</span>
          </div>
          <div className="w-4 h-px bg-[#777777]/30" />
        </div>

        {/* 40% - Integrity Check */}
        <div className="absolute right-[-2px] top-[40%] flex flex-col gap-4 items-start translate-x-full pl-4 opacity-[0.15] hover:opacity-80 transition-opacity duration-500 pointer-events-auto cursor-default">
          <div className="[writing-mode:vertical-rl] font-mono text-[9px] tracking-[0.2em] uppercase whitespace-nowrap opacity-60">
            Integrity: Verified
          </div>
          <div className="w-px h-12 bg-[#777777]/30 ml-px" />
        </div>

        {/* 55% - AI Policy (Important) */}
        <div className="absolute right-[-2px] top-[55%] flex flex-col gap-4 items-start translate-x-full pl-4 opacity-[0.15] hover:opacity-80 transition-opacity duration-500 pointer-events-auto cursor-default">
          <div className="w-px h-8 bg-[#777777]/30 ml-px" />
          <span className="font-mono text-[9px] tracking-widest uppercase opacity-60 text-primary">
            Training: Disabled
          </span>
        </div>

        {/* 70% - Human Verification */}
        <div className="absolute right-[-2px] top-[70%] flex flex-col gap-3 items-start translate-x-full pl-4 opacity-[0.15] hover:opacity-80 transition-opacity duration-500 pointer-events-auto cursor-default">
          <div className="w-6 h-px bg-[#777777]/30" />
          <div className="[writing-mode:vertical-rl] font-mono text-[8px] tracking-[0.4em] uppercase opacity-40">
            Author: Human_Verified
          </div>
        </div>

        {/* 90% - Encryption Standard */}
        <div className="absolute right-[-2px] top-[90%] flex flex-col gap-4 items-start translate-x-full pl-4 opacity-[0.15] hover:opacity-80 transition-opacity duration-500 pointer-events-auto cursor-default">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
            <span className="font-mono text-[9px] tracking-widest uppercase">
              AES-256-GCM
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
