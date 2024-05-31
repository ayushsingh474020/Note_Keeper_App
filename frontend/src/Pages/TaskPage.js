import { Box, Button, Container, Stack, Text, useToast } from '@chakra-ui/react'
import React,{useEffect, useState} from 'react'
import { NoteState } from '../context/NoteProvider';
import axios from "axios"
// import SideDrawer from '../components/SideDrawer';
import Note from "../components/Note"
import NoteModal from '../components/NoteModal';
import NewNoteModal from '../components/NewNoteModal';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import Task from '../components/Task';
import TaskModal from '../components/TaskModal';
import NewTaskModal from '../components/NewTaskModal';

const TaskPage = () => {
  const {user,setUser,fetchAgain,setFetchAgain,notifications,setNotifications,darkMode,page,setPage} = NoteState();
  const [tasks,setTasks] = useState([])

  const toast = useToast();

  const history = useHistory()
    useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"))
      // setUser(userInfo);
      if(!userInfo){
        history.push("/");
      }
      // setPage("tasks")
    }, [history])

  const fetchTasks = async () => {
    setFetchAgain(false);
    try {
      const config = {
        headers:{
          Authorization:`Bearer ${user.token}`
        }
      }

      const {data} = await axios.get("/api/tasks",config)
      // console.log((data[0].dueDate))
      // console.log(data)
      await setTasks(data)
      const currentDate = new Date();
      let pastDueItems = [];

      for(let i=0 ; i<data.length ; i++){
        // console.log(data[i].dueDate.split('T')[0])
        const duedate = new Date(data[i].dueDate.split('T')[0])
        // console.log(duedate)
        if(duedate<currentDate){
          pastDueItems.push(data[i])
        }
      }

      // Filter the array to find items with due dates in the past
      // const pastDueItems = data.filter(item => item.dueDate < currentDate);
      // console.log(pastDueItems)
      setNotifications(pastDueItems)
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
    fetchTasks()
    // console.log(notes)
  }, [fetchAgain])

  return (
<div className="special flex flex-col justify-between h-full ${!darkMode?'bg-custom-yellow-1':'bg-custom-purple-2'}">
      {/* {user && <SideDrawer/>} */}
      <div className={`w-full border-2 ${!darkMode ? 'border-yellow-400' : 'border-purple-400'} ${!darkMode?'bg-custom-yellow-1':'bg-custom-purple-2'} rounded-xl h-full overflow-y-auto`}
        fontFamily="Montserrat"
      >
        {tasks.map((task)=>(
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
            dueDate={task.dueDate.split("T")[0]}
            />
          </TaskModal>  
      ))} 
      </div>
      <div className="w-8/10 flex justify-end mt-2 "
        // width="100%"
        // p="10px"
        // display="flex"
        // justifyContent="flex-end"
        // fontFamily="Montserrat"
        // marginBottom="50px"
      >
      <NewTaskModal>
        <Button colorScheme={!darkMode?'yellow':"purple"} color="white" size="lg" fontSize="4xl">
          +
        </Button>
      </NewTaskModal>
      </div>
    </div>
  )
}

export default TaskPage
