import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';
import { Note, NotesState, RootState } from '../models/types';

const initialState: NotesState = {
  notes: [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.unshift(action.payload); // add newest first
    },
    updateNote: (state, action: PayloadAction<{ id: string; title: string; content: string; imageUri?: string }>) => {
      const index = state.notes.findIndex(n => n.id === action.payload.id);
      if (index !== -1) {
        state.notes[index].title = action.payload.title;
        state.notes[index].content = action.payload.content;
        state.notes[index].imageUri = action.payload.imageUri;
      }
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter(note => note.id !== action.payload);
    },
  },
});

export const { addNote, updateNote, deleteNote } = notesSlice.actions;

const selectNotesState = (state: RootState) => state.notes;

export const selectAllNotes = createSelector(
  [selectNotesState],
  (notesState) => notesState.notes
);

export default notesSlice.reducer;
