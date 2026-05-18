import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface ImageAttachmentProps {
  imageUri?: string;
  isPicking?: boolean;
  onTakePhoto?: () => void;
  onSelectGallery?: () => void;
  onRemoveImage?: () => void;
}

export default function ImageAttachment({
  imageUri,
  isPicking,
  onTakePhoto,
  onSelectGallery,
  onRemoveImage
}: ImageAttachmentProps) {
  return (
    <>
      <View style={styles.imageActions}>
        <TouchableOpacity style={styles.actionButton} onPress={onTakePhoto} disabled={isPicking}>
          <Icon name="camera-outline" size={20} color="#3B82F6" />
          <Text style={styles.actionText}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={onSelectGallery} disabled={isPicking}>
          <Icon name="image-outline" size={20} color="#3B82F6" />
          <Text style={styles.actionText}>Gallery</Text>
        </TouchableOpacity>
        {isPicking && <ActivityIndicator size="small" color="#3B82F6" style={{ marginLeft: 8 }} />}
      </View>

      {imageUri && (
        <View style={styles.imagePreviewContainer}>
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
          <TouchableOpacity style={styles.removeImageButton} onPress={onRemoveImage}>
            <Icon name="close-circle" size={24} color="#EF4444" />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  imageActions: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  actionText: {
    color: '#3B82F6',
    marginLeft: 6,
    fontWeight: '600',
  },
  imagePreviewContainer: {
    position: 'relative',
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  imagePreview: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
    borderRadius: 12,
  },
});
