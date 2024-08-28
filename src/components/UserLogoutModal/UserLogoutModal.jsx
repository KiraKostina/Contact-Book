import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/auth/operations.js';
import Modal from '../Modal/Modal';

import css from './UserLogoutModal.module.css';

export default function UserLogOutModal({ isOpen, onClose }) {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
    onClose();
  };

  return (
    <div className={css.logout_modal_container}>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        shouldCloseOnEsc={true}
        contentLabel="LogOut Modal"
      >
        <h3>Log out</h3>
        <p> Do you really want to leave?</p>
        <div className={css.button_container}>
          <button className={css.yes_btn} onClick={handleLogOut}>
            Log out
          </button>

          <button className={css.no_btn} onClick={onClose}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}
