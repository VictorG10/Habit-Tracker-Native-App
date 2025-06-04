import { database, DATABASE_ID, HABITS_COLLECTION_ID } from "@/lib/appwrite";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { ID } from "react-native-appwrite";
import {
  Button,
  SegmentedButtons,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";

const FREQUENCIES = ["daily", "weekly", "monthly"];

type Frequency = (typeof FREQUENCIES)[number];

const AddHabitScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [frequency, setFrequency] = useState<Frequency>("daily");
  const [error, setError] = useState("");

  const { user } = useAuth();

  const router = useRouter();

  const theme = useTheme();

  const handleSubmit = async () => {
    if (!user) return;

    try {
      await database.createDocument(
        DATABASE_ID,
        HABITS_COLLECTION_ID,
        ID.unique(),
        {
          user_id: user.$id,
          title,
          description,
          frequency,
          streak_count: 0,
          last_completed: new Date().toISOString(),
          created_at: new Date().toISOString(),
        }
      );

      router.back();
      setTitle("");
      setDescription("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        return;
      }
      setError("There was an error creating the habit");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="title"
        mode="outlined"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        theme={{ colors: { primary: "#006400" } }}
      />
      <TextInput
        label="description"
        mode="outlined"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        theme={{ colors: { primary: "#006400" } }}
      />
      <View style={styles.frequencyContainer}>
        <SegmentedButtons
          value={frequency}
          onValueChange={(value) => setFrequency(value as Frequency)}
          buttons={FREQUENCIES.map((freq) => ({
            value: freq,
            label: freq.charAt(0).toUpperCase() + freq.slice(1),
            style: {
              backgroundColor: frequency === freq ? "#006400" : "#e0e0e0", // Active vs inactive background
            },
            labelStyle: {
              color: frequency === freq ? "#fff" : "#000", // Active vs inactive text
            },
          }))}
        />
      </View>
      <Button
        mode="contained"
        onPress={handleSubmit}
        disabled={!title || !description}
        buttonColor="green"
      >
        Add Habit
      </Button>
      {error && <Text style={{ color: theme.colors.error }}>{error}</Text>}
    </View>
  );
};

export default AddHabitScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  input: {
    marginBottom: 16,
    borderColor: "#006400",
  },
  frequencyContainer: {
    marginBottom: 24,
  },
});
