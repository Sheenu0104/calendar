import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import EventModal from './EventModal';
import FeedbackForm from './FeedbackForm';
import './CalendarApp.css'; // Import CSS file for custom styles

const CalendarApp = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [filter, setFilter] = useState('All');
  const [error, setError] = useState('');
  const [theme, setTheme] = useState('light'); // Add state for theme

  useEffect(() => {
    // Fetch events from API or local storage
    // setEvents(fetchedEvents);
  }, []);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleEventClick = (event) => {
    setCurrentEvent(event);
    setShowModal(true);
  };

  const handleSaveEvent = (event) => {
    try {
      if (currentEvent) {
        setEvents(events.map(e => e.id === event.id ? event : e));
      } else {
        setEvents([...events, event]);
      }
      setShowModal(false);
      setCurrentEvent(null); // Clear current event after saving
      setError('');
    } catch (err) {
      setError('Failed to save the event. Please try again.');
    }
  };

  const handleDeleteEvent = (eventId) => {
    try {
      setEvents(events.filter(event => event.id !== eventId));
      setShowModal(false);
      setCurrentEvent(null); // Clear current event after deletion
      setError('');
    } catch (err) {
      setError('Failed to delete the event. Please try again.');
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleThemeToggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const filteredEvents = events.filter(event => 
    filter === 'All' || event.category === filter
  );

  return (
    <div className={`app-container ${theme}`}>
      <button className="theme-toggle-button" onClick={handleThemeToggle}>
        Theme
      </button>
      <div className="calendar-events-container">
        <div className="calendar-section">
          <Calendar
            onChange={handleDateChange}
            value={date}
          />
        </div>
        <div className="events-section">
          <h2>Events on {moment(date).format('MMMM Do YYYY')}</h2>
          {error && <div className="error">{error}</div>}
          <select value={filter} onChange={handleFilterChange}>
            <option value="All">All</option>
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
          
          </select>
          <ul>
            {filteredEvents.filter(event => moment(event.date).isSame(date, 'day')).map(event => (
              <li key={event.id} onClick={() => handleEventClick(event)}>
                {event.title}
              </li>
            ))}
          </ul>
          {/* Moved button outside the event list box */}
        </div>
      </div>
      <button className="add-event-button" onClick={() => { setCurrentEvent(null); setShowModal(true); }}>
        Add Event
      </button>
      {showModal && (
        <EventModal
          event={currentEvent}
          onClose={() => setShowModal(false)}
          onSave={handleSaveEvent}
          onDelete={currentEvent ? () => handleDeleteEvent(currentEvent.id) : null}
        />
      )}
      <div className="feedback-container">
        <FeedbackForm />
      </div>
    </div>
  );
};

export default CalendarApp;
