import { Metadata } from "next";
import ConversationClient from "./components/ConversationClient";

export const metadata: Metadata = {
  title: "Speak to Sahana | AI Voice Assistant for Inclusion & Social Impact",
  description:
    "Speak to Sahana — an AI voice assistant by Sahana L for conversations about inclusion, disability rights, and social impact strategies in India.",
  keywords: [
    "speak to sahana",
    "sahana l",
    "AI voice assistant",
    "inclusion assistant",
    "disability rights India",
    "social impact AI",
  ],
};

export default function SpeakToSahanaPage() {
  return (
    <div className="min-h-screen bg-[#fdfcf8] py-12">
      <ConversationClient />
    </div>
  );
}
