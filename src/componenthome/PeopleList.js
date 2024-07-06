import React from 'react';
import './PeopleList.css';

const PeopleList = ({ onSelectConversation }) => {
  const people = [
    { id: 1, name: 'def', email: 'def@gmail.com' }
  ];

  return (
    <div className="people-list">
      <h3>People</h3>
      {people.map(person => (
        <div key={person.id} className="person" onClick={() => onSelectConversation(person)}>
          <img src="path/to/user.jpg" alt="User" />
          <div>
            <h4>{person.name}</h4>
            <p>{person.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PeopleList;
