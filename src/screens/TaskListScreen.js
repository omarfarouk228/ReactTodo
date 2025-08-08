
import React, { useContext, useState, useLayoutEffect } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Button, Alert, Image } from 'react-native';
import { TaskContext } from '../contexts/TaskContext';
import { ThemeContext } from '../contexts/ThemeContext';
import TaskItem from '../components/TaskItem';
import EditTaskModal from '../components/EditTaskModal';
import LottieView from 'lottie-react-native';

const TaskListScreen = ({ navigation }) => {
  const { tasks, toggleTaskCompletion, deleteTask, updateTask } = useContext(TaskContext);
  const { theme, isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button 
            onPress={toggleTheme} 
            title={isDarkMode ? "☀️" : "🌙"} 
            color={theme.primary} 
        />
      ),
    });
  }, [navigation, isDarkMode, theme, toggleTheme]);

  const openEditModal = (task) => {
    setCurrentTask(task);
    setModalVisible(true);
  };

  const handleUpdateTask = (updatedTask) => {
    updateTask(updatedTask);
    setModalVisible(false);
    setCurrentTask(null);
  };

  const handleDeleteConfirmation = (taskId) => {
    Alert.alert(
      "Confirmer la suppression",
      "Êtes-vous sûr de vouloir supprimer cette tâche ?",
      [
        {
          text: "Annuler",
          style: "cancel"
        },
        { text: "Supprimer", onPress: () => deleteTask(taskId), style: 'destructive' }
      ],
      { cancelable: true }
    );
  };

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      {tasks.length === 0 ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', gap:10 }}>
        <View style={{ width: 200, height: 200 }}>
          <LottieView source={require('../../assets/no_history.json')} autoPlay loop style={{ width: "100%", height: "100%" }} />
        </View>
        <Text style={styles.noTasksText}>Aucune tâche pour le moment.</Text>
      </View> :
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={() => toggleTaskCompletion(item.id)}
            onEdit={() => openEditModal(item)}
            onDelete={() => handleDeleteConfirmation(item.id)}
          />
        )}
      />
    }
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddTask')}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>

      <EditTaskModal
        visible={modalVisible}
        task={currentTask}
        onClose={() => setModalVisible(false)}
        onUpdate={handleUpdateTask}
      />
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    padding: 10,
  },
  fab: {
    position: 'absolute',
    right: 30,
    bottom: 50,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  fabIcon: {
    fontSize: 24,
    color: 'white',
  },
  noTasksText: {
    fontSize: 18,
    color: theme.text,
  }
});

export default TaskListScreen;
