import { ViewIcon } from '@chakra-ui/icons';
import { Button, FormControl, FormLabel, IconButton, Image, Input, Text, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Textarea } from '@chakra-ui/react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import axios from "axios"
import { NoteState } from '../context/NoteProvider';

const TaskModal = ({children}) => {
    // console.log(children)
    const user = NoteState()
    // const {fetchAgain,setFetchAgain} = NoteState()
    // console.log(children.key)
    const { isOpen, onOpen, onClose } = useDisclosure();

    const toast = useToast()
    const history = useHistory()

    const [loading,setLoading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(children.props.title);
    const [editedContent, setEditedContent] = useState(children.props.content);
    const [editedDueDate,setEditedDueDate] = useState(children.props.dueDate)

    const handleEdit = () => {
        setIsEditing(true);
    }

    const handleSave = async () => {
        setLoading(true);
        try {
            const config = {
                headers:{
                    "Content-type":"application/json",
                    Authorization:`Bearer ${user.user.token}`,
                },
            }
            console.log(editedTitle,editedContent)
            const {data} = await axios.put(`/api/tasks/${children.key}`,{title:editedTitle,content:editedContent,dueDate:editedDueDate},config)
            console.log(data)
            toast({
                title: 'Succesfully Saved',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position:"bottom"
            })
            // console.log(data);
            setLoading(false);
            user.setFetchAgain(true);
            setIsEditing(false);
            onClose();
            history.push("/user")
        } catch (error) {
            toast({
                title: 'Error Occured!',
                description:error.response.data.message,
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:"bottom"
            })
            setLoading(false);
            setIsEditing(false);
            return;
        }
    }

    const handleDelete = async () => {
        console.log(user.user._id)
        const id = children.key;
        setLoading(true)
        try {
            const config = {
                headers:{
                    Authorization:`Bearer ${user.user.token}`,
                },
            }
            const {data} = await axios.delete(`/api/tasks/${id}`,config)
            // console.log(data)
            toast({
                title: 'Succesfully Deleted',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position:"bottom"
            })
            // console.log(data);
            setLoading(false);
            user.setFetchAgain(true);
            onClose();
            history.push("/user")
        } catch (error) {
            toast({
                title: 'Error Occured!',
                description:error.response.data.message,
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:"bottom"
            })
            setLoading(false);
            return;
        }
    }


  return (
    <>
      {children?(<span onClick={onOpen} fontFamily="Montserrat">{children}</span>):(<IconButton display={{base:"flex"}} icon={<ViewIcon/>} onClick={onOpen} />)}
      <Modal size="xl" isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent height="450px">
          <ModalHeader fontSize="40px" fontFamily="Montserrat" display="flex" justifyContent="center" pb="0px">
          {isEditing ? (
            <FormControl id="title" isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                    value={editedTitle}
                    placeholder={children.props.title}
                    onChange={(e) => setEditedTitle(e.target.value)}
                />
            </FormControl>
          ) : <Text fontSize={{base:"28px",md:"30px"}} fontFamily="Montserrat" textDecoration="underline"> {children.props.title} </Text>}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" justifyContent="center" alignItems="center" fontFamily="Montserrat" pt="0px">
          {isEditing ? (
            <FormControl id="content" isRequired mb="0px">
                <FormLabel>Content</FormLabel>
                <Textarea placeholder={children.props.content} value={editedContent} onChange={(e) => setEditedContent(e.target.value)}/>
            </FormControl>
          ) : <Text fontSize={{base:"28px",md:"30px"}} fontFamily="Montserrat"> {children.props.content} </Text>}
          {isEditing ? (
            <FormControl id="dueDate" isRequired mb="0px">
                <FormLabel>Due Date</FormLabel>
                <Input
                    placeholder="Select Due Date and Time"
                    size="md"
                    type="datetime-local"
                    onChange={(e) => setEditedDueDate(e.target.value)}
                />
            </FormControl>
          ) : <Text fontSize={{base:"28px",md:"30px"}} fontFamily="Montserrat"><b>Due Date : </b>{children.props.dueDate.split("T")[0]} </Text>}
          </ModalBody>

          <ModalFooter mb="10px" mt="10px">
          {isEditing ? (<Button colorScheme='blackAlpha' mr={3} onClick={handleSave} isLoading={loading} fontFamily="Montserrat">
              Save
            </Button>) : (<Button colorScheme='blackAlpha' mr={3} onClick={handleEdit} isLoading={loading} fontFamily="Montserrat">
              Edit
            </Button>)}
          
            <Button colorScheme='red' mr={3} onClick={handleDelete} isLoading={loading} fontFamily="Montserrat">
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default TaskModal;
