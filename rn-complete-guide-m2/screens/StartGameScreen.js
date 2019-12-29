import React, { useState } from "react";
import {
	View,
	StyleSheet,
	Text,
	Button,
	TouchableWithoutFeedback,
	Keyboard,
	Alert,
} from "react-native";
import Card from "../components/Card";
import colors from "../constants/colors";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

const StartGameScreen = props => {
	const [enteredValue, setEnteredValue] = useState("");
	const [confirmed, setConfirmed] = useState(false);
	const [selectedNumber, setSelectedNumber] = useState();

	const numberInputHandler = inputText => {
		setEnteredValue(inputText.replace(/[^0-9]/g, ""));
	};
	const resetInputHandler = () => {
		setEnteredValue("");
		setConfirmed(false);
	};
	const confirmInputHandler = () => {
		const chosenNumber = parseInt(enteredValue);
		if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
			Alert.alert("Invalid Number", "Number has to be between 1 and 99.", [
				{
					text: "Okay",
					style: "destructive",
					onPress: resetInputHandler,
				},
			]);
			return;
		}
		setConfirmed(true);
		setSelectedNumber(chosenNumber);
		setEnteredValue("");
		Keyboard.dismiss();
	};

	let confirmedOutput;

	if (confirmed) {
		confirmedOutput = (
			<Card style={styles.summaryContainer}>
				<Text>You Selected</Text>
				<NumberContainer>{selectedNumber}</NumberContainer>

				<MainButton onPress={() => props.onStartGame(selectedNumber)}>
					START GAME
				</MainButton>
			</Card>
		);
	}

	return (
		<TouchableWithoutFeedback
			onPress={() => {
				Keyboard.dismiss();
			}}>
			<View style={styles.screen}>
				<TitleText style={styles.title}>Start a new game!</TitleText>
				<Card style={styles.inputContainer}>
					<BodyText style={{ fontSize: 18 }}>Select a Number</BodyText>
					<Input
						onChangeText={numberInputHandler}
						value={enteredValue}
						blurOnSubmit
						autoCapitalize='none'
						autoCorrect={false}
						keyboardType='number-pad'
						maxLength={2}
						style={styles.input}
					/>
					<View style={styles.btnContainer}>
						<View style={styles.btn}>
							<MainButton style={styles.btnReset} onPress={resetInputHandler}>
								RESET
							</MainButton>
						</View>
						<View style={styles.btn}>
							<MainButton
								style={styles.btnConfirm}
								onPress={confirmInputHandler}>
								CONFIRM
							</MainButton>
						</View>
					</View>
				</Card>
				{confirmedOutput}
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	btnReset: { backgroundColor: colors.accent, paddingHorizontal: 25 },
	btnConfirm: { backgroundColor: colors.primary, paddingHorizontal: 25 },
	input: {
		width: 80,
		textAlign: "center",
	},
	btn: {
		// width: "40%",
	},
	title: {
		fontSize: 20,
		marginVertical: 10,
	},
	inputContainer: {
		width: "80%",
		// maxWidth: "80%",
		minWidth: 300,
		alignItems: "center",
	},
	btnContainer: {
		flexDirection: "row",
		width: "100%",
		maxWidth: "95%",
		justifyContent: "space-between",
		// paddingHorizontal: 15,
	},
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center", // cross axis alignment
		justifyContent: "flex-start", // main axis alignment (not needed=DEFAULT)
	},
	summaryContainer: {
		marginTop: 30,
		alignItems: "center",
	},
});

export default StartGameScreen;
