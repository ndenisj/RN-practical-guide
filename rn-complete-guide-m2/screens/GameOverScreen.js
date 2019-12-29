import React from "react";
import {
	View,
	StyleSheet,
	ScrollView,
	Image,
	Text,
	Dimensions,
} from "react-native";
import Colors from "../constants/colors";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

const GameOverScreen = props => {
	return (
		<ScrollView>
			<View style={styles.screen}>
				<TitleText>The game is over!</TitleText>
				<View style={styles.imageContainer}>
					<Image
						resizeMode='cover'
						style={styles.image}
						// source={{
						// 	uri:
						// 		"https://abrahamswallet.com/wp-content/uploads/2017/12/samuel-ferrara-117219-1180x770.jpg",
						// }}
						source={require("../assets/success.png")}
					/>
				</View>
				<BodyText style={styles.resultText}>
					Your phone needed{" "}
					<Text style={styles.highlight}>{props.roundsNumber}</Text> rounds to
					guess the number{" "}
					<Text style={styles.highlight}>{props.userNumber}</Text>
				</BodyText>
				<MainButton onPress={props.onRestart}>START NEW GAME</MainButton>
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	resultText: {
		textAlign: "center",
		marginBottom: 20,
		fontSize: Dimensions.get("window").height < 400 ? 16 : 20,
	},
	highlight: {
		color: Colors.primary,
		fontFamily: "open-sans-bold",
	},
	imageContainer: {
		borderRadius: (Dimensions.get("window").width * 0.7) / 2,
		borderWidth: 3,
		borderColor: "black",
		width: Dimensions.get("window").width * 0.7,
		height: Dimensions.get("window").width * 0.7,
		overflow: "hidden",
		marginVertical: Dimensions.get("window").height / 30,
	},
	screen: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		margin: 30,
	},
	image: {
		width: "100%",
		height: "100%",
	},
});

export default GameOverScreen;
