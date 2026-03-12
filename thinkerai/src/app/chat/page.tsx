import { CharacterSidebar } from "@/components/CharacterSidebar";
import { ChatArea } from "@/components/ChatArea";
import { SettingsPanel } from "@/components/SettingsPanel";

export default function ChatPage() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <CharacterSidebar />
      <ChatArea />
      <SettingsPanel />
    </div>
  );
}
