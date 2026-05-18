import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';

interface DeleteNoteModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteNoteModal({
  visible,
  onCancel,
  onConfirm,
}: DeleteNoteModalProps) {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalHeader}>Discard Note?</Text>
          <Text style={styles.modalText}>
            Are you sure you want to permanently delete this note? This action cannot be undone.
          </Text>

          <View style={styles.modalActions}>
            <TouchableOpacity style={styles.modalButtonCancel} onPress={onCancel}>
              <Text style={styles.modalButtonTextCancel}>Keep</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButtonDelete} onPress={onConfirm}>
              <Text style={styles.modalButtonTextDelete}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    color: '#CBD5E1',
    lineHeight: 24,
    marginBottom: 24,
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
  modalButtonDelete: {
    backgroundColor: '#EF4444',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  modalButtonTextCancel: {
    color: '#94A3B8',
    fontSize: 16,
    fontWeight: '600',
  },
  modalButtonTextDelete: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
