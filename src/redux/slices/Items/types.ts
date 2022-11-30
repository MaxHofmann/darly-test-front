export type Comment = {
  firsName: string;
  lastName: string;
  themeName: string;
  age: number;
  comment: string;
  id: string;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface CommentSliceState {
  items: Comment[];
  switchPopupForm: boolean;
  allItems: Comment[];
  currentPage: number;
  status: Status;
}

export type SearchItemParams = {
  currentPage: string;
};
