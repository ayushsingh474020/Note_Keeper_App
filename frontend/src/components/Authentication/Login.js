import React,{useState} from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import axios from "axios"
import {useHistory} from "react-router-dom"

const Login = () => {

  const [email,setEmail] = useState();
  const [password,setPassword] = useState();
  const [show,setShow] = useState(false);
  const [loading,setLoading] = useState(false)

  const toast = useToast();
  const history = useHistory();

  const handleClick = () => {
    setShow(!show);
  }

  const submitHandler = async () => {
    // console.log(name,email,password,confirmPassword);
    setLoading(true);
    if(!email || !password){
        toast({
            title: 'Please fill all the fields',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position:"bottom"
        })
        setLoading(false);
        return;
    }
    try {
        const config = {
            headers:{
                "Content-type":"application/json",
            },
        }
        const {data} = await axios.post("/api/user/login",{email,password},config)
        toast({
            title: 'Login Succesfull',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position:"bottom"
        })
        console.log(data);
        localStorage.setItem("userInfo", JSON.stringify(data))
        setLoading(false);
        history.push("/user")
        // return;
    } catch (err) {
        toast({
            title: 'Error Occureds!',
            description:err.response.data.message,
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
    <div>
      <div>
      <VStack spacing="5px">
        <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
                value={email}
                placeholder="enter your email"
                onChange={(e) => setEmail(e.target.value)}
            />
        </FormControl>
        <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input
                    value={password}
                    type={show?"text":"password"}
                    placeholder="enter your password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <Button
        width="100%"
        colorScheme="blackAlpha"
        style={{marginTop:15}}
        onClick={submitHandler}
        isLoading={loading}>
            Login
        </Button>
        <Button
        variant="solid"
        width="100%"
        colorScheme="red"
        style={{marginTop:15}}
        onClick={() => {
            setEmail("tanisha@gmail.com")
            setPassword("12345678")
        }}>
            Get guest user credentials
        </Button>
      </VStack>
    </div>
    </div>
  )
}

export default Login
