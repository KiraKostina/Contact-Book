import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useId, useState } from 'react';
import * as Yup from 'yup';
import { HiArrowUpTray } from 'react-icons/hi2';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { HiOutlineEye } from 'react-icons/hi2';
import { HiOutlineEyeOff } from 'react-icons/hi';
import { updateUser, uploadPhoto } from '../../redux/auth/operations';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import css from './UserSettingsForm.module.css';

const validationSchema = Yup.object({
  name: Yup.string(),
  // .required('Name is required'),
  email: Yup.string().email('Invalid email address'),
  // .required('Email is required'),
  outdatedPassword: Yup.string(),
  // .required('Outdated password is required'),
  newPassword: Yup.string(),
  // .required('New password is required'),
  repeatNewPassword: Yup.string().oneOf(
    [Yup.ref('newPassword'), null],
    'Passwords must match'
  ),
  // .required('Please confirm your new password'),
});

export default function UserSettingsForm({ user, onClose }) {
  const [showOutdatedpassword, setShowOutdatedpassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showRepeatNewPassword, setShowRepeatNewPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const dispatch = useDispatch();
  const fieldId = useId();

  const initialValues = {
    gender: user?.gender || 'woman',
    name: user?.name || '',
    email: user?.email || '',
    outdatedPassword: '',
    newPassword: '',
    repeatNewPassword: '',
  };

  const handleFileChange = async event => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPhotoPreview(URL.createObjectURL(file));
      await handleUploadPhoto(file);
    }
  };

  const handleButtonClick = () => {
    document.getElementById('fileInput').click();
  };

  const handleUploadPhoto = async file => {
    if (!file) return;

    const formData = new FormData();
    formData.append('photo', file);

    dispatch(uploadPhoto(formData))
      .unwrap()
      .then(() => {
        toast.success('Photo uploaded successfully!');
      })
      .catch(() => {
        toast.error('Error uploading photo.');
      });
  };

  const handleUpdate = (values, { setSubmitting }) => {
    console.log('Form values:', values);
    const { gender, name, email, outdatedPassword, newPassword } = values;

    dispatch(
      updateUser({
        photo: selectedFile,
        gender,
        name,
        email,
        outdatedPassword,
        newPassword,
      })
    )
      .unwrap()
      .then(() => {
        // console.log('Update result:', result);
        toast.success('Profile updated successfully!');
        onClose();
      })
      .catch(() => {
        // console.error('Error updating profile:', error);
        toast.error('Error updating profile.');
        // console.log('Error result:');
      })
      .finally(() => {
        setSubmitting(false);
        // actions.resetForm();
      });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleUpdate}
      >
        {({ isSubmitting }) => (
          <Form>
            <h3 className={css.photoTitle}>Your photo</h3>
            <div className={css.uploadPhotoWrapper}>
              <div className={css.photoUrlWrapper}>
                {photoPreview ? (
                  <img
                    className={css.photoUrl}
                    // style={{
                    //   width: '80px',
                    //   height: '80px',
                    //   objectFit: 'cover',
                    // }}
                    src={photoPreview}
                    alt="User Photo"
                  />
                ) : (
                  <HiOutlineUserCircle className={css.photoUrl} />
                )}
              </div>
              {/* <img
              src={user?.photo || 'placeholder.jpg'}
              alt="User Photo"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            /> */}
              <div className={css.uploadPhotoButtonWrapper}>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <HiArrowUpTray className={css.uploadPhotoButtonIcon} />
                <button
                  className={css.uploadPhotoButton}
                  type="button"
                  onClick={handleButtonClick}
                >
                  Upload a photo
                </button>
              </div>
            </div>

            <div className={css.genderPart}>
              <p className={css.genderTitle}>Your gender identity</p>
              <div
                className={css.genderInputsContainer}
                role="group"
                aria-labelledby="gender"
              >
                <label>
                  <Field
                    className={css.genderText}
                    type="radio"
                    name="gender"
                    value="woman"
                  />
                  Woman
                </label>
                <label>
                  <Field type="radio" name="gender" value="man" />
                  Man
                </label>
              </div>
            </div>

            <div className={css.namePart}>
              <label className={css.nameTitle} htmlFor={`${fieldId}-name`}>
                Your name
              </label>
              <Field
                className={css.user_info_input}
                type="text"
                name="name"
                id={`${fieldId}-name`}
                placeholder="Enter your name"
              />
              <ErrorMessage name="name" component="div" className="error" />
            </div>

            <div className={css.emailPart}>
              <label className={css.emailTitle} htmlFor={`${fieldId}-email`}>
                E-mail
              </label>
              <Field
                className={css.user_info_input}
                type="email"
                name="email"
                id={`${fieldId}-email`}
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className={css.passwordPart}>
              <p className={css.passwordTitle}>Password</p>
              <div>
                <label htmlFor={`${fieldId}-outdatedPassword`}>
                  Outdated password:
                  <div className={css.password_form_input_wrapper}>
                    <Field
                      className={css.user_info_input}
                      type={showOutdatedpassword ? 'text' : 'password'}
                      name="outdatedPassword"
                      id={`${fieldId}-outdatedPassword`}
                      placeholder="Password"
                    />
                    <button
                      className={css.user_form_input_button}
                      type="button"
                      onClick={() =>
                        setShowOutdatedpassword(!showOutdatedpassword)
                      }
                    >
                      {showOutdatedpassword ? (
                        <HiOutlineEye className={css.user_form_input_icon} />
                      ) : (
                        <HiOutlineEyeOff className={css.user_form_input_icon} />
                      )}
                    </button>
                  </div>
                </label>
                <ErrorMessage
                  name="outdatedPassword"
                  component="div"
                  className="error"
                />
              </div>

              <div>
                <label htmlFor={`${fieldId}-newPassword`}>
                  New Password:
                  <div className={css.password_form_input_wrapper}>
                    <Field
                      className={css.user_info_input}
                      type={showNewPassword ? 'text' : 'password'}
                      name="newPassword"
                      id={`${fieldId}-newPassword`}
                      placeholder="Password"
                    />
                    <button
                      className={css.user_form_input_button}
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <HiOutlineEye className={css.user_form_input_icon} />
                      ) : (
                        <HiOutlineEyeOff className={css.user_form_input_icon} />
                      )}
                    </button>
                  </div>
                </label>
                <ErrorMessage
                  name="newPassword"
                  component="div"
                  className="error"
                />
              </div>

              <div>
                <label htmlFor={`${fieldId}-repeatNewPassword`}>
                  Repeat New Password:
                  <div className={css.password_form_input_wrapper}>
                    <Field
                      className={css.user_info_input}
                      type={showRepeatNewPassword ? 'text' : 'password'}
                      name="repeatNewPassword"
                      id={`${fieldId}-repeatNewPassword`}
                      placeholder="Password"
                    />
                    <button
                      className={css.user_form_input_button}
                      type="button"
                      onClick={() =>
                        setShowRepeatNewPassword(!showRepeatNewPassword)
                      }
                    >
                      {showRepeatNewPassword ? (
                        <HiOutlineEye className={css.user_form_input_icon} />
                      ) : (
                        <HiOutlineEyeOff className={css.user_form_input_icon} />
                      )}
                    </button>
                  </div>
                </label>
                <ErrorMessage
                  name="repeatNewPassword"
                  component="div"
                  className="error"
                />
              </div>
            </div>

            <button
              className={css.save_form_submit_btn}
              type="submit"
              disabled={isSubmitting}
            >
              Save
            </button>
          </Form>
        )}
      </Formik>
      <div>
        <Toaster />
      </div>
    </>
  );
}

