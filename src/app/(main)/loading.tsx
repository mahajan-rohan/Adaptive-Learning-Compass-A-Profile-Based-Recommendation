import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-full min-w-full">
      {/* <Loader2 className="w-20 h-20 text-primary animate-spin mx-auto" /> */}
      <div className="w-30 h-30 bg-gray-900/10  rounded-xl p-8 flex items-center justify-center">
        <div className="relative">
          <div className="w-48 h-48 flex flex-wrap gap-2">
            {[...Array(16)].map((_, index) => (
              <div
                key={index}
                className="w-10 h-10 bg-neutral-200/30 rounded-lg animate-[loadBlock_2s_ease-in-out_infinite] opacity-0"
                style={{
                  animationDelay: `${index * 0.2}s`,
                }}
              />
            ))}
          </div>
        </div>
        <style>{`
        @keyframes loadBlock {
            0% { opacity: 0; transform: scale(0.5); }
            50% { opacity: 1; transform: scale(1); }
            100% { opacity: 0; transform: scale(0.5); }
        }
        @keyframes counter {
            from { content: "0"; }
            to { content: "100"; }
        }
    `}</style>
      </div>
    </div>
  );
}
