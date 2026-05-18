import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function EmptyState() {
  const { height } = useWindowDimensions();

  return (
    <View style={[styles.emptyContainer, { minHeight: height * 0.6 }]}>
      <Icon name="journal-outline" size={80} color="#334155" />
      <Text style={styles.emptyTitle}>No Notes Yet</Text>
      <Text style={styles.emptyText}>Your beautiful ideas will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F8FAFC',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 20,
    color: '#64748B',
    textAlign: 'center',
  },
});
