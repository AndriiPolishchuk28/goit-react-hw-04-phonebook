import { ContactForm } from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { useState, useEffect } from 'react';

export const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts') ?? [])
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addName = (name, number) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    const existContact = contacts.some(
      elem => elem.name.toLowerCase() === name.toLowerCase()
    );

    if (!existContact) {
      setContacts(state => [newContact, ...state]);
    } else {
      alert(`${name} is already in contacts`);
    }
  };

  const handleOnChange = e => {
    setFilter(e.target.value);
  };

  const visibleContacts = () => {
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(elem =>
      elem.name.toLowerCase().includes(normalizeFilter)
    );
  };

  const deleteContact = id => {
    setContacts(state => state.filter(elem => elem.id !== id));
  };

  return (
    <div style={{ marginLeft: '30px' }}>
      <h1>Phonebook</h1>
      <ContactForm contacts={contacts} addHandle={addName} />
      <h2>Contacts</h2>
      <Filter onChange={handleOnChange} />
      <ContactList onDelete={deleteContact} contacts={visibleContacts()} />
    </div>
  );
};
