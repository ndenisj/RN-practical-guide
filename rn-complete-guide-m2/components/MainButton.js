import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../constants/colors";

const MainButton = props => {
	return (
		<TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
			<View style={{ ...styles.btn, ...props.style }}>
				<Text style={styles.btnText}>{props.children}</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
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
