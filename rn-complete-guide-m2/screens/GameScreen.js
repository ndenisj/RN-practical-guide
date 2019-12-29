import React, { useState, useRef, useEffect } from "react";
import {
	View,
	StyleSheet,
	Text,
	Alert,
	FlatList,
	Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import DefaultStyles from "../constants/default-styles";
import MainButton from "../components/MainButton";
import BodyText from "../components/BodyText";
import colors from "../constants/colors";

const generateRandomBetween = (min, max, exclude) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	const rndNum = Math.floor(Math.random() * (max - min)) + min;
	if (rndNum === exclude) {
		return generateRandomBetween(min, max, exclude);
	} else {
		return rndNum;
	}
};

const renderListItem = (listLength, itemData) => (
	<View style={styles.listItem}>
		<BodyText>#{listLength - itemData.index}</BodyText>
		<BodyText>{itemData.item}</BodyText>
	</View>
);

const GameScreen = props => {
	const initialGuess = generateRandomBetween(1, 100, props.userChoice);
	const [currentGuess, setCurrentGuess] = useState(initialGuess);
	// const [rounds, setRounds] = useState(0);
	const [pastGuesses, setPastGuesses] = useState([initialGuess.toString()]);

	const currentLow = useRef(1);
	const currentHigh = useRef(100);

	const { userChoice, onGameOver } = props;

	useEffect(() => {
		if (currentGuess === userChoice) {
			onGameOver(pastGuesses.length);
		}
	}, [currentGuess, userChoice, onGameOver]);

	const nextGuessHandler = direction => {
		if (
			(direction === "lower" && currentGuess < userChoice) ||
			(direction === "greater" && currentGuess > userChoice)
		) {
			Alert.alert("Don't lie", "You know that this is wrong...", [
				{
					text: "Sorry",
					style: "cancel",
				},
			]);
			return;
		}

		if (direction === "lower") {
			currentHigh.current = currentGuess;
		} else {
			currentLow.current = currentGuess + 1;
		}
		const nextNumber = generateRandomBetween(
			currentLow.current,
			currentHigh.current,
			currentGuess
		);
		setCurrentGuess(nextNumber);
		// setRounds(curRounds => curRounds + 1);
		setPastGuesses(curPastGuesses => [
			nextNumber.toString(),
			...curPastGuesses,
		]);
	};

	return (
		<View style={styles.screen}>
			<Text style={DefaultStyles.bodyText}>Opponent's Guess</Text>
			<NumberContainer>{currentGuess}</NumberContainer>
			<Card style={styles.btnContainer}>
				<MainButton
					style={styles.btn}
					onPress={nextGuessHandler.bind(this, "lower")}>
					<Ionicons name='md-remove' size={30} color='white' />
				</MainButton>
				<MainButton
					style={styles.btn}
					onPress={nextGuessHandler.bind(this, "greater")}>
					<Ionicons name='md-add' size={30} color='white' />
				</MainButton>
			</Card>
			<View style={styles.listContainer}>
				{/* <ScrollView contentContainerStyle={styles.list}>
					{pastGuesses.map((guess, index) =>
						renderListItem(guess, pastGuesses.length - index)
					)}
				</ScrollView> */}
				<FlatList
					contentContainerStyle={styles.list}
					keyExtractor={item => item}
					data={pastGuesses}
					renderItem={renderListItem.bind(this, pastGuesses.length)}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	listContainer: {
		width: Dimensions.get("window").width > 350 ? "60%" : "80%",
		flex: 1,
	},
	list: {
		flexGrow: 1,
		alignItems: "center",
		justifyContent: "flex-end",
	},
	listItem: {
		width: "60%",
		flexDirection: "row",
		borderColor: "#ccc",
		padding: 15,
		marginVertical: 10,
		backgroundColor: "white",
		borderWidth: 1,
		justifyContent: "space-around",
	},
	btn: { backgroundColor: colors.primary, paddingHorizontal: 25 },
	btnContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: Dimensions.get("window").height > 600 ? 20 : 10,
		width: 300,
		maxWidth: "80%",
	},
	screen: {
		flex: 1,
		padding: 10,
		alignItems: "center",
	},
});

export default GameScreen;