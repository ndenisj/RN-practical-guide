import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Modal } from "react-native";

const GoalInput = props => {
	const [enteredGoal, setEnteredGoal] = useState("");
	const goalInputHandler = enteredText => {
		setEnteredGoal(enteredText);
	};
	const addGoalHandler = () => {
		props.onAddGoal(enteredGoal);
		setEnteredGoal("");
	};
	return (
		<Modal animationType='slide' visible={props.visible}>
			<View style={styles.inputContainer}>
				<TextInput
					placeholder='Goal'
					style={styles.input}
					onChangeText={goalInputHandler}
					value={enteredGoal}
				/>
				<View style={styles.btnPosition}>
					<View style={styles.btn}>
						<Button title='CANCEL' onPress={props.closeAddModal} color='red' />
					</View>
					<View style={styles.btn}>
						<Button title='ADD' onPress={addGoalHandler} />
					</View>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	btn: {
		width: "40%",
	},
	btnPosition: {
		flexDirection: "row",
		justifyContent: "space-evenly",
		width: "50%",
	},
	inputContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	input: {
		width: "80%",
		borderColor: "black",
		borderWidth: 1,
		padding: 10,
		marginBottom: 10,
	},
});

export default GoalInput;
