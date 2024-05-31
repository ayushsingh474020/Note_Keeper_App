import { Avatar, Box, Button, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Tooltip, useDisclosure,useToast } from '@chakra-ui/react';
import React,{useState} from 'react'
import {BellIcon,ChevronDownIcon} from "@chakra-ui/icons"
import ProfileModal from './ProfileModal';
import { useHistory } from 'react-router-dom';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { NoteState } from '../context/NoteProvider';


const SideDrawer = () => {
  const {user} = NoteState();

  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/")
  }

  return (
    <>
      <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      bg="#f5ba13"
      w="100%"
      p="5px 10px 5px 10px"
      borderWidth="5px"
      >
        {/* <Tooltip
          label="Search"
          hasArrow
          placement='bottom-end'
        >
          <Button variant="ghost" onClick={onOpen}>
          <i class="fas fa-search"></i>
          <Text display={{base:"none",md:"flex"}} px="4">Search</Text>
          </Button>
        </Tooltip> */}

        <Text fontSize="2xl" fontFamily="Work sans" color="white">Keeper</Text>

        <div>
          {/* <Menu> */}
            {/* <MenuButton p={1}>
              {notification.length ? (
                <BellIcon fontSize="2xl" m={1} color="blue"/>
              ) : (
                <BellIcon fontSize="2xl" m={1} color="black"/>
              )}
              
            </MenuButton>
            <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu> */}
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
              <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic}/>
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              
              <MenuDivider/>
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      {/* <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Notes</DrawerHeader>
          <DrawerBody>
            <Box display="flex" marginBottom="10px">
              <Input placeholder='Search by name or email' mr={2} value={search} onChange={(e)=> {setSearch(e.target.value)}} />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (<ChatLoading/>) : (searchResult.map((user)=>(
              <UserListItem key={user._id} user={user} handleFunction={()=> accessChat(user._id)} />
            )))}
            {loadingChat && <Spinner display="flex" ml="auto" />}
          </DrawerBody>
        </DrawerContent>
      </Drawer> */}
    </>
  )
}

export default SideDrawer
