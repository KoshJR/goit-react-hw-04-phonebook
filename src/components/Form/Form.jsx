import { useState } from 'react';
import css from './Form.module.css';

export const FormAddContacts = ({ handleAddContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;

    if (name === 'name') {
      setName(value);
    } else if (name === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    handleAddContact(
      {
        name,
        number,
      },
      reset
    );
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form className={css.addForm} onSubmit={event => handleSubmit(event)}>
      <div className={css.inputForm}>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          id="name"
          className={css.input}
          onChange={event => handleChange(event)}
          value={name}
          required
        />
      </div>
      <div className={css.inputForm}>
        <label htmlFor="number">Number:</label>
        <input
          type="tel"
          name="number"
          id="number"
          className={css.input}
          value={number}
          onChange={event => handleChange(event)}
          required
        />
      </div>
      <button className={css.addBtn} type="submit">
        Add contact
      </button>
    </form>
  );
};
