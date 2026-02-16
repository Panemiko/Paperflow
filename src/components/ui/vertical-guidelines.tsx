"use client";

export function VerticalGuidelines() {
  return (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden hidden xl:block h-full">
      <div className="max-w-7xl mx-auto h-full relative px-6 lg:px-12">
        {/* Left line */}
        <div className="absolute left-0 lg:left-0 top-0 bottom-0 w-px bg-[#777777]/15" />
        {/* Right line */}
        <div className="absolute right-0 lg:right-0 top-0 bottom-0 w-px bg-[#777777]/15" />

        {/* 
            LEFT COLUMN MARKERS 
        */}

        {/* 5% - Start */}
        <div className="absolute left-[-2px] top-[5%] flex flex-col gap-2 items-end -translate-x-full pr-4 opacity-[0.2] hover:opacity-80 transition-opacity duration-500 pointer-events-auto cursor-default">
          <div className="[writing-mode:vertical-rl] rotate-180 font-mono text-[9px] tracking-[0.3em] uppercase whitespace-nowrap">
            Paperflow Protocol v1.0.4
          </div>
          <div className="w-px h-12 bg-[#777777]/30 mr-px" />
        </div>

        {/* 25% - Chat (Diff) */}
        <div className="absolute left-[-2px] top-[25%] flex flex-col gap-4 items-end -translate-x-full pr-4 opacity-[0.15] hover:opacity-80 transition-opacity duration-500 pointer-events-auto cursor-default">
          <div className="font-mono text-[9px] tracking-widest uppercase text-right">
            Diff: +420 / -12
            <br />
            <span className="opacity-60">Status: Reviewed</span>
          </div>
          <div className="w-8 h-px bg-[#777777]/30" />
        </div>

        {/* 45% - Philosophy (Merge) */}
        <div className="absolute left-[-2px] top-[45%] flex flex-col gap-4 items-end -translate-x-full pr-4 opacity-[0.15] hover:opacity-80 transition-opacity duration-500 pointer-events-auto cursor-default">
          <div className="w-px h-16 bg-linear-to-b from-transparent via-[#777777]/30 to-transparent mr-px" />
          <div className="font-mono text-[9px] tracking-widest uppercase text-right opacity-60 text-primary">
            Merge: origin/philosophy
          </div>
        </div>

        {/* 65% - Refuse (Integrity) */}
        <div className="absolute left-[-2px] top-[65%] flex flex-col gap-4 items-end -translate-x-full pr-4 opacity-[0.15] hover:opacity-80 transition-opacity duration-500 pointer-events-auto cursor-default">
          <div className="w-4 h-px bg-[#777777]/30" />
          <div className="font-mono text-[9px] tracking-widest uppercase text-right">
            Absence_Integrity: OK
          </div>
        </div>

        {/* 85% - FAQ (EOF) */}
        <div className="absolute left-[-2px] top-[85%] flex flex-col gap-4 items-end -translate-x-full pr-4 opacity-[0.2] hover:opacity-80 transition-opacity duration-500 pointer-events-auto cursor-default">
          <div className="font-mono text-[9px] tracking-widest uppercase text-right">
            EOF: 124,042 bytes
          </div>
          <div className="w-4 h-px bg-[#777777]/30" />
        </div>

        {/* 
            RIGHT COLUMN MARKERS 
        */}

        {/* 15% - Mechanism (Commit) */}
        <div className="absolute right-[-2px] top-[15%] flex flex-col gap-4 items-start translate-x-full pl-4 opacity-[0.15] hover:opacity-80 transition-opacity duration-500 pointer-events-auto cursor-default">
          <div className="font-mono text-[9px] tracking-widest uppercase">
            Commit: 7f3a2b
            <br />
            <span className="opacity-60">feat: core_mechanic</span>
          </div>
          <div className="w-4 h-px bg-[#777777]/30" />
        </div>

        {/* 35% - Result (History) */}
        <div className="absolute right-[-2px] top-[35%] flex flex-col gap-4 items-start translate-x-full pl-4 opacity-[0.15] hover:opacity-80 transition-opacity duration-500 pointer-events-auto cursor-default">
          <div className="[writing-mode:vertical-rl] font-mono text-[9px] tracking-[0.2em] uppercase whitespace-nowrap opacity-60">
            git verify-signature
          </div>
          <div className="w-px h-12 bg-[#777777]/30 ml-px" />
        </div>

        {/* 55% - Public (Role) */}
        <div className="absolute right-[-2px] top-[55%] flex flex-col gap-4 items-start translate-x-full pl-4 opacity-[0.15] hover:opacity-80 transition-opacity duration-500 pointer-events-auto cursor-default">
          <div className="w-px h-8 bg-[#777777]/30 ml-px" />
          <span className="font-mono text-[9px] tracking-widest uppercase opacity-60 text-primary">
            Role: Editor / Public
          </span>
        </div>

        {/* 75% - Ethics (Auth) */}
        <div className="absolute right-[-2px] top-[75%] flex flex-col gap-4 items-start translate-x-full pl-4 opacity-[0.15] hover:opacity-80 transition-opacity duration-500 pointer-events-auto cursor-default">
          <div className="[writing-mode:vertical-rl] font-mono text-[8px] tracking-[0.4em] uppercase whitespace-nowrap">
            Human_Authorship_Verified
          </div>
          <div className="w-px h-24 bg-[#777777]/30 ml-px" />
        </div>

        {/* 95% - Final (Encryption) */}
        <div className="absolute right-[-2px] top-[95%] flex flex-col gap-4 items-start translate-x-full pl-4 opacity-[0.15] hover:opacity-80 transition-opacity duration-500 pointer-events-auto cursor-default">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500/50" />
            <span className="font-mono text-[9px] tracking-widest uppercase">
              AES-256 Encrypted
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
