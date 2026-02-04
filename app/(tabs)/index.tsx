import { createHomeStyles } from "@/assets/styles/home.styles";
import EmptyState from "@/components/EmptyState";
import Header from "@/components/Header";
import LoadingSpinner from "@/components/LoadingSpinner";
import TodoInput from "@/components/TodoInput";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Alert,
  FlatList,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Todo = Doc<"todos">;

export default function Index() {
  const { colors } = useTheme();

  const [editedTodoId, setEditedTodoId] = useState<Id<"todos"> | null>(null);
  const [editedTodoText, setEditedTodoText] = useState("");

  const homeStyles = createHomeStyles(colors);

  const todos = useQuery(api.todos.getTodos);
  const toggleTodo = useMutation(api.todos.toggleTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);
  const updateTodo = useMutation(api.todos.updateTodo);

  const isLoading = todos === undefined;

  if (isLoading) return <LoadingSpinner />;

  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodo({ id });
    } catch (error) {
      Alert.alert("Error", "Failed to toggle todo");
      console.log(error);
    }
  };

  const handleDeleteTodo = async (id: Id<"todos">) => {
    Alert.alert(
      "Delete",
      "Are you sure you want to delete this todo?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              await deleteTodo({ id });
            } catch (error) {
              Alert.alert("Error", "Failed to delete todo");
              console.log(error);
            }
          },
        },
      ],
      {
        cancelable: true,
      },
    );
  };

  const handleEditTodo = (todo: Todo) => {
    setEditedTodoText(todo.text);
    setEditedTodoId(todo._id);
  };

  const handleSaveEdit = async () => {
    if(editedTodoId) {
    try {
      await updateTodo({id:editedTodoId, text:editedTodoText.trim()})
      setEditedTodoId(null);
      setEditedTodoText("");
    } catch (error) {
      Alert.alert("Error", "Failed to update todo");
      console.log(error);
    }
  }
}

  const handleCancel = () => {
    setEditedTodoId(null);
    setEditedTodoText("");
  }

  const renderTodoItem = ({ item }: { item: Todo }) => {
    const isEditing = editedTodoId === item._id;
    return (
      <View style={homeStyles.todoItemWrapper}>
        <LinearGradient
          colors={colors.gradients.surface}
          style={homeStyles.todoItem}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <TouchableOpacity
            style={homeStyles.checkbox}
            activeOpacity={0.7}
            onPress={() => handleToggleTodo(item._id)}
          >
            <LinearGradient
              colors={item.isCompleted ? colors.gradients.success : colors.gradients.empty}
              style={[
                homeStyles.checkboxInner,
                {
                  borderColor: item.isCompleted ? "transparent" : colors.border,
                },
              ]}
            >
              {item.isCompleted && (
                <Ionicons name="checkmark" size={24} color="#fff" />
              )}
            </LinearGradient>
          </TouchableOpacity>
          
          {isEditing ? (
            <View style={homeStyles.editContainer}>
              <TextInput
              style={homeStyles.editInput}
                value={editedTodoText}
                onChangeText={setEditedTodoText}
                autoFocus
                multiline
                placeholder="Edit todo..."
                placeholderTextColor={colors.textMuted}
              />
              <View style={homeStyles.editButtons}>
                <TouchableOpacity onPress={handleSaveEdit} activeOpacity={0.8}>
                  <LinearGradient
                    colors={colors.gradients.success}
                    style={homeStyles.editButton}
                  >
                    <Ionicons name="checkmark" size={24} color="#fff" />
                    <Text style={homeStyles.editButtonText}>Save</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCancel} activeOpacity={0.8}>
                  <LinearGradient
                    colors={colors.gradients.danger}
                    style={homeStyles.editButton}
                  >
                    <Ionicons name="close" size={24} color="#fff" />
                    <Text style={homeStyles.editButtonText}>Cancel</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <View style={homeStyles.todoTextContainer}>
            <Text
              style={[
                homeStyles.todoText,
                item.isCompleted && {
                  textDecorationLine: "line-through",
                  color: colors.textMuted,
                  opacity: 0.8,
                },
              ]}
            >
              {item.text}
            </Text>

            <View style={homeStyles.todoActions}>
              <TouchableOpacity
                onPress={() => handleEditTodo(item)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={colors.gradients.warning}
                  style={homeStyles.actionButton}
                >
                  <Ionicons name="pencil" size={24} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleDeleteTodo(item._id)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={colors.gradients.danger}
                  style={homeStyles.actionButton}
                >
                  <Ionicons name="trash" size={24} color="#fff" />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          )}
        </LinearGradient>
      </View>
    );
  };

  return (
    <LinearGradient
      colors={colors.gradients.background}
      style={homeStyles.container}
    >
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={homeStyles.container}>
        <Header />
        <TodoInput />

        <FlatList
          data={todos}
          renderItem={renderTodoItem}
          keyExtractor={(item) => item._id}
          style={homeStyles.todoList}
          contentContainerStyle={homeStyles.todoListContent}
          ListEmptyComponent={<EmptyState />}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}
