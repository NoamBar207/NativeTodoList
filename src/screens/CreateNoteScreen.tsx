import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Note, NavigationProp } from '../models/types';
import CreateNoteForm from '../components/CreateNote/CreateNoteForm';
import SaveNoteButton from '../components/CreateNote/SaveNoteButton';
import { useLocation } from '../hooks/useLocation';
import { useNotes } from '../hooks/useNotes';
import { useImagePicker } from '../hooks/useImagePicker';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Toast from 'react-native-toast-message';

const noteSchema = z.object({
  title: z.string().min(1, 'Title is required').max(60, 'Title is too long'),
  content: z.string().optional(),
  imageUri: z.string().optional(),
});

type NoteFormData = z.infer<typeof noteSchema>;

export default function CreateNoteScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { addNote } = useNotes();
  const { getCurrentLocation, isLocating } = useLocation();
  const { takePhoto, selectFromGallery, isPicking } = useImagePicker();

  const { control, handleSubmit, reset, setValue, watch, formState: { errors, isValid } } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),
    defaultValues: { title: '', content: '', imageUri: undefined },
    mode: 'onChange',
  });

  const imageUri = watch('imageUri');

  const handleTakePhoto = async () => {
    const uri = await takePhoto();
    if (uri) setValue('imageUri', uri, { shouldValidate: true, shouldDirty: true });
  };

  const handleSelectGallery = async () => {
    const uri = await selectFromGallery();
    if (uri) setValue('imageUri', uri, { shouldValidate: true, shouldDirty: true });
  };

  const handleRemoveImage = () => {
    setValue('imageUri', undefined, { shouldValidate: true, shouldDirty: true });
  };

  const onSubmit = async (data: NoteFormData) => {
    const location = await getCurrentLocation();

    if (!location) {
      return;
    }

    const newNote: Note = {
      id: Date.now().toString(),
      title: data.title.trim(),
      content: data.content ? data.content.trim() : '',
      timestamp: new Date().toISOString(),
      location,
      imageUri: data.imageUri,
    };

    try {
      addNote(newNote);
      reset();
      Toast.show({
        type: 'success',
        text1: 'Note Saved',
        text2: 'Your note was successfully saved.',
      });
      navigation.navigate('Notes List');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Save Failed',
        text2: 'An error occurred while saving your note.',
      });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <CreateNoteForm 
          control={control} 
          errors={errors}
          imageUri={imageUri}
          isPicking={isPicking}
          onTakePhoto={handleTakePhoto}
          onSelectGallery={handleSelectGallery}
          onRemoveImage={handleRemoveImage}
        />

        <SaveNoteButton
          onPress={handleSubmit(onSubmit)}
          isDisabled={!isValid || isLocating}
          isSaving={isLocating}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  container: {
    flex: 1,
  },
});
