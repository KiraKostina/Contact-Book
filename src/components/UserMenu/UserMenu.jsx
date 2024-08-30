import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../redux/auth/selectors';
import { logOut } from '../../redux/auth/operations';
import css from './UserMenu.module.css';
import UserLogOutModal from '../UserLogoutModal/UserLogoutModal';
import { useState } from 'react';
import SettingModal from '../SettingModal/SettingModal';

export default function UserMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSetting = () => {
    setIsSettingOpen(!isSettingOpen);
  };
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleCloseSetting = () => {
    setIsSettingOpen(false);
  };

  return (
    <div className={css.wrapper}>
      <p className={css.username}>Welcome, {user.name}</p>
      <button type="button" onClick={handleSetting}>
        Settings
      </button>
      <button type="button" onClick={handleOpen}>
        Logout
      </button>
      <SettingModal isOpen={isSettingOpen} onClose={handleCloseSetting} />
      <UserLogOutModal isOpen={isOpen} onClose={handleClose} />
    </div>
  );
}
