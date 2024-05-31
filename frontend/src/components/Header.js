import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Text, Tooltip, useDisclosure, useToast } from "@chakra-ui/react";
import React, { useState } from "react";
import { NoteState } from "../context/NoteProvider";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import Note from "./Note";
import axios from "axios"
import NoteLoading from "./NoteLoading"
import NoteModal from "./NoteModal"
import TaskModal from "./TaskModal";
import NotifModal from "./NotifModal";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import Task from "./Task";
import ProfileModal from "./ProfileModal";

function Header() {
  const {user,notifications,setNotifications,page,setPage,darkMode,setDarkMode} = NoteState();

  const history = useHistory();
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [search,setSearch] = useState();
  const [loadingNotes,setLoadingNotes] = useState(false)
  const [searchNoteResult,setSearchNoteResult] = useState([])
  const [loadingTasks,setLoadingTasks] = useState(false)
  const [searchTaskResult,setSearchTaskResult] = useState([])
  // const [notification,setNotification] = useState([])
  // const [loading,setLoading]

  const handleDrawerOpen = async () => {
    try {
      setSearchNoteResult([])
      setSearchTaskResult([])
      setSearch("")
      onOpen()
      return
    } catch (error) {
      toast({
        title: 'Error Occured',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position:"bottom-left"
      })
      return;
    }
  }

  const handleSearchNotes = async () => {
    if(!search){
      toast({
        title: 'Please enter something',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position:"bottom-left"
      })
      return;
    }

    try {
      setLoadingNotes(true)

      const config = {
        headers:{
          Authorization:`Bearer ${user.token}`
        }
      }
      const {data} = await axios.get(`/api/notes/search?search=${search}`,config)
      console.log(data)
      setLoadingNotes(false)
      setSearchNoteResult(data)
    } catch (error) {
      // toast({
      //   title: 'Error Occured',
      //   status: 'warning',
      //   duration: 5000,
      //   isClosable: true,
      //   position:"bottom-left"
      // })
      return;
    }
  }

  const handleSearchTasks = async () => {
    if(!search){
      toast({
        title: 'Please enter something',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position:"bottom-left"
      })
      return;
    }

    try {
      setLoadingTasks(true)

      const config = {
        headers:{
          Authorization:`Bearer ${user.token}`
        }
      }
      const {data} = await axios.get(`/api/tasks/search?search=${search}`,config)
      console.log(data)
      setLoadingTasks(false)
      setSearchTaskResult(data)
    } catch (error) {
      // toast({
      //   title: 'Error Occured',
      //   status: 'warning',
      //   duration: 5000,
      //   isClosable: true,
      //   position:"bottom-left"
      // })
      return;
    }
  }

  let headerColor = darkMode?"#1a202c":"#f5ba13"

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/")
    // console.log(localStorage.getItem("userInfo")===null)
  }  
  return (
    <div className="header" style={{backgroundColor:headerColor}}>
      {user && <Tooltip
          label="Search"
          hasArrow
          placement='bottom-end'
          fontFamily="Montserrat"
        >
          <Button variant="ghost" onClick={handleDrawerOpen} colorScheme="blackAlpha">
          <i class="fas fa-search"></i>
          <Text display={{base:"none",md:"flex"}} px="4" fontFamily="Montserrat" color="white">Search ↵</Text>
          </Button>
        </Tooltip>}
      <h1>Keeper</h1>
      { user && <div>
        {!darkMode ? <MoonIcon color="black" mr="5px" fontSize="2xl" onClick={()=>setDarkMode(true)}/> : <SunIcon mr="5px" color="white" fontSize="2xl" onClick={()=>setDarkMode(false)}/>}
        <Menu>
            <MenuButton p={1} mr="5px">
            {console.log(notifications)}
              {notifications.length ? (
                !darkMode?<BellIcon fontSize="2xl" m={1} color="black"/>:<BellIcon fontSize="2xl" m={1} color="white"/>
              ) : (
                <></>
              )}
              
            </MenuButton>
            <MenuList pl={2}>
              {!notifications.length && "No New Notification"}
              {notifications.map((notif) => (
                <NotifModal>
                <MenuItem
                  key={notif._id}
                >
                 {notif.title} missing deadline
                </MenuItem>
                </NotifModal>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
              <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic}/>
            </MenuButton>
            <MenuList>
              <ProfileModal>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              
              <MenuDivider/>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>}
        <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
        >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px" bg={darkMode?"#1a202c":"#f5ba13"} color="white">{page==="notes"?<span>Search Notes</span>:<span>Search Tasks</span>}</DrawerHeader>
          <DrawerBody>
            <Box display="flex" marginBottom="10px">
              <Input placeholder='Search by title or content' mr={2} value={search} onChange={(e)=> {setSearch(e.target.value)}} />
              <Button onClick={page==="notes" ? handleSearchNotes : handleSearchTasks}>Go</Button>
            </Box>
            {(page==="notes" && loadingNotes) ? (<NoteLoading/>) : (searchNoteResult.map((note)=>(
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
                // dueDate={page==="notes"? 0 :note.dueDate}
              />
              </NoteModal>
            )))}
            {(page==="tasks" && loadingTasks) ? (<NoteLoading/>) : (searchTaskResult.map((task)=>(
              <TaskModal>
              <Task
                // onClick={()=>showNote}
                cursor="pointer"
                px={3}
                py={2}
                borderRadius="lg"
                key={task._id}
                title={task.title}
                content={task.content}
                dueDate={task.dueDate}
              />
              </TaskModal>
            )))}
            {/* {loadingNotes && <Spinner display="flex" ml="auto" />} */}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default Header;