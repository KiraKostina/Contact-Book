import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations';
import {
  selectDeletedContactId,
  selectIsModalOpen,
} from '../../redux/modal/selectors';
import { closeModal } from '../../redux/modal/slice';
import toast from 'react-hot-toast';
import css from './ConfirmModal.module.css';

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    background: '#000000cd',
  },
};

Modal.setAppElement('#root');

export default function ConfirmModal() {
  const isModalOpen = useSelector(selectIsModalOpen);
  const deletedContactId = useSelector(selectDeletedContactId);

  const dispatch = useDispatch();

  const handleConfirm = () => {
    dispatch(deleteContact(deletedContactId))
      .unwrap()
      .then(() => {
        toast.success('Successfully deleted!');
      })
      .catch(() => {
        toast.error("This didn't work.");
      });
    dispatch(closeModal());
  };

  const handleClose = () => dispatch(closeModal());

  return (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={handleClose}
      style={customStyles}
      contentLabel="Confirm Modal"
    >
      <p>Do you really want to delete this contact?</p>
      <div className={css.button_container}>
        <button className={css.yes_btn} onClick={handleConfirm}>
          Yes
        </button>
        <button className={css.no_btn} onClick={handleClose}>
          No
        </button>
      </div>
    </Modal>
  );
}
