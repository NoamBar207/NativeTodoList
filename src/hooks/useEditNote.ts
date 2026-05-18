import { useState } from 'react';
import { Note } from '../models/types';
import { useNotes } from './useNotes';
import { useImagePicker } from './useImagePicker';
import Toast from 'react-native-toast-message';

export const useEditNote = () => {
  const { updateNote } = useNotes();
  const { takePhoto, selectFromGallery, isPicking } = useImagePicker();

  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editNoteId, setEditNoteId] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editImageUri, setEditImageUri] = useState<string | undefined>(undefined);

  const startEditing = (note: Note) => {
    setEditNoteId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
    setEditImageUri(note.imageUri);
    setIsEditModalVisible(true);
  };

  const saveEdit = () => {
    if (!editTitle.trim()) {
      Toast.show({
        type: 'error',
        text1: 'Wait a second!',
        text2: 'Please give your note a title before saving.',
      });
      return;
    }
    updateNote(editNoteId, editTitle.trim(), editContent.trim(), editImageUri);
    setIsEditModalVisible(false);
    Toast.show({
      type: 'success',
      text1: 'Note Updated',
      text2: 'Your note was successfully updated.',
    });
  };

  const cancelEdit = () => {
    setIsEditModalVisible(false);
  };

  const handleTakePhoto = async () => {
    const uri = await takePhoto();
    if (uri) setEditImageUri(uri);
  };

  const handleSelectGallery = async () => {
    const uri = await selectFromGallery();
    if (uri) setEditImageUri(uri);
  };

  const handleRemoveImage = () => {
    setEditImageUri(undefined);
  };

  return {
    isEditModalVisible,
    editTitle,
    editContent,
    editImageUri,
    setEditTitle,
    setEditContent,
    startEditing,
    saveEdit,
    cancelEdit,
    isPicking,
    handleTakePhoto,
    handleSelectGallery,
    handleRemoveImage,
  };
};
