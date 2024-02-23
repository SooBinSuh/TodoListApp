import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import Todo from '../@types/Todo';

//Action Type
const initialState: Todo[] = [
  {
    id: 140,
    content: 'test',
    update_at: '2024-02-22T05:18:51.066388Z',
    create_at: '2023-06-16T04:13:02.864088Z',
    isComplete: false,
  } as Todo,
];

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    toggleCompleteById: (state, action: PayloadAction<number>) => {
      const index = state.findIndex(i => i.id == action.payload);
      state[index].isComplete = !state[index].isComplete;
    },
  },
});

export const {toggleCompleteById} = todoSlice.actions;
export default todoSlice.reducer;
