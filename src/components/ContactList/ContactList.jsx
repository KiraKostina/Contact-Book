import Contact from '../Contact/Contact';
import css from './ContactList.module.css';
import { useSelector } from 'react-redux';
import { selectFilteredContacts } from '../../redux/contacts/selectors';

export default function ContactList({ onEdit }) {
  const contacts = useSelector(selectFilteredContacts);

  return (
    <>
      <ul className={css.contact_list}>
        {contacts.map(contact => (
          <li key={contact.id}>
            <Contact contact={contact} onEdit={onEdit} />
          </li>
        ))}
      </ul>
    </>
  );
}
