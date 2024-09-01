import Modal from '../Modal/Modal';

import css from './SettingModal.module.css';
import UserSettingsForm from '../UserSettingsForm/UserSettingsForm';

export default function SettingModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} contentLabel="Setting Modal">
      <div className={css.logout_modal_main_container}>
        {/* <div className={css.logout_modal_wrapper}> */}
        <h2 className={css.log_out_title}>Setting</h2>

        <UserSettingsForm onClose={onClose} />
        {/* </div> */}
      </div>
    </Modal>
  );
}
