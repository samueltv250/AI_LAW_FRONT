import React, { useState, useEffect } from 'react';
import { searchOutline, closeOutline } from "ionicons/icons";
import SearchBar from './components/SearchBar/SearchBar';
import DocumentViewer from './components/DocumentViewer/DocumentViewer';
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
    const response = await fetch('/validate', {
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

  const [searchResults, setSearchResults] = useState([]);
  const [documentContent, setDocumentContent] = useState('');
  const [showDocument, setShowDocument] = useState(false);

  const [selectedModel, setModel] = useSettings((state) => [
    state.settings.selectedModal,
    state.setModal,
  ]);
  const isGptDraftSelected = selectedModel.startsWith("gpt-d");





  const fetchSearchResults = async (query: any, filters: any, mode: string) => {
    try {
      const response = await fetch('/get_hits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          query: query,
          filters: filters,
          mode: mode,  // Include the mode in the request body
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  const [searchActive, setSearchActive] = useState(false);

  const handleSearchIconClick = () => {
    setSearchActive(!searchActive);
  };
  const renderSearchResults = () => {
    return (
      <ul className="absolute top-full left-0 right-0 z-10 mt-1 p-2 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto">
        {searchResults.map((result: { doc_id: React.Key; doc_title: string; }) => (
          <li
            key={result.doc_id}
            onClick={() => fetchDocumentContent(result.doc_id)}
            className="p-2 cursor-pointer hover:bg-gray-100"
          >
            {result.doc_title}
          </li>
        ))}
      </ul>
    );
  };
  const fetchDocumentContent = async (docId: any) => {
    try {

      const response = await fetch('/get_document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          docId: docId,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.text();
      setDocumentContent(data);
      setShowDocument(true);
    } catch (error) {
      console.error('Error fetching document content:', error);
    }
  };

  const [avatar, name, setUser] = useAuth((state) => [
    state.user.avatar,
    state.user.name,
    state.setUser,
  ]);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Send a request to the server to validate the token
      validateToken(token) // Assuming this function returns a promise with the response
      .then(response => {
        // Ensure that this block can handle the 'await' operator
        return response.json(); // Parse JSON response
      })
      .then(data => {
        // Assuming 'data' contains the tokens and other user information
        localStorage.setItem('tokens', JSON.stringify(data.tokens));
        setIsLoggedIn(true);
  
        // Update user state with the new information
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
        console.error('Token validation error:', error);
      });
    }
  
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  const renderPage = () => {
    if (showDocument) {
      return <DocumentViewer content={documentContent} onClose={() => setShowDocument(false)} />;
    }
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
        <main className={classNames("w-full transition-all duration-500", {"md:ml-[260px]": active})}>
          <div className="">

          {!searchActive && (

            <button
              type="button"
              className="shadow fixed p-2 h-8 w-8 text-sm top-4 left-4 border-2 hidden md:inline-flex dark:text-white text-gray-700 dark:border border-gray-400 rounded-md items-center justify-center"
              onClick={() => setActive(!active)}
            >
              <i className="fa-regular fa-window-maximize rotate-90"></i>
            </button>)}



          </div>
          {isChatsVisible ? <Header /> : <GptIntro />}
          {isChatsVisible &&      <Chats 
  fetchDocumentContent={fetchDocumentContent} 
  showDocument={showDocument} 
  setShowDocument={setShowDocument}
  documentContent={documentContent} 
/>
}
          <div
            className={classNames(
              "fixed left-0 px-2 right-0 transition-all duration-500 bottom-0 dark:shadow-lg py-1 shadow-md backdrop-blur-sm bg-white/10 dark:bg-dark-primary/10",
              {
                "dark:bg-dark-primary bg-white": isChatsVisible,
                "md:ml-[260px]": active,
              }
            )}
          >
            <div className="max-w-2xl md:max-w-[calc(100% - 260px)] mx-auto">
              {!isChatsVisible && !isGptDraftSelected && !searchActive&&(
                <>
                  <DefaultIdeas />
                </>
              )}
  
              <div className="dark:bg-inherit">
                {/* Search bar will be shown here when search is active */}
                {searchActive && (
                <>
                  <SearchBar
                    onSearch={fetchSearchResults}
                    results={searchResults}
                    onResultClick={fetchDocumentContent}
                  />
                  {renderSearchResults()}
                </>
                )}
                {/* UserQuery is rendered here, you can adjust if it should be hidden/shown based on searchActive */}
                {!searchActive && <UserQuery />}
              </div>
            </div>
          </div>
        </main>
      ) }
    
  };

  return (
    <div className="App font-montserrat md:flex">
              {!isChatsVisible && isLoggedIn && (
    <IonIcon
    icon={searchActive ? closeOutline : searchOutline}
    onClick={() =>{
      setSearchActive(!searchActive);
      setActive(false);
    }}
    className="fixed top-4 right-4 z-10 text-lg cursor-pointer text-gray-700 dark:text-white"
  />
                )}
    

    {!searchActive && (
      <Navbar active={active} setActive={setActive} />)}
      {renderPage()}
    </div>
  );
}

export default App;