import { ViewIcon } from '@chakra-ui/icons';
import { Button, FormControl, FormLabel, IconButton, Input, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, VStack, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { NoteState } from '../context/NoteProvider';
import axios from "axios"

const NewNoteModal = ({children}) => {
    
    const user = NoteState();

    const [title,setTitle] = useState();
    const [content,setContent] = useState();
    const [loading,setLoading] = useState();

    // console.log(children);
    const { isOpen, onOpen, onClose } = useDisclosure();

    const toast = useToast();
    const history = useHistory();

    const handleAddNote = async () => {
        // console.log(user.user._id)
        // const id = children.key;
        setLoading(true)
        if(!title || !content){
            toast({
                title: 'Please fill all the fields',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:"bottom"
            })
            setLoading(false);
            // onClose();
            return;
        }
        try {
            const config = {
                headers:{
                    "Content-type":"application/json",
                    Authorization:`Bearer ${user.user.token}`,
                },
            }
            const {data} = await axios.post(`/api/notes/`,{title,content},config)
            // console.log(data)
            toast({
                title: 'Succesfully Added',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position:"bottom"
            })
            console.log(data);
            setLoading(false);
            user.setFetchAgain(true);
            onClose();
            history.push("/user")
        } catch (error) {
            // toast({
            //     title: 'Error Occured!',
            //     description:error.response.data.message,
            //     status: 'warning',
            //     duration: 5000,
            //     isClosable: true,
            //     position:"bottom"
            // })
            setLoading(false);
            return;
        }
    }

  return (
    <>
      {children?(<span onClick={onOpen} fontFamily="Montserrat">{children}</span>):(<IconButton display={{base:"flex"}} icon={<ViewIcon/>} onClick={onOpen} />)}
      <Modal size="lg" isOpen={isOpen} onClose={onClose} isCentered fontFamily="Montserrat">
        <ModalOverlay />
        <ModalContent height="310px">
          <ModalHeader fontSize="40px" fontFamily="Montserrat" display="flex" justifyContent="center">Add Note</ModalHeader>
          <ModalCloseButton />
          <VStack spacing="5px" fontFamily="Montserrat" ml="10px" mr="10px">
            <FormControl id="title" isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                    value={title}
                    placeholder="enter new note title"
                    onChange={(e) => setTitle(e.target.value)}
                />
            </FormControl>
            <FormControl id="content" isRequired>
                <FormLabel>Content</FormLabel>
                <Input
                    value={content}
                    placeholder="enter new note content"
                    onChange={(e) => setContent(e.target.value)}
                />
            </FormControl>
      </VStack>
          <ModalFooter fontFamily="Montserrat" mb="10px">
            <Button colorScheme='blue' mr={3} onClick={handleAddNote} isLoading={loading}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NewNoteModal
