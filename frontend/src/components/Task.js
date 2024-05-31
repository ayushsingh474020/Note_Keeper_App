import React from "react";
import { NoteState } from "../context/NoteProvider";

function Task(props) {
  const {darkMode} = NoteState();
  return (
    <div className={`note border-2 ${!darkMode?'bg-custom-yellow-1':'bg-custom-purple-2'} ${!darkMode?'text-black':'text-white'} ${!darkMode?'border-black':'border-white'} `}>
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <p><b>Due Date : </b>{props.dueDate}</p>
    </div>
  );
}

export default Task;