import { useSelector } from 'react-redux';

import ContactList from './components/ContactList/ContactList';
import Filter from './components/Filter/Filter';
import ContactForm from './components/ContactForm/ContactForm';
import { getFilteredContacts } from 'redux/contacts/contactsSelectors';

import css from './App.module.css';

const App = () => {
  const isContacts = Boolean(useSelector(getFilteredContacts).length);

  return (
    <div className={css.root}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm />
      <h2 className={css.title}>Contacts</h2>
      <Filter />
      {isContacts ? <ContactList /> : <p>Contact list is empty</p>}
    </div>
  );
};

export default App;
