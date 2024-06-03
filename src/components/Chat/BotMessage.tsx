import classNames from "classnames";
import Avatar from "../Avatar/Avatar";
import { clipboardOutline, checkmarkOutline } from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { SyncLoader } from "react-spinners";
import useClipboard from "../../hooks/useClipboard";
import useBot from "../../hooks/useBot";
import { ChatMessageType } from "../../store/store";
import { motion } from "framer-motion";
import React, { useState } from 'react';
import { SourcesModal } from './SourcesModal';
import ReactMarkdown from "react-markdown";

import DocumentViewer from "../DocumentViewer/DocumentViewer";

const variants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

type Props = {
  index: number;
  chat: ChatMessageType;
};

export default function BotMessage({ index, chat, fetchDocumentContent, setShowDocument, showDocument }: { index: number, chat: ChatMessageType, fetchDocumentContent: Function, setShowDocument: Function, showDocument: boolean }) {
  const { copy, copied } = useClipboard();
  const [showSources, setShowSources] = useState(false);

  const [documentContent, setDocumentContent] = useState('');

  const { result, error, isStreamCompleted, cursorRef, sources } = useBot({
    index,
    chat,
  });

  return (
    <div
      className={classNames("py-4 bg-gray-100 dark:bg-[#202224] px-2 md:px-0")}
    >
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl mx-auto md:flex md:items-center group"
      >
        <div className="flex items-start w-full">
          <div className="mr-4 rounded-md flex items-center flex-shrink-0">
            <Avatar className="h-11 w-11" src="/imgs/bot.webp" />
          </div>
          {!result && !error ? (
            <div className="self-center">
              <SyncLoader color="gray" size={8} speedMultiplier={0.5} />
            </div>
          ) : (
            <pre
              className={classNames(
                "text-gray-300 animate-preulse overflow-x-hidden whitespace-pre-wrap",
                { "text-red-500": error }
              )}
            >
<ReactMarkdown
  className="text-gray-300 animate-preulse overflow-x-hidden whitespace-pre-wrap"
  children={result.replace(/(\n\s*){3,}/g, '\n\n')}
/>
              {!isStreamCompleted && !chat.content && (
                <div
                  className="ml-1 blink bg-gray-500 bg-gray-200 h-4 w-1 inline-block"
                  ref={cursorRef}
                ></div>
              )}
            </pre>
          )}
        </div>
        <div className="mt-2 md:mt-0 text-right self-start">
          {!copied ? (
            <button
              className="edit md:ml-8 text-gray-500 text-gray-200 text-xl"
              onClick={() => copy(result)}
            >
              <IonIcon icon={clipboardOutline} />
            </button>
          ) : (
            <span className="text-gray-200 text-gray-500 text-xl">
              <IonIcon icon={checkmarkOutline} />
            </span>
          )}
          {result && sources && sources.length > 0 && (
            <button
  style={{
    backgroundColor: "#c69354", // Same background color as "Ver Documento"
    color: "#1a1a1a", // Same text color as "Ver Documento"
    borderRadius: "5px", // Matching border radius
    border: "none", // No border
    padding: "10px 20px", // Same padding
    cursor: "pointer", // Pointer cursor
    textDecoration: "none", // Remove text decoration
    transition: "background-color 0.3s ease", // Smooth transition
    fontWeight: "bold", // Thicker text
    fontFamily: "Arial, sans-serif" // Font family that supports bold
  }}
  onClick={() => setShowSources(true)}
>
  Referencias
</button>



          )}
          {showSources && (
            <SourcesModal
              sources={sources}
              onClose={() => setShowSources(false)}
              fetchDocumentContent={fetchDocumentContent as (docId: any) => void}
              setShowDocument={setShowDocument as (show: boolean) => void}
            />
          )}
          {showDocument && (
            <DocumentViewer content={documentContent} onClose={() => setShowDocument(false)} />
          )}
        </div>
      </motion.div>
    </div>
  );
}
