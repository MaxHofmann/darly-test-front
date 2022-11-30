import axios from 'axios';

import { createAsyncThunk } from '@reduxjs/toolkit';
import { Comment, SearchItemParams } from './types';

export const fetchItems = createAsyncThunk<Comment[], SearchItemParams>(
  'item/fetchItemsStatus',
  async (params) => {
    const { currentPage } = params;

    const { data } = await axios.get(
      `https://63837db41ada9475c80134c2.mockapi.io/comments?page=${currentPage}&limit=15`,
    );
    return data;
  },
);
