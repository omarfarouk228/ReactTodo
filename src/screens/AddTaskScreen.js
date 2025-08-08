
import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { TaskContext } from '../contexts/TaskContext';
import { ThemeContext } from '../contexts/ThemeContext';

const AddTaskScreen = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const { addTask } = useContext(TaskContext);
  const { theme } = useContext(ThemeContext);

  const handleAddTask = () => {
    if (title) {
      addTask({ title });
      navigation.goBack();
    }
  };

  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Titre de la tâche"
        placeholderTextColor={theme.text}
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Ajouter" onPress={handleAddTask} color={theme.primary} />
    </View>
  );
};

const getStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    padding: 20,
  },
  input: {
    borderColor: theme.border,
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    fontSize: 18,
    color: theme.text,
    backgroundColor: theme.card,
  },
});

export default AddTaskScreen;
