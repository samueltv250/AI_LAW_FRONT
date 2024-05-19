import { IonIcon } from "@ionic/react";
import Avatar from "../Avatar/Avatar";
import { createOutline, pencilOutline, checkmark } from "ionicons/icons";
import { useAuth } from "../../store/store";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import classNames from "classnames";

const varinats = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function ProfileTab({ visible }: { visible: boolean }) {
  const [avatar, name, email, setUser] = useAuth((state) => [
    state.user.avatar,
    state.user.name,
    state.user.email,
    state.setUser,
  ]);
  const [tokens, setTokens] = useState(localStorage.getItem("tokens") || "0");
  const [editName, setEditName] = useState(false);
  const [myname, setMyName] = useState(name);

  useEffect(() => {
    const handleStorageChange = () => {
      setTokens(localStorage.getItem("tokens") || "0");
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  function handlePicChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = () => {
        const base64String = reader.result;
        setUser({
          avatar: base64String as string,
          name,
          tokens: tokens,
          email,
        });
      };
    }
  }

  function handleUpdateName() {
    if (myname.trim().length === 0) return;
    setUser({
      avatar,
      name: myname,
      tokens: tokens,
      email: email,
    });
    setEditName(false);
  }

  return (
    <motion.div
      variants={varinats}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={classNames("p-2", { hidden: !visible })}
    >
<div className="profile-pic group flex items-center justify-center relative">
  <Avatar
    className="avatar h-20 w-20 ring-2 rounded-full object-cover ring-gray-300 p-1 dark:ring-gray-500"
    src={avatar}
  />
</div>

      <div className="my-4 ">
       
          <div className="flex items-center justify-center text-xl">
            <span className="mr-2 ">{myname}</span>
          </div>
          <div className="flex items-center justify-center text-xl">
            <span className="mr-2 ">{email}</span>
          </div>
          <div className="flex items-center justify-center text-xl">
          <span className="mr-2 ">Tokens: {parseFloat(JSON.parse(tokens))}</span>          </div>
    
      </div>
    </motion.div>
  );
}