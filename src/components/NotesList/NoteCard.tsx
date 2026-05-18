import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Note } from '../../models/types';

interface NoteCardProps {
  item: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export default function NoteCard({ item, onEdit, onDelete }: NoteCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton} onPress={() => onEdit(item)}>
            <Icon name="create-outline" size={20} color="#3B82F6" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => onDelete(item.id)}>
            <Icon name="trash-outline" size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>

      {item.imageUri ? (
        <Image source={{ uri: item.imageUri }} style={styles.cardImage} />
      ) : null}
      
      {item.content ? <Text style={styles.content} numberOfLines={3}>{item.content}</Text> : null}
      
      <View style={styles.footer}>
        <View style={styles.footerItem}>
          <Icon name="time-outline" size={14} color="#94A3B8" />
          <Text style={styles.footerText}>
            {new Date(item.timestamp).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}
          </Text>
        </View>
        {item.location && (
          <View style={styles.footerItem}>
            <Icon name="location-outline" size={14} color="#94A3B8" />
            <Text style={styles.footerText}>
              {item.location.latitude.toFixed(3)}, {item.location.longitude.toFixed(3)}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#F8FAFC',
    flex: 1,
    marginRight: 12,
  },
  iconButton: {
    padding: 8,
    backgroundColor: '#0F172A',
    borderRadius: 12,
    marginLeft: 8,
  },
  content: {
    fontSize: 18,
    color: '#CBD5E1',
    lineHeight: 26,
    marginBottom: 16,
  },
  cardImage: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    marginBottom: 16,
    resizeMode: 'cover',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingTop: 12,
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#94A3B8',
    marginLeft: 6,
  },
});
