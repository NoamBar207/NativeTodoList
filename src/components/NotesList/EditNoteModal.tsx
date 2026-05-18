import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import Toast from 'react-native-toast-message';
import ImageAttachment from '../Shared/ImageAttachment';

interface EditNoteModalProps {
  visible: boolean;
  editTitle: string;
  editContent: string;
  editImageUri?: string;
  isPicking?: boolean;
  onTitleChange: (text: string) => void;
  onContentChange: (text: string) => void;
  onCancel: () => void;
  onSave: () => void;
  onTakePhoto?: () => void;
  onSelectGallery?: () => void;
  onRemoveImage?: () => void;
}

export default function EditNoteModal({
  visible,
  editTitle,
  editContent,
  editImageUri,
  isPicking,
  onTitleChange,
  onContentChange,
  onCancel,
  onSave,
  onTakePhoto,
  onSelectGallery,
  onRemoveImage
}: EditNoteModalProps) {
  const [isTitleTouched, setIsTitleTouched] = React.useState(false);

  React.useEffect(() => {
    if (!visible) {
      setIsTitleTouched(false);
    }
  }, [visible]);

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <KeyboardAvoidingView style={styles.modalOverlay} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeader}>Edit Note</Text>
          <TextInput
            style={[styles.modalTitleInput, isTitleTouched && !editTitle.trim() && styles.modalTitleInputRequired]}
            value={editTitle}
            onChangeText={onTitleChange}
            onBlur={() => setIsTitleTouched(true)}
            placeholder="Note Title *"
            placeholderTextColor={isTitleTouched && !editTitle.trim() ? "#EF4444" : "#64748B"}
            maxLength={60}
          />

          <TextInput
            style={styles.modalContentInput}
            value={editContent}
            onChangeText={onContentChange}
            placeholder="Start typing your note..."
            placeholderTextColor="#64748B"
            multiline
            textAlignVertical="top"
          />

          <ImageAttachment 
            imageUri={editImageUri}
            isPicking={isPicking}
            onTakePhoto={onTakePhoto}
            onSelectGallery={onSelectGallery}
            onRemoveImage={onRemoveImage}
          />

          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.modalButtonCancel} onPress={onCancel}>
              <Text style={styles.modalButtonTextCancel}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButtonSave} onPress={() => {
              if (!editTitle.trim()) {
                setIsTitleTouched(true);
              }
              onSave();
            }}>
              <Text style={styles.modalButtonTextSave}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      <Toast />
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 20,
  },
  modalTitleInput: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F8FAFC',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    paddingBottom: 8,
    marginBottom: 8,
  },
  modalTitleInputRequired: {
    borderBottomColor: '#EF4444',
  },
  modalContentInput: {
    fontSize: 18,
    color: '#CBD5E1',
    lineHeight: 28,
    minHeight: 120,
    maxHeight: 200,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalButtonCancel: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 12,
  },
  modalButtonSave: {
    backgroundColor: '#3B82F6',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  modalButtonTextCancel: {
    color: '#94A3B8',
    fontSize: 18,
    fontWeight: '600',
  },
  modalButtonTextSave: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});
