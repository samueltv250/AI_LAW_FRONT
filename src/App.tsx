import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import DefaultIdeas from "./components/DefaultIdea/DefaultIdeas";
import UserQuery from "./components/UserInput/UserQuery";
import GptIntro from "./components/Ui/GptIntro";
import { IonIcon, setupIonicReact } from "@ionic/react";
import { menuOutline, addOutline } from "ionicons/icons";
import Header from "./components/Header/Header";
import useChat, { chatsLength, useAuth, useTheme } from "./store/store";
import classNames from "classnames";
import Chats from "./components/Chat/Chats";
import Modal from "./components/modals/Modal";
import Apikey from "./components/modals/Apikey";
import Login from "./Login"; // Import Login
import Register from "./Register"; // Import Register
import { useSettings } from "./store/store";


const validateToken = async (token: string) => {
  try {
    const response = await fetch('http://127.0.0.1:5040/validate', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
  } catch (error) {
    console.error('There was a problem with the fetch operation: ', error);
    throw error;
  }
};

setupIonicReact();
function App() {
  const [active, setActive] = useState(false);
  const isChatsVisible = useChat(chatsLength);
  const addNewChat = useChat((state) => state.addNewChat);
  const userHasApiKey = useAuth((state) => state.apikey);
  const [theme] = useTheme((state) => [state.theme]);
  const [currentScreen, setCurrentScreen] = useState("login"); // Add this state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [selectedModel, setModel] = useSettings((state) => [
    state.settings.selectedModal,
    state.setModal,
  ]);
  const isGptDraftSelected = selectedModel.startsWith("gpt-d");

  const [avatar, name, setUser] = useAuth((state) => [
    state.user.avatar,
    state.user.name,
    state.setUser,
  ]);
  useEffect(() => {
    const token = localStorage.getItem('token');
  
    if (token) {
      // Send a request to the server to validate the token
      validateToken(token) // You need to implement this function
        .then(() => {
          setIsLoggedIn(true);

        }).then(() => {
          setUser({
            avatar,
            name: localStorage.getItem('full_name') || '',
            email: localStorage.getItem('email') || '',
            tokens: localStorage.getItem('tokens') || '',
          });
        })
        .catch(error => {
          // If the server responds with an error, the token is not valid
          setIsLoggedIn(false);
        });
    }
  
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  const renderPage = () => {

    if (!isLoggedIn) {
      if (currentScreen === "login") {
        return <Login onLogin={() => setIsLoggedIn(true)} onRegister={() => setCurrentScreen("register")} />;
      } else if (currentScreen === "register") {
        return <Register onLogin={() => setCurrentScreen("login")} onRegister={function (): void {
          throw new Error("Function not implemented.");
        } } />;
      }
    }
    else {
        return (
          
          <main
            className={classNames(" w-full transition-all duration-500", {
              "md:ml-[260px]": active,
            })}
          >
                  <div className="">
        <button
          type="button"
          className="shadow fixed p-2 h-8 w-8 text-sm top-4 left-4 border-2 hidden md:inline-flex dark:text-white text-gray-700 dark:border border-gray-400 rounded-md items-center justify-center"
          onClick={() => setActive(true)}
        >
          <i className="fa-regular fa-window-maximize rotate-90"></i>
        </button>
      </div>
            {isChatsVisible ? <Header /> : <GptIntro />}
            {isChatsVisible && <Chats />}
            <div
              className={classNames(
                "fixed left-0 px-2  right-0 transition-all duration-500 bottom-0 dark:shadow-lg py-1 shadow-md backdrop-blur-sm bg-white/10 dark:bg-dark-primary/10",
                {
                  "dark:bg-dark-primary bg-white": isChatsVisible,
                  "md:ml-[260px]": active,
                }
              )}
            >
              <div className="max-w-2xl md:max-w-[calc(100% - 260px)] mx-auto">
                {!isChatsVisible && !isGptDraftSelected && (
                  <>
                    <DefaultIdeas />
                  </>
                  
                )}

                <div className="dark:bg-inherit">
                  <UserQuery />
                </div>
              </div>
            </div>
          </main>
        );
                }
    
  };

  return (
    <div className="App  font-montserrat md:flex ">
      <Navbar active={active} setActive={setActive} />
      {renderPage()}

    </div>
  );
}

export default App;