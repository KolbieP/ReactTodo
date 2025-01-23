import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, ScrollView, TouchableOpacity } from 'react-native';

export default function App() {

  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const handleDeleteTodo = (id) => {
    console.log(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleSubmit = () => {
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo("");
  };

  const handleToggleCompleted = (id) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        } else {
          return todo;
        }
      })
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {todos.map((todo) => (
          <View style={styles.todoContainer} key={todo.id}>
            <TouchableOpacity onPress={() => handleToggleCompleted(todo.id)}>
              <Text style={[styles.todoText, todo.completed && styles.completedText]}>
                {todo.text}
              </Text>
            </TouchableOpacity>
            <Button
              onPress={() => handleDeleteTodo(todo.id)}
              title="Delete"
              color="#841584"
              accessibilityLabel="Delete todo item"
            />
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          value={newTodo}
          onChangeText={setNewTodo}
          placeholder="Add a new todo"
          style={styles.textInput}
        />
        <Button
          onPress={handleSubmit}
          title="Add Todo"
          color="#841584"
          accessibilityLabel="Submit a new Todo List item"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  scrollViewContent: {
    paddingBottom: 100, // Adjust this value based on the height of your inputContainer
  },
  todoText: {
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  todoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 20,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 20,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  textInput: {
    marginBottom: 10,
  },
});