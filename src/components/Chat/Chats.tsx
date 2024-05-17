import useChat from "../../store/store";
import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";

type ChatsProps = {
  fetchDocumentContent: (docId: string) => void;
  setShowDocument: (show: boolean) => void;
  showDocument: boolean;
  documentContent: string;
};

export default function Chats({ 
  fetchDocumentContent, 
  showDocument, 
  setShowDocument, 
  documentContent 
}: ChatsProps) {
  const chats = useChat((state) => state.chats);

  return (
    <div className="text-gray-300 md:mt-10 w-full">
      {chats.map((chat, index) =>
        chat.role === "assistant" ? (
          <BotMessage 
            index={index} 
            key={chat.id} 
            chat={chat} 
            fetchDocumentContent={fetchDocumentContent} 
            setShowDocument={setShowDocument}
            showDocument= {showDocument}
          />
        ) : (
          <UserMessage chat={chat} chatIndex={index} key={chat.id} />
        )
      )}

      <div className="h-48 flex-shrink-0"></div>
    </div>
  );
}
