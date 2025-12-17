"use client";

import { useConversation } from "@elevenlabs/react";
import { useCallback, useState } from "react";
import { Mic, MicOff, Wifi, Power } from "lucide-react";

type LogItem = { role: "user" | "agent" | "system"; text: string };

export default function ConversationClient() {
  const [log, setLog] = useState<LogItem[]>([]);
  const [isStarted, setIsStarted] = useState(false);

  const conversation = useConversation({
    onConnect: () => setLog((l) => [...l, { role: "system", text: "Connected to Sahana" }]),
    onDisconnect: () => {
      setLog((l) => [...l, { role: "system", text: "Disconnected" }]);
      setIsStarted(false);
    },
    onMessage: (msg) => {
      const role =
        (msg as any)?.source === "user" ? "user" :
        (msg as any)?.source === "agent" ? "agent" : "system";

      const text =
        (msg as any)?.message ??
        (msg as any)?.text ??
        JSON.stringify(msg);

      if (text) {
        setLog((l) => [...l, { role, text }]);
      }
    },
    onError: (err) =>
      setLog((l) => [
        ...l,
        { role: "system", text: `Error: ${String((err as any)?.message ?? err)}` },
      ]),
  });

  const start = useCallback(async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // In a real production app, you would fetch a signed URL here.
      // For this implementation as per instructions, we use the public agent ID or similar mechanism.
      // However, the instructions say "Option A: Public agent" OR "Option B: Signed URL".
      // The user asked to add keys to .env, implying they might want Option B, but the user prompt also said "Option A (simplest): Public agent".
      // The user provided prompt says "If your agent is public, you can start a session directly with agentId."
      // BUT later says "add in my .env keys...". This suggests using the secure method if possible, or maybe just the ID.
      // I will assume for now we use the signed URL pattern if the keys are meant to be used securely, 
      // OR just the agent ID if it is public. 
      // Given the user said "add in my .env keys", I will implement the client to fetch from an API route 
      // effectively implementing Option B (Signed URL) which is more robust.
      // I will implement the API route as well.
      
      const res = await fetch("/api/get-signed-url");
      if (!res.ok) {
         // Fallback to direct connection if API fails or is not set up, 
         // though strictly we should follow one path. 
         // Let's assume the API route will be there.
         throw new Error("Failed to get signed URL");
      }
      const { signedUrl } = await res.json();
      
      await conversation.startSession({
        signedUrl,
      });
      setIsStarted(true);

    } catch (error) {
      console.error(error);
      setLog((l) => [...l, { role: "system", text: "Failed to start conversation. Ensure microphone access is granted and API keys are set." }]);
    }
  }, [conversation]);

  const stop = useCallback(async () => {
    await conversation.endSession();
    setIsStarted(false);
  }, [conversation]);

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-12 font-sans text-stone-900">
      
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-heading font-medium text-stone-900 mb-6">
          Speak to <span className="text-emerald-800">Sahana</span>
        </h1>
        <p className="text-lg md:text-xl text-stone-600 font-light max-w-2xl mx-auto leading-relaxed">
          An AI voice assistant powered by Sahana&apos;s insights. Ask about her work, strategies for inclusion, or just say hello.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center justify-center gap-8 mb-12">
        <div className="relative">
          <div className={`absolute inset-0 rounded-full blur-xl transition-opacity duration-500 ${conversation.status === 'connected' ? 'bg-emerald-500/20 opacity-100' : 'opacity-0'}`}></div>
          <button
            onClick={isStarted ? stop : start}
            disabled={conversation.status === 'connecting'}
            className={`
              relative z-10 w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg border-2
              ${isStarted 
                ? 'bg-emerald-900 border-emerald-800 text-white hover:bg-emerald-800 scale-100' 
                : 'bg-stone-50 border-stone-200 text-stone-800 hover:border-emerald-800 hover:text-emerald-800'
              }
              ${conversation.status === 'connecting' ? 'animate-pulse opacity-80 cursor-not-allowed' : ''}
            `}
          >
             {isStarted ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
          </button>
        </div>
        
        <div className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-stone-400">
          <div className="flex items-center gap-2">
            {conversation.status === 'connected' ? (
               <Wifi className="w-4 h-4 text-emerald-600" />
            ) : (
               <Power className="w-4 h-4" />
            )}
            <span>
              {conversation.status === 'connected' 
                ? (conversation.isSpeaking ? 'Sahana is Speaking' : 'Listening...') 
                : (conversation.status === 'connecting' ? 'Connecting...' : 'Ready to Start')}
            </span>
          </div>
        </div>
      </div>

      {/* Logs */}
      <div className="border border-stone-200 bg-stone-50 rounded-sm p-6 md:p-8 min-h-[300px] max-h-[500px] overflow-y-auto custom-scrollbar shadow-sm">
        {log.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-stone-400 opacity-60">
            <Mic className="w-12 h-12 mb-4" />
            <p className="font-heading italic text-lg">&quot;Click the mic to start the conversation...&quot;</p>
          </div>
        ) : (
          <div className="space-y-6">
            {log.map((item, idx) => (
              <div key={idx} className={`flex ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`
                    max-w-[80%] p-4 rounded-lg text-sm leading-relaxed
                    ${item.role === 'user' 
                      ? 'bg-stone-200 text-stone-800 rounded-br-none' 
                      : item.role === 'agent'
                        ? 'bg-emerald-900 text-white rounded-bl-none shadow-md'
                        : 'bg-transparent text-stone-400 w-full text-center text-xs uppercase tracking-widest italic'
                    }
                  `}
                >
                  {item.role !== 'system' && (
                     <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 opacity-70 ${item.role === 'user' ? 'text-stone-600' : 'text-emerald-200'}`}>
                        {item.role === 'user' ? 'You' : 'Sahana'}
                     </div>
                  )}
                  {item.text}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
