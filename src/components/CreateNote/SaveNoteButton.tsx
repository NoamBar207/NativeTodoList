import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface SaveNoteButtonProps {
  onPress: () => void;
  isDisabled: boolean;
  isSaving: boolean;
}

export default function SaveNoteButton({ onPress, isDisabled, isSaving }: SaveNoteButtonProps) {
  return (
    <TouchableOpacity 
      style={[styles.button, isDisabled && styles.buttonDisabled]} 
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      {isSaving ? (
        <ActivityIndicator color="#FFF" />
      ) : (
        <>
          <Icon name="location" size={20} color="#FFF" style={styles.buttonIcon} />
          <Text style={styles.buttonText}>Save with Location</Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    backgroundColor: '#3B82F6',
    marginHorizontal: '5%',
    marginBottom: '5%',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: '#1E293B',
    elevation: 0,
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: '600',
  },
});
