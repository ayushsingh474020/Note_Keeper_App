import { ViewIcon } from '@chakra-ui/icons';
import { Button, FormControl, FormLabel, IconButton, Image, Input, Text, useDisclosure, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import axios from "axios"
import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import { NoteState } from '../context/NoteProvider';



const ProfileModal = ({children}) => {
    // console.log(children);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isEditing,setIsEditing] = useState()
    const [editedName,setEditedName] = useState()
    const [editedEmail,setEditedEmail] = useState()
    const [loading,setLoading] = useState(false)

    const {setFetchAgain,user} = NoteState()

    const toast = useToast()
    const history = useHistory()
    const handleEdit = () => {
      setIsEditing(true);
    }

    const handleClose = async () => {
      setIsEditing(false)
      setLoading(false)
      onClose()
    }

    const handleSave = async () => {
      setLoading(true);
      console.log(user.token)
      try {
          const config = {
              headers:{
                  "Content-type":"application/json",
                  Authorization:`Bearer ${user.token}`,
              },
          }
          console.log(editedName,editedEmail)
          const {data} = await axios.put(`/api/user/`,{name:editedName,email:editedEmail},config)
          console.log(data)
          toast({
              title: 'Succesfully Saved',
              status: 'success',
              duration: 5000,
              isClosable: true,
              position:"bottom"
          })
          // console.log(data);
          localStorage.setItem("userInfo", JSON.stringify(data))
          setLoading(false);
          setFetchAgain(true);
          setIsEditing(false);
          onClose();
          history.push("/user")
      } catch (error) {
          toast({
              title: 'Error Occured!',
              // description:error.response.data.message,
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
  return (
    <>
      {children?(<span onClick={onOpen} fontFamily="Montserrat">{children}</span>):(<IconButton display={{base:"flex"}} icon={<ViewIcon/>} onClick={onOpen} />)}
      <Modal size="lg" isOpen={isOpen} onClose={handleClose} isCentered>
        <ModalOverlay />
        <ModalContent height="380px">
          <ModalHeader fontSize="40px" fontFamily="Montserrat" display="flex" justifyContent="center" pb="0px">
          {isEditing ? (
            <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    value={editedName}
                    placeholder={user.name}
                    onChange={(e) => setEditedName(e.target.value)}
                />
            </FormControl>
          ) : <Text fontSize={{base:"28px",md:"30px"}} fontFamily="Montserrat" textDecoration="underline"> {user.name} </Text>}
          {/* <Text fontSize={{base:"28px",md:"30px"}} fontFamily="Montserrat" textDecoration="underline"> {user.name} </Text> */}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" justifyContent="center" alignItems="center" fontFamily="Montserrat" mt="0px" pt="0px">
            <Image borderRadius="full" boxSize="150px" src={user.pic} alt={user.name} />
            {isEditing ? (
            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    value={editedEmail}
                    placeholder={user.email}
                    onChange={(e) => setEditedEmail(e.target.value)}
                />
            </FormControl>
          ) : <Text fontSize={{base:"28px",md:"30px"}} fontFamily="Montserrat"> {user.email} </Text>}
          {/* <Text fontSize={{base:"28px",md:"30px"}} fontFamily="Montserrat"> {user.email} </Text> */}
          </ModalBody>

          <ModalFooter fontFamily="Montserrat" mb="10px">
          {isEditing ? (<Button colorScheme='blue' mr={3} onClick={handleSave} isLoading={loading}>
              Save
            </Button>) : (<Button colorScheme='blue' mr={3} onClick={handleEdit} isLoading={loading}>
              Edit
            </Button>)}
            <Button colorScheme='red' mr={3} onClick={handleClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}


export default ProfileModal;
