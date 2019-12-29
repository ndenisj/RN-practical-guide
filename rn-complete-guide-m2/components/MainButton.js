import React from "react";
import {
	View,
	TouchableOpacity,
	Text,
	StyleSheet,
	TouchableNativeFeedback,
	Platform,
} from "react-native";
import colors from "../constants/colors";

const MainButton = props => {
	let ButtonComponent = TouchableOpacity;
	if (Platform.OS === "android" && Platform.Version >= 21) {
		ButtonComponent = TouchableNativeFeedback;
	}

	return (
		<View style={styles.btnContainer}>
			<ButtonComponent activeOpacity={0.6} onPress={props.onPress}>
				<View style={{ ...styles.btn, ...props.style }}>
					<Text style={styles.btnText}>{props.children}</Text>
				</View>
			</ButtonComponent>
		</View>
	);
};

const styles = StyleSheet.create({
	btnContainer: {
		borderRadius: 25,
		overflow: "hidden",
	},
	btn: {
		backgroundColor: colors.primary,
		paddingVertical: 12,
		paddingHorizontal: 30,
		borderRadius: 25,
	},
	btnText: {
		color: "white",
		fontFamily: "open-sans-bold",
		fontSize: 18,
	},
});

export default MainButton;
