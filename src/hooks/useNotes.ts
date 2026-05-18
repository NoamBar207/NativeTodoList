import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { addNote, updateNote, deleteNote, selectAllNotes } from '../store/notesSlice';
import { Note } from '../models/types';

export const useNotes = () => {
  const dispatch = useDispatch();
  const notes = useSelector(selectAllNotes);

  const handleAddNote = useCallback((note: Note) => {
    dispatch(addNote(note));
  }, [dispatch]);

  const handleUpdateNote = useCallback((id: string, title: string, content: string, imageUri?: string) => {
    dispatch(updateNote({ id, title, content, imageUri }));
  }, [dispatch]);

  const handleDeleteNote = useCallback((id: string) => {
    dispatch(deleteNote(id));
  }, [dispatch]);

  return {
    notes,
    addNote: handleAddNote,
    updateNote: handleUpdateNote,
    deleteNote: handleDeleteNote,
  };
};
