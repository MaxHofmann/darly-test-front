import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchItems } from './asyncActions';
import { Comment, CommentSliceState, Status } from './types';

const initialState: CommentSliceState = {
  items: [],
  switchPopupForm: false,
  allItems: [],
  currentPage: 1,
  status: Status.LOADING,
};

export const itemSlice = createSlice({
  name: 'item',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Comment[]>) {
      state.items = action.payload;
    },
    setPopupForm(state, action: PayloadAction<boolean>) {
      state.switchPopupForm = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (boilder) => {
    boilder.addCase(fetchItems.pending, (state, action) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    boilder.addCase(fetchItems.fulfilled, (state, action) => {
      state.items = action.payload;
      state.allItems = [...state.allItems, ...action.payload];
      state.status = Status.SUCCESS;
    });
    boilder.addCase(fetchItems.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const { setItems, setPopupForm, setCurrentPage } = itemSlice.actions;

export default itemSlice.reducer;
