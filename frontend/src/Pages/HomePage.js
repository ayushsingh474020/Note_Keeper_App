import React, { useEffect } from 'react'
import {Container,Box,Text,Tabs, TabList, TabPanels, Tab, TabPanel} from "@chakra-ui/react"
import Login from "../components/Authentication/Login"
import Signup from "../components/Authentication/Signup"
import { useHistory } from 'react-router-dom/cjs/react-router-dom'

const HomePage = () => {
  const history = useHistory()
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"))
    // setUser(userInfo);
    if(userInfo){
      history.push("/user");
    }
  }, [history])
  return (
    <div>
      <Container  fontFamily="Montserrat">
        <Box display="flex" justifyContent="center" p={3} width="100%" m="40px 0 15px 0" borderRadius="lg" borderWidth="1px" bg="#f5ba13">
          <Text fontSize="4xl" fontFamily="Montserrat" color="white" align={'center'}>Keeper</Text>
        </Box>
        <Box bg="white" w="100%" p={4} borderRadius="lg" borderWidth="1px" display="flex" justifyContent="center" alignItems="center">
            <Tabs variant='soft-rounded' colorScheme='yellow'>
            <TabList mb="1em">
              <Tab width="100%">Login</Tab>
              <Tab width="100%">Sign Up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup/>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Container>
    </div>
  )
}

export default HomePage
