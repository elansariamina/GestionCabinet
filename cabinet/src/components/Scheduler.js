import React, { useState, useEffect } from 'react';
import RdVcard from "./RDVcard";


const Scheduler = () => {


    const  times =["8:30","9:30","10:30","11:30","12:30","14:30","15:30","16:30","17:30"]
    const [currentMonth, setCurrentMonth] = useState(new Date());
    let isPassed=false;
    let isPastDay=false;
    useEffect(() => {
         isPassed=false;
         isPastDay=false;
        setCurrentMonth(new Date());
    }, []);

    const goToPreviousMonth = () => {
        const previousMonth = new Date(currentMonth);
        previousMonth.setMonth(previousMonth.getMonth() - 1);
        const now = new Date();
        now.setDate(1);

        if (previousMonth < now) {
            return;
        }

        setCurrentMonth(previousMonth);
    };

    const goToNextMonth = () => {
        const nextMonth = new Date(currentMonth);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        setCurrentMonth(nextMonth);
    };

    const daysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const startDayOfWeek = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    const renderCalendar = () => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const numDays = daysInMonth(year, month);
        const startDay = startDayOfWeek(year, month);
        const today = new Date();
        let day = 1;

        const calendar = [];
        for (let row = 0; row < 5; row++) {
            const week = [];

            for (let col = 0; col < 7; col++) {
                isPastDay = row === 0 && col < startDay;
                isPassed = today > new Date(year, month, day);
                let cellClasses = "border p-1 h-40 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10";
                let hoverClasses = "";

                if (isPastDay || isPassed) {
                    cellClasses += " bg-gray-100 align-text-top";
                } else {
                    hoverClasses = "hover:bg-gray-300";
                }

                if (isPastDay || day > numDays) {
                    week.push(
                        <td key={`empty-${row}-${col}`} className={`${cellClasses} ${hoverClasses}`} />
                    );
                } else {
                    week.push(
                        <td key={`day-${day}`} className={`${cellClasses} ${hoverClasses}`}>
                            <div className="flex flex-col h-200 mx-auto xl:w-40 lg:w-30 md:w-30 sm:w-full w-10 mx-auto overflow-hidden">
                                <div className="top h-5 w-full">
                                    <span className="text-gray-500">{day}</span>
                                </div>
                                <div className="bottom flex-grow h-30 py-1 w-full cursor-pointer">
                                    {!isPastDay && !isPassed ? (
                                        times.map((time) => {
                                            const formattedTime = time;
                                            const date = new Date(year, month, day);
                                            return (
                                                <RdVcard
                                                    key={time}
                                                    time={formattedTime}
                                                    date={date}
                                                />
                                            );
                                        })
                                    ) : null}
                                </div>
                            </div>
                        </td>
                    );
                    day++;
                }
            }
            calendar.push(<tr key={`week-${row}`} className="text-center h-20">{week}</tr>);
        }
        return calendar;
    };


    return (
        <div className="container mx-auto mt-10">
            <div className="wrapper bg-white rounded shadow w-full">
                <div className="header flex justify-between border-b p-2">
                    <span className="text-lg font-bold">
                        {currentMonth.toLocaleString('default', { year: 'numeric', month: 'long' })}
                    </span>
                    <div className="buttons">
                        <button className="p-1" onClick={goToPreviousMonth}>
                            <svg width="1em" fill="gray" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-left-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path fillRule="evenodd" d="M8.354 11.354a.5.5 0 0 0 0-.708L5.707 8l2.647-2.646a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708 0z" />
                                <path fillRule="evenodd" d="M11.5 8a.5.5 0 0 0-.5-.5H6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5z" />
                            </svg>
                        </button>
                        <button className="p-1" onClick={goToNextMonth}>
                            <svg width="1em" fill="gray" height="1em" viewBox="0 0 16 16" className="bi bi-arrow-right-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                                <path fillRule="evenodd" d="M7.646 11.354a.5.5 0 0 0 0-.708L10.293 8 7.646 5.354a.5.5 0 0 0-.708.708l3 3a.5.5 0 0 0 0 .708l-3 3a.5.5 0 0 0 .708 0z" />
                                <path fillRule="evenodd" d="M10.5 8a.5.5 0 0 0-.5-.5H5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div  className="max-h-[350px] overflow-y-scroll">
                    <table>
                        <thead className="sticky top-0 bg-white">
                        <tr>
                            <th>Dimanche</th>
                            <th>Lundi</th>
                            <th>Mardi</th>
                            <th>Mercredi</th>
                            <th>Jeudi</th>
                            <th>Vendredi</th>
                            <th>Samedi</th>
                        </tr>
                        </thead>
                        <tbody>{renderCalendar()}</tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Scheduler;
