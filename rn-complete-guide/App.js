import React, { useState } from "react";
import { Alert, StyleSheet, Text, View, Button, FlatList } from "react-native";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

export default function App() {
	const [goals, setGoals] = useState([]);
	const [isAddMode, setIsAddMode] = useState(false);

	const addGoalHandler = enteredGoal => {
		if (enteredGoal.length === 0) {
			Alert.alert("Error", "Please add a goal");
			return;
		}

		setGoals(currentGoals => [
			...currentGoals,
			{ uid: Math.random().toString(), value: enteredGoal },
		]);

		setIsAddMode(false);
	};

	const removeGoalHandler = goalId => {
		setGoals(currentGoals => {
			return currentGoals.filter(goal => goal.uid !== goalId);
		});
	};

	const closeAddModal = () => {
		setIsAddMode(false);
	};

	return (
		<View style={styles.screen}>
			<Button title='ADD NEW GOAL' onPress={() => setIsAddMode(true)} />
			<GoalInput
				closeAddModal={closeAddModal}
				onAddGoal={addGoalHandler}
				visible={isAddMode}
			/>
			{goals.length > 0 ? (
				<FlatList
					keyExtractor={(item, index) => item.uid}
					data={goals}
					renderItem={itemData => (
						<GoalItem
							onDelete={removeGoalHandler}
							title={itemData.item.value}
							uid={itemData.item.uid}
						/>
					)}
				/>
			) : (
				<View style={styles.listItem}>
					<Text>No Goal Added Yet</Text>
				</View>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	screen: {
		padding: 30,
	},
	listItem: {
		padding: 10,
		backgroundColor: "#ccc",
		borderColor: "black",
		borderWidth: 1,
		marginVertical: 10,
	},
});
