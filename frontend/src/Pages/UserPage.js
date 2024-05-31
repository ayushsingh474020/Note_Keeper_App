import React, { useEffect, useState } from 'react'
import {Container,Box,Text,Tabs, TabList, TabPanels, Tab, TabPanel, useToast} from "@chakra-ui/react"
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import TaskPage from '../Pages/TaskPage'
import NotePage from "../Pages/NotePage"
import { NoteState } from '../context/NoteProvider'
import axios from 'axios'
import SharedPage from './SharedPage'
import MyCalendar from '../components/Calendar'

const UserPage = () => {
  const history = useHistory()
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    // setUser(userInfo);
    if(!userInfo){
      history.push("/");
    }
  }, [history])

  const {user,setUser,fetchAgain,setFetchAgain,darkMode,setDarkMode,page,setPage} = NoteState();
  const [notes,setNotes] = useState([])
  const [tasks,setTasks] = useState([])
  

  const toast = useToast();

  const fetchNotes = async () => {
    setFetchAgain(false);
    try {
      const config = {
        headers:{
          Authorization:`Bearer ${user.token}`
        }
      }

      const {data} = await axios.get("/api/notes",config)
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

  const fetchTasks = async () => {
    setFetchAgain(false);
    try {
      const config = {
        headers:{
          Authorization:`Bearer ${user.token}`
        }
      }

      const {data} = await axios.get("/api/tasks",config)
      // console.log(data)
      await setTasks(data)
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
    fetchTasks()
    setFetchAgain(false)
    // console.log(notes)
  }, [fetchAgain])


  return (
    <div className='flex justify-center px-1 h-90vh'>
      {/* <Container className="font-montserrat mt-2.5"> */}
        <Box className="bg-white flex mt-2.5 w-3/4">
            <Tabs variant='soft-rounded' colorScheme={!darkMode?'yellow':"purple"} width="100%">
            <TabList >
              <Tab onClick={()=>setPage("notes")} >Notes</Tab>
              <Tab onClick={()=>setPage("tasks")} >Tasks</Tab>
              <Tab onClick={()=>setPage("notes")} >Shared</Tab>
            </TabList>
            <TabPanels className='h-full '>
              <TabPanel className="h-full">
                {/* login */}
                <NotePage notes={notes}/>
              </TabPanel>
              <TabPanel className="h-full">
                {/* signup */}
                <TaskPage tasks={tasks} />
              </TabPanel>
              <TabPanel className="h-full">
                {/* signup */}
                <SharedPage/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
        {/* <hr className='h-52 w-1 text-yellow-400' /> */}
        <Box className="w-1/4 flex flex-col items-center justify-center" style={{height:"100%"}}>
          <MyCalendar className="w-full"/>
          <div className={`h-1/5 w-full border-2 ${!darkMode?'border-yellow-400':'border-purple-500'} ${!darkMode?'bg-custom-yellow-1':'bg-custom-purple-2'} ${!darkMode?'text-black':'text-white'} rounded-xl flex justify-center items-center`}>
            <span className="text-6xl">"</span><span className='text-2xl'>Your present circumstances don’t determine where you can go; they merely determine where you start.</span><span className="text-6xl">"</span>
            {/* <span className="text-sm">~Nido Qubein</span> */}
          </div>
        </Box>
      {/* </Container> */}
    </div>
  )
}

export default UserPage
