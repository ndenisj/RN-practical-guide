import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import Colors from "../constants/colors";

const GameOverScreen = props => {
	return (
		<View style={styles.screen}>
			<Text>The game is over!</Text>
			<Text>Number of Rounds: {props.roundsNumber}</Text>
			<Text>Number was: {props.userNumber}</Text>
			<Button
				title='START NEW GAME'
				onPress={props.onRestart}
				color={Colors.primary}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default GameOverScreen;
