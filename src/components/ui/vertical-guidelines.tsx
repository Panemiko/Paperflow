"use client";

export function VerticalGuidelines() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <div className="max-w-7xl mx-auto h-full relative px-6 lg:px-12">
        {/* Left line */}
        <div className="absolute left-0 lg:left-0 top-0 bottom-0 w-px bg-border/25" />
        {/* Right line */}
        <div className="absolute right-0 lg:right-0 top-0 bottom-0 w-px bg-border/25" />
      </div>
    </div>
  );
}
