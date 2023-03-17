import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getFilteredContacts } from 'redux/contacts/contactsSelectors';
import { deleteContact } from 'redux/contacts/contactsSlice';

import css from './ContactList.module.css';

const ContactsList = () => {
  const filteredContacts = useSelector(getFilteredContacts);

  const dispatch = useDispatch();

  const removeContact = id => {
    dispatch(deleteContact(id));
  };

  const elements = filteredContacts.map(({ id, name, number }) => (
    <li key={id}>
      <span className={css.text}>
        {name}: {number}
      </span>
      <button
        className={css.removeBtn}
        onClick={() => removeContact(id)}
        type="button"
      >
        Delete
      </button>
    </li>
  ));

  return <ul className={css.contacts}>{elements}</ul>;
};

export default ContactsList;
