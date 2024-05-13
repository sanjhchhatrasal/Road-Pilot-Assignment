import React, { useState, useEffect } from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './App.css';
import jan from './Images/jan.avif';
import feb from './Images/feb.avif';
import march from './Images/march.avif';
import april from './Images/april.avif';
import may from './Images/may.avif';
import june from './Images/june.avif';
import july from './Images/july.avif';
import aug from './Images/aug.webp';
import sep from './Images/sep.avif';
import oct from './Images/october.webp';
import nov from './Images/november.avif';
import dec from './Images/dec.avif';


const monthImages = {
  January: jan,
  February: feb,
  March: march,
  April: april,
  May: may,
  June: june,
  July: july,
  August: aug,
  September: sep,
  October: oct,
  November: nov,
  December: dec,
};

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [daysInMonth, setDaysInMonth] = useState([]);
  const [monthContent, setMonthContent] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');

  useEffect(() => {
    const days = getDaysInMonth(selectedDate);
    setDaysInMonth(days);
    setMonthContent(getMonthContent(selectedDate));
    setSelectedMonth(moment(selectedDate).format('MMMM')); 
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const getDaysInMonth = (date) => {
    const daysInMonth = moment(date).daysInMonth();
    return Array.from({ length: daysInMonth }, (_, index) => index + 1);
  };

  const getMonthContent = (date) => {
    const month = moment(date).format('MMMM');
    const daysArray = [];
   
    const firstDayOfMonth = moment(date).startOf('month');
    const daysInMonth = firstDayOfMonth.daysInMonth();
    for (let i = 1; i <= daysInMonth; i++) {
      const dayOfWeek = firstDayOfMonth.date(i).format('ddd'); 
      daysArray.push({ date: i, dayOfWeek });
    }
    return daysArray;
  };

  return (
    <div className="h-screen w-full ">
      <div className="content">
        <h1 className='text-center lg:text-[3vw] md:text-[4vw] text-[5vw] bg-pink-600 text-white m-[1vw]'>{selectedMonth}</h1> 
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="MMMM yyyy"
          placeholderText="Month"
          showMonthYearPicker
          className="p-[0.8vw] border border-slate-500 rounded-md m-3 cursor-pointer bg-transparent"
        />

        <div className="flex">
          <table className="flex flex-col flex-wrap days-table">
            <tbody className='flex'>
              <tr className='md:p-[1vw] p-[3vw] md:text-[1.2vw] text-[2.2vw]'>
                <th className="bg-gray-200 p-2">Date</th>
                <th className="bg-gray-200 p-2">Day</th>
                <th className="bg-gray-200 p-2">Column 3</th> 
                <th className="bg-gray-200 p-2">Column 4</th> 
                <th className="bg-gray-200 p-2">Tick Mark</th> 
                {daysInMonth.map((day, index) => (
                  <tr key={index} className='md:p-[1vw] p-[3vw] md:text-[1.2vw] text-[2.2vw]'>
                    <td className='large-cell active-day bg-gray-100'>{day}</td>
                    <td className='large-cell active-day bg-gray-100'>
                      {monthContent[index].dayOfWeek}
                    </td>
                    <td className='large-cell active-day bg-gray-100'>Column 3 content</td> 
                    <td className='large-cell active-day bg-gray-100'>Column 4 content</td>
                    <td className='large-cell active-day bg-gray-100'>&#10004;</td> 
                  </tr>
                ))}
              </tr>
            </tbody>
          </table>

          <div className=" md:w-[30vw] md:h-[20vw] h-[50vw] w-[60vw] relative overflow-hidden rounded-3xl md:left-[20vw] left-[10vw] top-[5vw]">
            <img src={monthImages[selectedMonth]} alt={selectedMonth} className=" h-[100%] w-[100%] absolute object-cover mx-auto my-3" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
