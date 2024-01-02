import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addName = (name, number) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    const existContact = this.state.contacts.some(
      elem => elem.name.toLowerCase() === name.toLowerCase()
    );

    if (!existContact) {
      this.setState(({ contacts }) => ({
        contacts: [newContact, ...contacts],
      }));
    } else {
      alert(`${name} is already in contacts`);
    }
  };

  handleOnChange = e => {
    this.setState({ filter: e.target.value });
  };

  visibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizeFilter = filter.toLowerCase();
    return contacts.filter(elem =>
      elem.name.toLowerCase().includes(normalizeFilter)
    );
  };

  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(elem => elem.id !== id),
    }));
  };

  render() {
    return (
      <div style={{ marginLeft: '30px' }}>
        <h1>Phonebook</h1>
        <ContactForm contacts={this.state.contacts} addHandle={this.addName} />
        <h2>Contacts</h2>
        <Filter onChange={this.handleOnChange} />
        <ContactList
          onDelete={this.deleteContact}
          contacts={this.visibleContacts()}
        />
      </div>
    );
  }
}
