import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './CustomCalendar.css';
import { NoteState } from '../context/NoteProvider';
import axios from "axios";
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const MyCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const [importantDates, setImportantDates] = useState([]);
  const history = useHistory();

  const { darkMode, setFetchAgain, user, setTasks, setNotifications } = NoteState();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchTasks();
  }, []);

  const isImportantDate = (date) => {
    return importantDates.some(
      (importantDate) =>
        importantDate.getDate() === date.getDate() &&
        importantDate.getMonth() === date.getMonth() &&
        importantDate.getFullYear() === date.getFullYear()
    );
  };

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const today = new Date();
      if (isImportantDate(date)) {
        return 'react-calendar__tile--important-date';
      }
      if (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
      ) {
        return 'react-calendar__tile--current-date';
      }
      if (date.getMonth() !== today.getMonth()) {
        return 'react-calendar__tile--neighboring-month';
      }
    }
    return '';
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  const fetchTasks = async () => {
    setFetchAgain(false);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      };

      const { data } = await axios.get("/api/tasks", config);
      console.log("Fetched tasks:", data);
      setTasks(data);

      const currentDate = new Date();
      let pastDueItems = [];
      let taskDates = [];

      for (let i = 0; i < data.length; i++) {
        const dueDate = new Date(data[i].dueDate);
        console.log("Parsed due date:", dueDate);
        taskDates.push(dueDate);
        if (dueDate < currentDate) {
          pastDueItems.push(data[i]);
        }
      }

      console.log("Important dates:", taskDates);
      setImportantDates(taskDates);
      setNotifications(pastDueItems);
    } catch (error) {
      console.error('Error occurred while fetching tasks', error.message);
    }
  };

  return (
    <div className={`calendar-container flex flex-col justify-center items-center w-full border-2 ${!darkMode ? 'bg-custom-yellow-1' : 'bg-custom-purple-2'} ${!darkMode ? 'border-yellow-400' : 'border-purple-400'} rounded-xl mb-2 p-2`}>
      <div className={`current-datetime w-full ${!darkMode ? 'text-black' : 'text-white'} rounded-xl text-4xl text-center`}>
        {formatDate(currentTime)} 
      </div>
      <Calendar
        className={`w-full my-6 ${darkMode ? 'calendar-dark' : 'calendar-light'}`}
        onChange={setDate}
        value={date}
        tileClassName={tileClassName}
      />
      <div className={`current-datetime w-full rounded-xl ${!darkMode ? 'text-black' : 'text-white'} text-4xl text-center`}>
        {currentTime.toLocaleTimeString()}
      </div>
    </div>
  );
};

export default MyCalendar;
