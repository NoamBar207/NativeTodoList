import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { Controller } from 'react-hook-form';
import ImageAttachment from '../Shared/ImageAttachment';

interface CreateNoteFormProps {
  control: any;
  errors: any;
  imageUri?: string;
  isPicking?: boolean;
  onTakePhoto?: () => void;
  onSelectGallery?: () => void;
  onRemoveImage?: () => void;
}

export default function CreateNoteForm({ 
  control, 
  errors, 
  imageUri, 
  isPicking, 
  onTakePhoto, 
  onSelectGallery, 
  onRemoveImage 
}: CreateNoteFormProps) {
  return (
    <View style={styles.form}>
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, onBlur, value } }) => (
          <View>
            <TextInput
              style={[styles.titleInput, errors.title && styles.titleInputRequired]}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Note Title *"
              placeholderTextColor={errors.title ? "#EF4444" : "#64748B"}
              maxLength={60}
            />
            {errors.title && (
              <Text style={styles.errorText}>{errors.title.message as string}</Text>
            )}
          </View>
        )}
      />

      <Controller
        control={control}
        name="content"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.contentInput}
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            placeholder="Start typing your note..."
            placeholderTextColor="#64748B"
            multiline
            textAlignVertical="top"
          />
        )}
      />

      <ImageAttachment 
        imageUri={imageUri}
        isPicking={isPicking}
        onTakePhoto={onTakePhoto}
        onSelectGallery={onSelectGallery}
        onRemoveImage={onRemoveImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 20,
  },
  titleInput: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    paddingBottom: 8,
    marginBottom: 4,
  },
  titleInputRequired: {
    borderBottomColor: '#EF4444',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    marginBottom: 12,
  },
  contentInput: {
    flex: 1,
    fontSize: 22,
    color: '#CBD5E1',
    lineHeight: 32,
    marginTop: 16,
  },
});
