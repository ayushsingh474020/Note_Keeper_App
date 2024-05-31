import React , {useState} from 'react'
import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast} from '@chakra-ui/react'
import axios from "axios"

import {useHistory} from "react-router-dom"

const Signup = () => {
    const [show,setShow] = useState(false)
    const [name,setName] = useState();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();
    const [confirmPassword,setConfirmPassword] = useState();
    const [loading,setLoading] = useState(false)
    const [pic,setPic] = useState();

    const toast = useToast();
    const history = useHistory()

    const submitHandler = async () => {
        console.log(name,email,password,confirmPassword);
        setLoading(true);
        if(!name || !email || !password || !confirmPassword){
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
        if(password!==confirmPassword){
            toast({
                title: 'Passwords do not match',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:"bottom"
            })
            setLoading(false)
            return;
        }
        try {
            const config = {
                headers:{
                    "Content-type":"application/json",
                },
            }
            const {data} = await axios.post("/api/user",{name,email,password,pic},config)
            toast({
                title: 'Registration Succesfull',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position:"bottom"
            })
            localStorage.setItem("userInfo", JSON.stringify(data))
            setLoading(false);
            history.push("/user")
            // return;
        } catch (err) {
            toast({
                title: 'Error Occured!',
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

    const postDetails = (pics) => {
        setLoading(true);
        if(pics===undefined){
            toast({
                title: 'Please select an Image',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:"bottom"
            })
            return;
        }

        if(pics.type==="image/jpeg" || pics.type==="image/png"){
            const data = new FormData();
            data.append("file",pics);
            data.append("upload_preset", "mern-chat-app");
            data.append("cloud_name","dim36yhrl");
            fetch("https://api.cloudinary.com/v1_1/dim36yhrl/image/upload",{
                method:"post",
                body:data,
            }).then((res) => {
                console.log(res);
                res.json();
            })
              .then((data) => {
                setPic(data.url.toString());
                setLoading(false);
              })
              .catch((err) => {
                console.log(err);
                setLoading(false);
              })
        }
        else{
            toast({
                title: 'Please select an Image',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:"bottom"
            })
            return; 
        }
    }

    const handleClick = () => {
        setShow(!show)
    }

  return (
    <div>
      <VStack spacing="5px">
        <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input
                placeholder="enter your name"
                onChange={(e) => setName(e.target.value)}
            />
        </FormControl>
        <FormControl id="email" isRequired>
            <FormLabel>Email</FormLabel>
            <Input
                placeholder="enter your email"
                onChange={(e) => setEmail(e.target.value)}
            />
        </FormControl>
        <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
                <Input
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
        <FormControl id="confrimPassword" isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
                <Input
                    type={show?"text":"password"}
                    placeholder="enter your password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                        {show ? "Hide" : "Show"}
                    </Button>
                </InputRightElement>
            </InputGroup>
        </FormControl>
        <FormControl id="pic">
            <FormLabel>Upload your Picture</FormLabel>
            <Input
                type="file"
                p={1.5}
                accept="image/*"
                onChange={(e) => postDetails(e.target.files[0])}
            />
        </FormControl>
        <Button
        width="100%"
        colorScheme="blackAlpha"
        style={{marginTop:15}}
        onClick={submitHandler}
        isLoading={loading}>
            Sign Up
        </Button>
      </VStack>
    </div>
  )
}

export default Signup
