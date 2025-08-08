
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TaskListScreen from '../screens/TaskListScreen';
import AddTaskScreen from '../screens/AddTaskScreen';
import { ThemeContext } from '../contexts/ThemeContext';
import { StatusBar } from 'expo-status-bar';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const { theme, isDarkMode } = useContext(ThemeContext);

  return (
    <>
    <StatusBar style={'light'} />
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: theme.primary },
          headerTintColor: 'white',
          contentStyle: { backgroundColor: theme.background },
        }}
      >
        <Stack.Screen name="TaskList" component={TaskListScreen} options={{ title: 'Super ToDo' }} />
        <Stack.Screen name="AddTask" component={AddTaskScreen} options={{ title: 'Ajouter une Tâche' }} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
};

export default AppNavigator;
