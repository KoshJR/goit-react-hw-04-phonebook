import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactsList } from 'components/ContactsList/ContactsList';
import { Filter } from 'components/Filter/Filter';
import { FormAddContacts } from 'components/Form/Form';

export const App = () => {
  const [contacts, setContacts] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = localStorage.getItem('contacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  useEffect(() => {
    if (contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  const handleAddContact = (contact, formReset) => {
    const newContact = {
      id: nanoid(),
      name: contact.name,
      number: contact.number,
    };

    const isContact = (contacts || []).some(
      obj =>
        obj.name.trim().toLowerCase() === newContact.name.trim().toLowerCase()
    );

    if (isContact) {
      alert(`${newContact.name} is already in contacts!`);
      formReset();
      return;
    }
    setContacts(prevState => [...prevState, newContact]);
    formReset();
  };

  const handleChange = event => {
    setFilter(event.target.value);
  };

  const handleDeleteContact = event => {
    const contactId = event.target.id;
    setContacts(contacts.filter(({ id }) => id !== contactId));
  };

  const filteredContacts = () => {
    const array = contacts || [];
    return array.filter(({ name }) =>
      name.toLowerCase().includes(filter.trim().toLowerCase())
    );
  };

  return (
    <div className="phone_book">
      <h1>Phone Book</h1>
      <FormAddContacts handleAddContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter state={filter} handleChange={handleChange} />
      <ContactsList
        contacts={filteredContacts()}
        handleDeleteContact={handleDeleteContact}
      />
    </div>
  );
};