//// Operations для проекта обновление данных юзера
//PATCH @ /user/:userId
// export const updateUser = createAsyncThunk(
//   'user/updateUser',
//   async ({ id, photo, gender, name, email, password }, thunkAPI) => {
//     try {
//       const response = await axios.patch(
//         `/user/${id}`,
//         {
//           photo,
//           gender,
//           name,
//           email,
//           password,
//         },
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         }
//       );
//       return response.data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.message);
//     }
//   }
// );

// export const uploadUserPhoto = createAsyncThunk(
//   'user/uploadPhoto',
//   async (formData, thunkAPI) => {
//     try {
//       const response = await axios.patch('/user/avatar', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       toast.success('Photo uploaded successfully!');
//       return response.data;
//     } catch (error) {
//       toast.error('Error uploading photo.');
//       return thunkAPI.rejectWithValue(error.response.data || error.message);
//     }
//   }
// );

// AUTH abo USER SLICE.js

// import {
//   register,
//   logIn,
//   logOut,
//   refreshUser,
//   updateUser,
//   uploadUserPhoto,
// } from './operations';

// .addCase(updateUser.pending, state => {
//         state.isLoading = true; // handlePending
//       })
//       .addCase(updateUser.fulfilled, (state, action) => {
// state.isLoading = false;
// state.user = action.payload;
//state.user = { ...state.user, ...payload };
//       })
//       .addCase(updateUser.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.payload; //handleRejected
//       })
//            .addCase(uploadUserPhoto.pending, state => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(uploadUserPhoto.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user.photo = action.payload.photo;
//       })
//       .addCase(uploadUserPhoto.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });

// try {
//   const response = await fetch('http://localhost:3000/update-user', {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(values),
//   });

//   if (response.ok) {
//     alert('Profile updated successfully!');
//     onClose(); // Закрываем модалку после успешного обновления
//   } else {
//     const errorData = await response.json();
//     alert(`Error: ${errorData.message}`);
//   }
// } catch (error) {
//   console.error('Error updating profile:', error);
//   alert('Error updating profile.');
// } finally {
//   setSubmitting(false);
// }

// {
/* <label>
              <Field type="radio" name="gender" value="other" />
              Other
            </label> */
// }

// .test(
//   'at-least-one-field',
//   'At least one field must be filled out',
//   function (value = {}) {
//     const {
//       name,
//       email,
//       outdatedPassword,
//       newPassword,
//       repeatNewPassword,
//     } = value;
//     return (
//       !!name ||
//       !!email ||
//       !!outdatedPassword ||
//       !!newPassword ||
//       !!repeatNewPassword
//     );
//   }
// ),

// все fetch запросы перенести в редакс операции
// try {
//   const response = await fetch('http://localhost:3000/user/avatar', {
//     method: 'POST',
//     body: formData,
//   });

// алерты переделать на тостеры

//     if (response.ok) {
//       alert('Photo uploaded successfully!');
//     } else {
//       alert('Failed to upload photo.');
//     }
//   } catch (error) {
//     console.error('Error uploading photo:', error);
//     alert('Error uploading photo.');
//   }
