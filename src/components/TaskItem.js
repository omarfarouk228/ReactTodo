
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';

const TaskItem = ({ task, onToggle, onEdit, onDelete }) => {
  const { theme } = useContext(ThemeContext);
  const styles = getStyles(theme);

  return (
    <View style={styles.taskItem}>
      <TouchableOpacity onPress={onToggle} style={{ flex: 1 }}>
        <Text style={[styles.taskTitle, task.completed && styles.completedTask]}>
          {task.title}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onEdit} style={styles.editButton}>
        <Text style={styles.editButtonText}>Modifier</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Supprimer</Text>
      </TouchableOpacity>
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  taskItem: {
    backgroundColor: theme.card,
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: theme.border,
  },
  taskTitle: {
    fontSize: 18,
    color: theme.text,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: 'grey',
  },
  editButton: {
    marginLeft: 10,
    padding: 5,
  },
  editButtonText: {
    color: theme.primary,
  },
  deleteButton: {
    marginLeft: 10,
    padding: 5,
  },
  deleteButtonText: {
    color: 'red',
  },
});

export default TaskItem;
