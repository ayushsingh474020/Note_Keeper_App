import { ViewIcon } from '@chakra-ui/icons';
import { Box, Button, FormControl, FormLabel, IconButton, Image, Input, Text, useDisclosure, useToast } from '@chakra-ui/react'
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
import NoteLoading from './NoteLoading';
import UserListItem from './Avatar/UserListItem';
import UserLoading from './UserLoading';
import UserBadgeItem from './Avatar/UserBadgeItem';


const ShareModal = ({props,children}) => {
    console.log(props,children);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [loading,setLoading] = useState(false)
    const [search,setSearch] = useState();
    const [searchResult,setSearchResult] = useState([])
    const [selectedUsers,setSelectedUsers] = useState([])
    

    const {setFetchAgain,user} = NoteState()

    const toast = useToast()
    const history = useHistory()

    const handleSearch = async (query) => {
        setSearch(query)
        if(!query){
            return;
        }

        try {
            setLoading(true);

            const config = {
                headers:{
                  Authorization:`Bearer ${user.token}`
                }
            }

            console.log("Sending request with query:", query);
            const {data} = await axios.get(`/api/user?search=${query}`,config)
            console.log("Response data:", data);
            setLoading(false);
            setSearchResult(data);

        } catch (error) {
            console.error("Error occurred:", error);
            // toast({
            //     title: 'Error Occured',
            //     description:error.message,
            //     status: 'warning',
            //     duration: 5000,
            //     isClosable: true,
            //     position:"bottom"
            // })
            return;
        }
    }

      const handleGroup = (userToAdd)=> {

        if(selectedUsers.includes(userToAdd)){
            toast({
                title: 'Already Added',
                description:"User Already in the Group",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:"bottom"
            })
            return;
        }
        setSelectedUsers([...selectedUsers,userToAdd]);
        // console.log(selectedUsers)
    }

      const handleDelete = (delUser) => {
        setSelectedUsers(
            selectedUsers.filter((sel) => sel._id !== delUser._id)
        );
    }

    const handleShare = async () => {
      if(selectedUsers.length){
        for(let i=0 ; i<selectedUsers.length ; i++){
          try {
            setLoading(true);

            const config = {
                headers:{
                  Authorization:`Bearer ${user.token}`
                }
            }

            // console.log("Sending request with query:", query);
            const {data} = await axios.post(`/api/notes/share/${selectedUsers[i]._id}`,{title:props.props.title,content:props.props.content},config)
            // console.log("Response data:", data);
            setLoading(false);
            // setSearchResult(data);
            toast({
              title: 'Shared Succesfully',
              description:"Notes Shared Succesfully",
              status: 'success',
              duration: 5000,
              isClosable: true,
              position:"bottom"
          })
          return;

          } catch (error) {
              // console.error("Error occurred:", error);
              toast({
                  title: 'Error Occured',
                  description:error.message,
                  status: 'warning',
                  duration: 5000,
                  isClosable: true,
                  position:"bottom"
              })
              return;
          }
        }
      }
      toast({
        title: 'No User Selected',
        // description:"User Already in the Group",
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position:"bottom"
    })
    return;
    }

      return (
        <>
          <span onClick={onOpen}>{children}</span>
    
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent height="410px">
              <ModalHeader
              fontSize="35px"
              fontFamily="Montserrat"
              display="flex"
              justifyContent="center"
              >Share your Note</ModalHeader>
              <ModalCloseButton />
              <ModalBody display="flex" flexDirection="column" alignItems="center" justifyContent="center">
                <FormControl>
                  <Input placeholder='Add Users' mb={1} onChange={(e)=>handleSearch(e.target.value)}/>
                </FormControl>
                <Box display="flex" width="100%" flexWrap="wrap" >
                  {selectedUsers?.map((u)=>(
                      <UserBadgeItem key={user._id} user={u} handleFunction={()=>handleDelete(u)}/>
                  ))}
                </Box>
                {loading?<NoteLoading/>:(
                    searchResult?.slice(0,4).map((user)=>(
                      <UserListItem key={user._id} user={user} handleFunction={()=>handleGroup(user)} />
                  ))
                )}
              </ModalBody>
    
              <ModalFooter>
                <Button colorScheme='blue'onClick={()=>handleShare()}>
                  Share
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )
}

export default ShareModal;
