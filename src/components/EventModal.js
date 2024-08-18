import React, { useState, useEffect } from 'react';
import moment from 'moment';

const EventModal = ({ event, onClose, onSave, onDelete }) => {
  const [title, setTitle] = useState(event ? event.title : '');
  const [date, setDate] = useState(event ? moment(event.date).format('YYYY-MM-DD') : '');
  const [category, setCategory] = useState(event ? event.category : 'Personal');
  const [description, setDescription] = useState(event ? event.description : ''); // Added description state
  const [error, setError] = useState('');

  useEffect(() => {
    if (event) {
      setTitle(event.title);
      setDate(moment(event.date).format('YYYY-MM-DD'));
      setCategory(event.category);
      setDescription(event.description); // Load description if exists
    }
  }, [event]);

  const handleSave = () => {
    try {
      onSave({ id: event ? event.id : Date.now(), title, date, category, description });
      setError('');
    } catch (err) {
      setError('Failed to save the event. Please try again.');
    }
  };

  return (
    <div className="modal">
      <h2>{event ? 'Edit Event' : 'Add Event'}</h2>
      {error && <div className="error">{error}</div>}
      <label>
        Title:
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Event Title"
        />
      </label>
      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <label>
        Category:
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          {/* Add more categories as needed */}
        </select>
      </label>
      <label>
        Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Event Description"
        ></textarea>
      </label>
      <button onClick={handleSave}>Save</button>
      {event && <button onClick={() => onDelete(event.id)}>Delete</button>}
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default EventModal;
