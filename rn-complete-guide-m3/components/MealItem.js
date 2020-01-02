import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableNativeFeedback,
	TouchableOpacity,
	Platform,
	ImageBackground,
} from "react-native";
import DefaultText from "./DefaultText";

const MealItem = props => {
	let Touching = TouchableOpacity;
	if (Platform.OS === "android" && Platform.Version >= 21) {
		Touching = TouchableNativeFeedback;
	}
	return (
		<View style={styles.mealItem}>
			<Touching onPress={props.onSelectMeal}>
				<View>
					<View style={{ ...styles.mealRow, ...styles.mealHeader }}>
						<ImageBackground
							source={{ uri: props.image }}
							style={styles.bgImage}>
							<View style={styles.titleContainer}>
								<Text style={styles.title} numberOfLines={1}>
									{props.title}
								</Text>
							</View>
						</ImageBackground>
					</View>
					<View style={{ ...styles.mealRow, ...styles.mealDetail }}>
						<DefaultText>{props.duration}m</DefaultText>
						<DefaultText>{props.complexity.toUpperCase()}</DefaultText>
						<DefaultText>{props.affordability.toUpperCase()}</DefaultText>
					</View>
				</View>
			</Touching>
		</View>
	);
};

const styles = StyleSheet.create({
	titleContainer: {
		backgroundColor: "rgba(0,0,0,0.5)",
		paddingVertical: 5,
		paddingHorizontal: 12,
	},
	title: {
		fontFamily: "open-sans-bold",
		fontSize: 22,
		color: "white",

		textAlign: "center",
	},
	bgImage: {
		justifyContent: "flex-end",
		width: "100%",
		height: "100%",
	},
	mealHeader: {
		height: "85%",
	},
	mealDetail: {
		paddingHorizontal: 10,
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "#f5f5f5",
		height: "15%",
	},
	mealItem: {
		marginVertical: 5,
		borderRadius: 10,
		overflow: "hidden",
		height: 200,
		width: "100%",
		backgroundColor: "#ccc",
	},
	mealRow: {
		flexDirection: "row",
	},
});

export default MealItem;
