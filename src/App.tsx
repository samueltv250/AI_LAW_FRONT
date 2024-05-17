import React, { useState, useEffect } from 'react';
import { searchOutline, closeOutline, returnUpBackOutline} from "ionicons/icons";
import SearchBar from './components/SearchBar/SearchBar';
import DocumentViewer from './components/DocumentViewer/DocumentViewer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import DefaultIdeas from "./components/DefaultIdea/DefaultIdeas";
import UserQuery from "./components/UserInput/UserQuery";
import GptIntro from "./components/Ui/GptIntro";
import { IonIcon, IonSpinner, setupIonicReact } from "@ionic/react";
import { menuOutline, addOutline } from "ionicons/icons";
import Header from "./components/Header/Header";
import HeaderSearch from "./components/Header/HeaderSearch";
import useChat, { chatsLength, useAuth, useTheme } from "./store/store";
import classNames from "classnames";
import Chats from "./components/Chat/Chats";
import Modal from "./components/modals/Modal";
import Apikey from "./components/modals/Apikey";
import Login from "./Login"; // Import Login
import Register from "./Register"; // Import Register
import { useSettings } from "./store/store";
import LandingPage from './LandingPage'; // Import the LandingPage component

import './App.css'; // Adjust the path based on your file structure

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
  const [currentScreen, setCurrentScreen] = useState("landingPage"); // Add this state
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const [searchResults, setSearchResults] = useState([]);
  const [documentContent, setDocumentContent] = useState('');
  const [showDocument, setShowDocument] = useState(false);
  const [isLoadingDocument, setIsLoadingDocument] = useState(false); // New loading state

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
        const errorData = await response.json(); // Assuming the error message is in JSON format
        window.alert(`Document search failed: ${errorData.message || 'Unknown error'}`); // Show the error message or a default one
  
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setSearchResults([]); 
      // Set new results
      const newSearchResults = [...data]; // Use the spread operator to create a new array

      setSearchResults(newSearchResults as never[]); 
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  const [searchActive, setSearchActive] = useState(false);

  const handleSearchIconClick = () => {
    setSearchActive(!searchActive);
  };
  useEffect(() => {
    if (searchResults.length > 0) { // Only render if there are results
      renderSearchResults();
    }
  }, [searchResults]); // Re-render when searchResults changes

  const renderSearchResults = () => {
    return (
<ul
  className="absolute top-full left-0 right-0 z-10 mt-1 p-2 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto text-black">
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
    setIsLoadingDocument(true); // Start loading

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
        const errorData = await response.json(); // Assuming the error message is in JSON format
        window.alert(`Document fetch failed: ${errorData.message || 'Unknown error'}`); // Show the error message or a default one
  
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.text();
      setDocumentContent(data);
      setShowDocument(true);
      setIsLoadingDocument(false); // Stop loading

    } catch (error) {
      console.error('Error fetching document content:', error);

      setIsLoadingDocument(false); // Stop loading
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
      switch(currentScreen) {
        case "login":
          return <Login onLogin={() => setIsLoggedIn(true)} onRegister={() => setCurrentScreen("register")} />;
        case "register":
          return <Register onLogin={() => setCurrentScreen("login")} onRegister={function (): void {
            throw new Error('Function not implemented.');
          } } />;
        case "landingPage":
        default:
          return <LandingPage onLoginClick={() => setCurrentScreen("login")} onRegisterClick={() => setCurrentScreen("register")} />;
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


          {searchActive && <HeaderSearch /> }
          {!searchActive && isChatsVisible && <Header />}
          {!searchActive && !isChatsVisible &&  <GptIntro />}
    
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
                {!isLoadingDocument &&searchActive && (
                <>
                  <SearchBar
                    onSearch={fetchSearchResults}
                    results={searchResults}
                    onResultClick={fetchDocumentContent}
                    setResults = {setSearchResults}
                  />
                  {renderSearchResults()}
                </>
                )}
                 {isLoadingDocument &&searchActive && (
                <>
   <div style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',  // Adjust the height as needed to center vertically in the available space
  width: '100%',
  overflow: 'hidden'
}}>
  <div style={{
    width: '50px',
    height: '50px',
    backgroundColor: '#00ff00',  // A bright color for the circle
    borderRadius: '50%',
    animation: 'pulsate 1.5s ease-out infinite'
  }} />
</div>


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
    icon={searchActive ? returnUpBackOutline : searchOutline}
    onClick={() =>{
      setSearchActive(!searchActive);
      setActive(false);
    }}
    className={classNames(
      "shadow fixed p-2 h-8 w-8 text-sm top-4 right-4 border-2 hidden md:inline-flex dark:text-white text-gray-700 dark:border border-gray-400 rounded-md items-center justify-center",
      {
        "text-3xl dark:text-white ": searchActive,
        "text-3xl text-gray-700 dark:text-white": !searchActive
      }
    )}
  />
                )}
    

    {!searchActive && (
      <Navbar active={active} setActive={setActive} />)}
      {renderPage()}
    </div>
  );
}

export default App;