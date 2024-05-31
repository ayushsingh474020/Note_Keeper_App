import { Box, Button, Container, Stack, Text, useToast } from '@chakra-ui/react'
import React,{useEffect, useState} from 'react'
import { NoteState } from '../context/NoteProvider';
import axios from "axios"
// import SideDrawer from '../components/SideDrawer';
import Note from "../components/Note"
import NoteModal from '../components/NoteModal';
import NewNoteModal from '../components/NewNoteModal';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const SharedPage = () => {

  const {user,setUser,fetchAgain,setFetchAgain,darkMode} = NoteState();
  const [notes,setNotes] = useState([])


  const toast = useToast();

  const history = useHistory()
    useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"))
      // setUser(userInfo);
      if(!userInfo){
        history.push("/");
      }
    }, [history])
    
  const fetchNotes = async () => {
    setFetchAgain(false);
    try {
      const config = {
        headers:{
          Authorization:`Bearer ${user.token}`
        }
      }

      const {data} = await axios.get("/api/notes/share",config)
      // console.log(data)
      await setNotes(data)
      // console.log(notes)
    } catch (error) {
      // toast({
      //   title: 'Error Occured',
      //   description:error.message,
      //   status: 'warning',
      //   duration: 5000,
      //   isClosable: true,
      //   position:"bottom"
      // })
      return;
    }
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchNotes()
    // console.log(notes)
  }, [fetchAgain])


  return (
    <div style={{width:"100%"}}>
      {/* {user && <SideDrawer/>} */}
      <Box
        width="100%"
        height="85vh"
        p="10px"
        fontFamily="Montserrat"
      >
        {notes.map((note)=>(
          <NoteModal>
            <Note
            // onClick={()=>showNote}
            cursor="pointer"
            px={3}
            py={2}
            borderRadius="lg"
            key={note._id}
            title={note.title}
            content={note.content}
            isShared={note.shared}
            sharedBy={note.sharedBy}
            />
          </NoteModal>  
      ))} 
      </Box>
    </div>
  )
}

export default SharedPage
