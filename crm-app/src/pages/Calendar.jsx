import { useEffect, useState } from "react";
import CalendarDay from "../components/CalendarDay";
import EventModal from "../components/EventModal";
import axios from "axios";
import {
  format,
  parseISO,
  getDaysInMonth,
  addMonths,
  subMonths,
  startOfMonth,
  getDay,
} from "date-fns";

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedUser, setSelectedUser] = useState(1); // Domyślnie Radek
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/calendar")
      .then((res) => {
        console.log("📥 Otrzymane wydarzenia z API:", res.data);
        setEvents(res.data);
      })
      .catch((err) => {
        console.error("❌ Błąd pobierania wydarzeń:", err);
      });
  }, []);

  const handleAddEvent = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const handleEventAdded = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
    setShowModal(false);
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = (getDay(startOfMonth(currentDate)) + 6) % 7;
  const formattedMonth = format(currentDate, "yyyy-MM");

  return (
    <div className="ml-64 min-h-screen p-10 bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setCurrentDate(subMonths(currentDate, 1))}
          className="p-2 bg-gray-200 rounded"
        >
          {"<<"}
        </button>

        <h2 className="text-2xl font-bold">
          {format(currentDate, "MMMM yyyy")}
        </h2>

        <button
          onClick={() => setCurrentDate(addMonths(currentDate, 1))}
          className="p-2 bg-gray-200 rounded"
        >
          {">>"}
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {/* Puste pola na początek miesiąca */}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div
            key={`empty-${i}`}
            className="border p-2 h-24 bg-gray-100 opacity-50"
          ></div>
        ))}

        {/* Faktyczne dni miesiąca */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const formattedDate = `${formattedMonth}-${String(i + 1).padStart(
            2,
            "0"
          )}`;
          const eventsForDay = events.filter(
            (e) => format(parseISO(e.date), "yyyy-MM-dd") === formattedDate
          );

          return (
            <CalendarDay
              key={i}
              date={i + 1}
              events={eventsForDay}
              onAddEvent={handleAddEvent}
            />
          );
        })}
      </div>

      {showModal && (
        <EventModal
          onClose={() => setShowModal(false)}
          onSave={handleEventAdded}
          userId={selectedUser}
          date={selectedDate}
        />
      )}
    </div>
  );
};

export default Calendar;
