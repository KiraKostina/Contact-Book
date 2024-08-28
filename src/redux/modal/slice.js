import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    isModalOpen: false,
    deletedContactId: '',
  },
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.deletedContactId = action.payload;
    },
    closeModal: state => {
      state.isModalOpen = false;
      state.deletedContactId = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
