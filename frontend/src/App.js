import './App.css';
// import {Button} from "@chakra-ui/button"
import {Route} from "react-router-dom"
import HomePage from './Pages/HomePage';
// import NotePage from './Pages/NotePage';
import UserPage from './Pages/UserPage';
import { NoteState } from './context/NoteProvider';

function App() {
  // const {darkMode} = NoteState()
  return (
    <div className={`App`}>
      <Route path="/" component={HomePage} exact/>
      <Route path="/user" component={UserPage} />
    </div>
  );
}

export default App;
