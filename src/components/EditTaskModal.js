import React, { useState, useEffect, useContext } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';

const EditTaskModal = ({ visible, task, onClose, onUpdate }) => {
  const [editedTitle, setEditedTitle] = useState('');
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (task) {
      setEditedTitle(task.title);
    }
  }, [task]);

  const handleUpdate = () => {
    if (editedTitle) {
      onUpdate({ ...task, title: editedTitle });
    }
  };

  const styles = getStyles(theme);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); onClose(); }}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalView}>
              <Text style={styles.modalTitle}>Modifier la tâche</Text>
              <TextInput
                style={styles.input}
                value={editedTitle}
                onChangeText={setEditedTitle}
              />
              <Button title="Mettre à jour" onPress={handleUpdate} color={theme.primary} />
              <View style={{ marginTop: 10 }}>
                <Button title="Annuler" onPress={onClose} color="grey" />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const getStyles = (theme) => StyleSheet.create({
 
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '80%',
    backgroundColor: theme.card,
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
    color: theme.text,
  },
  input: {
    width: '100%',
    borderColor: theme.border,
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    color: theme.text,
    backgroundColor: theme.background,
  },
});

export default EditTaskModal;