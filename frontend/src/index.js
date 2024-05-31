import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react'
import {BrowserRouter} from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import NoteProvider from './context/NoteProvider';
// import ChatProvider from './Context/chatProvider'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <BrowserRouter>
      <NoteProvider>
        <ChakraProvider>
          <Header />
          <App />
          {/* <Footer /> */}
        </ChakraProvider>
      </NoteProvider>
      </BrowserRouter>    
);
