import { useState } from "react";
import SettingsTab from "../Tabs/SettingsTab";
import { motion } from "framer-motion";
import classNames from "classnames";
import { IonIcon } from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import { useSettings } from "../../store/store";
import ProfileTab from "../Tabs/ProfileTab";
import MembershipTab from "../Tabs/MembershipTab";
import EmpresaMembershipTab from "../Tabs/EmpresaMember";

const variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.8, transition: { duration: 0.15 } },
};

const tabs = ["perfil", "opciones", "membresia individual", "membresia empresarial"];

export default function Settings() {
  const [selectedTab, setSelectedTab] = useState("perfil");
  const setModalVisible = useSettings((state) => state.setModalVisible);

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="tabs font-bold rounded-md bg-[#202224] text-white mx-auto max-w-80vw max-h-80vh py-4 transition-all"
    >
      <div className="flex items-center justify-between px-2">
        <div className="">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab}
              className={classNames("mr-2 p-2 rounded-t-lg capitalize", {
                "bg-[#c69354] text-black font-bold border-2 border-b-0 border-[#c69354]":
                  selectedTab === tab,
                "text-white": selectedTab !== tab,
              })}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-2 ">
          <button
            className={classNames(" flex hover:text-red-300 text-xl")}
            onClick={() => setModalVisible(false)}
          >
            <IonIcon icon={closeOutline} />
          </button>
        </div>
      </div>
      <div className="w-full h-[1px] bg-[#c69354]"></div>
      <div className="text-white">
        <SettingsTab visible={selectedTab === "opciones"} />
        <ProfileTab visible={selectedTab === "perfil"} />
        <MembershipTab visible={selectedTab === "membresia individual"} />
        <EmpresaMembershipTab visible={selectedTab === "membresia empresarial"} />
      </div>
    </motion.div>
  );
}
