import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { logOut } from '../../redux/auth/operations';
import css from './UserMenu.module.css';
import UserLogOutModal from '../UserLogoutModal/UserLogoutModal';
import { useState } from 'react';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={css.wrapper}>
      <p className={css.username}>Welcome, {user.name}</p>
      <button type="button" onClick={handleOpen}>
        Settings
      </button>
      <button type="button" onClick={handleOpen}>
        Logout
      </button>
      <UserLogOutModal isOpen={isOpen} onClose={handleClose} />
    </div>
  );
}
