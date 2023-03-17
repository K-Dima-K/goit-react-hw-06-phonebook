import React, { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contacts/contactsSlice';
import { getAllContacts } from 'redux/contacts/contactsSelectors';

import css from './ContactForm.module.css';

const ContactForm = () => {
  const [state, setState] = useState({
    name: '',
    number: '',
  });

  const contacts = useSelector(getAllContacts);

  const dispatch = useDispatch();

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const { name, number } = state;

  const isDuplicate = name => {
    const normalized = name.toLowerCase();
    const result = contacts.find(({ name }) => {
      return normalized === name.toLowerCase();
    });
    return Boolean(result);
  };

  const handleAddContact = e => {
    e.preventDefault();
    if (isDuplicate(name)) {
      alert(`${name} is already in contacts`);
      return false;
    }
    const action = addContact({ name, number });
    dispatch(action);

    setState({
      name: '',
      number: '',
    });
  };

  return (
    <form className={css.form} onSubmit={handleAddContact}>
      <div className={css.formGroup}>
        <label className={css.label}>Name</label>
        <input
          onChange={handleChange}
          className={css.input}
          placeholder="enter name"
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label className={css.label}>Number</label>
        <input
          onChange={handleChange}
          className={css.input}
          placeholder="enter phone number"
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button className={css.submit_btn} type="submit">
          Add contact
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
