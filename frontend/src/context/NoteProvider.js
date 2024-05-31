import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const noteContext = createContext();

const NoteProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [fetchAgain,setFetchAgain] = useState(true)
  const [notifications,setNotifications] = useState([])
  const [page,setPage] = useState("tasks");
  const [darkMode,setDarkMode] = useState(false)
  // const [selectedChat,setSelectedChat] = useState()
  // const [chats,setChats] =useState([])
  // const [notification,setNotification]=useState([])
  const history = useHistory();
  
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    setUser(userInfo);
    if (!userInfo) {
      history.push("/");
    }
  }, [history]);

  return <noteContext.Provider value={{ user, setUser, fetchAgain, setFetchAgain, notifications, setNotifications, page, setPage, darkMode, setDarkMode }}>{children}</noteContext.Provider>;
};

export const NoteState = () => {
  return useContext(noteContext);
};

export default NoteProvider; // corrected export name
