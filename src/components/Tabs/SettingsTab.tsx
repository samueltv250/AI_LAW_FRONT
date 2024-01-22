import { IonIcon } from "@ionic/react";
import { checkmarkOutline, createOutline } from "ionicons/icons";
import useChat, { useAuth, useSettings, useTheme } from "../../store/store";
import { motion } from "framer-motion";
import { useState } from "react";
import Modal from "../modals/Modal";
import ConfirmDelete from "../ConfirmDelete/ConfirmDelete";
import classNames from "classnames";
import { handleExportChats, handleImportChats } from "../../utils/importexport";

const varinats = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function SettingsTab({ visible }: { visible: boolean }) {
  const [
    sendChatHistory,
    setSendChatHistory,
    setModal,
    selectedModal,
    modalsList,
  ] = useSettings((state) => [
    state.settings.sendChatHistory,
    state.setSendChatHistory,
    state.setModal,
    state.settings.selectedModal,
    state.modalsList,
  ]);

  const [theme, setTheme] = useTheme((state) => [state.theme, state.setTheme]);

  const clearAllChats = useChat((state) => state.clearAllChats);
  const [apikey, setApiKey] = useAuth((state) => [
    state.apikey,
    state.setApiKey,
  ]);
  const [newApiKey, setNewApiKey] = useState(apikey);
  const [editApiKey, setEditApiKey] = useState(false);
  const [confirmDeleteChats, setConfirmDeleteChats] = useState(false);
  const [importExportStatus, setImportExportStatus] = useState({
    importing: false,
    exporting: false,
  });

  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSendChatHistory(e.target.checked);
  }

  function handleModalChange(value: string) {
    setModal(value);
  }

  function handleSetNewApiKey() {
    if (newApiKey.trim().length === 0) return;
    setApiKey(newApiKey);
    setEditApiKey(false);
  }


  function exportChats() {
    setImportExportStatus({ importing: false, exporting: true });
    handleExportChats()
      .then(() => alert("Chats exported successfully"))
      .catch((err) => alert(err))
      .finally(() =>
        setImportExportStatus({ importing: false, exporting: false })
      );
  }
  const groupedModels = modalsList.reduce(
    (obj: Record<string, string[]>, modal) => {
      const prefix = modal.split("-")[0] + "-" + modal.split("-")[1];
      return {
        ...obj,
        [prefix]: [...(obj[prefix] || []), modal],
      };
    },
    {}
  );

  return (
    <motion.div
      variants={varinats}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={classNames("settings", { hidden: !visible })}
    >
      <div className="p-2">
        <div className="flex items-center mb-4 justify-between border border-gray-200 rounded dark:border-gray-700 p-2">
          <label
            htmlFor="default-checkbox"
            className="ml-2  font-bold  dark:text-gray-300"
          >
            Dark mode
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              checked={theme === "dark"}
              onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div>
        <div className="flex items-center mb-4 justify-between border border-gray-200 rounded dark:border-gray-700 p-2">
          <span className="ml-2  font-bold  dark:text-gray-300">
            Clear all chats
          </span>
          <button
            type="button"
            className=" bg-red-700 text-white p-1 px-2 rounded"
            onClick={() => setConfirmDeleteChats(true)}
          >
            Clear
          </button>
        </div>

        {/* <div className="flex items-center mb-4 justify-between border border-gray-200 rounded dark:border-gray-700 p-2">
          <label
            htmlFor="default-checkbox"
            className="ml-2  font-bold  dark:text-gray-300"
          >
            Send chat history
          </label>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              checked={sendChatHistory}
              className="sr-only peer"
              onChange={handleOnChange}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          </label>
        </div> */}
    
        

        {/* <div className="">
          <label
            htmlFor="countries"
            className="block mb-2  font-bold   dark:text-gray-300"
          >
            Select Model
          </label>
          <select
            id="countries"
            defaultValue={selectedModal}
            onChange={(e) => handleModalChange(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            {Object.keys(groupedModels).map((group) => (
              <optgroup
                label={group.toUpperCase()}
                key={group}
                disabled={group.startsWith("dall-e")}
              >
                {groupedModels[group].map((modal) => (
                  <option value={modal} key={modal}>
                    {modal}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div> */}
      </div>
      <Modal visible={confirmDeleteChats}>
        <ConfirmDelete
          onDelete={() => {
            clearAllChats();
            setConfirmDeleteChats(false);
          }}
          onCancel={() => setConfirmDeleteChats(false)}
        >
          <p className="text-gray-500 dark:text-gray-700">
            This will delete all your chats and messages. This action cannot be
            undone.
          </p>
        </ConfirmDelete>
      </Modal>
    </motion.div>
  );
}
