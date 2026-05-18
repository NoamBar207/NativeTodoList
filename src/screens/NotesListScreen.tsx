import React, { useState, useCallback } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Note } from '../models/types';
import EmptyState from '../components/NotesList/EmptyState';
import NoteCard from '../components/NotesList/NoteCard';
import EditNoteModal from '../components/NotesList/EditNoteModal';
import DeleteNoteModal from '../components/NotesList/DeleteNoteModal';
import { useNotes } from '../hooks/useNotes';
import { useEditNote } from '../hooks/useEditNote';

export default function NotesListScreen() {
  const { notes, deleteNote } = useNotes();
  const editHook = useEditNote();

  const [refreshing, setRefreshing] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleDelete = (id: string) => {
    setNoteToDelete(id);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <View style={styles.container}>
        <FlatList
          data={notes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NoteCard
              item={item}
              onEdit={editHook.startEditing}
              onDelete={handleDelete}
            />
          )}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyState />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#3B82F6']}
              tintColor="#3B82F6"
              progressBackgroundColor="#1E293B"
            />
          }
        />
        <EditNoteModal
          visible={editHook.isEditModalVisible}
          editTitle={editHook.editTitle}
          editContent={editHook.editContent}
          editImageUri={editHook.editImageUri}
          isPicking={editHook.isPicking}
          onTitleChange={editHook.setEditTitle}
          onContentChange={editHook.setEditContent}
          onCancel={editHook.cancelEdit}
          onSave={editHook.saveEdit}
          onTakePhoto={editHook.handleTakePhoto}
          onSelectGallery={editHook.handleSelectGallery}
          onRemoveImage={editHook.handleRemoveImage}
        />
        <DeleteNoteModal
          visible={!!noteToDelete}
          onCancel={() => setNoteToDelete(null)}
          onConfirm={() => {
            if (noteToDelete) {
              deleteNote(noteToDelete);
            }
            setNoteToDelete(null);
          }}
        />
      </View>
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
  listContainer: {
    padding: 16,
    paddingBottom: 80,
    flexGrow: 1,
  },
});
