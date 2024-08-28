import { useId } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import css from '../ContactForm/ContactForm.module.css';
import css from '../EditForm/EditForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateContact } from '../../redux/contacts/operations';
import toast from 'react-hot-toast';
// import { selectCurrentContact } from '../../redux/contacts/selectors';

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  number: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});

export default function EditForm({ contact: { id, name, number }, onClose }) {
  const dispatch = useDispatch();
  const fieldId = useId();

  const handleUpdate = (values, actions) => {
    const { name, number } = values;
    dispatch(updateContact({ id, name, number }))
      .unwrap()
      .then(() => {
        toast.success('Successfully updated!');
      })
      .catch(() => {
        toast.error("This didn't work.");
      });
    actions.resetForm();
    onClose();
  };
  //   console.log(name);
  //   console.log(number);

  return (
    <Formik
      initialValues={{
        name: name || '',
        number: number || '',
      }}
      onSubmit={handleUpdate}
      validationSchema={ContactSchema}
    >
      <Form className={css.form}>
        <div className={css.formContainer}>
          <label htmlFor={`${fieldId}-name`}>Name</label>
          <Field
            className={css.form_field}
            type="text"
            name="name"
            id={`${fieldId}-name`}
          />
          <ErrorMessage name="name" component="span" />
        </div>
        <div className={css.formContainer}>
          <label htmlFor={`${fieldId}-number`}>Number</label>
          <Field
            className={css.form_field}
            type="tel"
            name="number"
            id={`${fieldId}-number`}
          />
          <ErrorMessage name="number" component="span" />
        </div>
        <div className={css.button_container}>
          <button className={css.addCntBtn} type="submit">
            Save
          </button>
          <button className={css.addCntBtn} type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </Form>
    </Formik>
  );
}
