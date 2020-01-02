import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import MealList from "../components/MealList";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";
import DefaultText from "../components/DefaultText";

const FavoritesScreen = props => {
	const catId = props.navigation.getParam("categoryId");

	const favMeals = useSelector(state => state.meals.favoriteMeals);

	if (favMeals.length > 0) {
		return <MealList navigation={props.navigation} listData={favMeals} />;
	} else {
		return (
			<View style={styles.screen}>
				<DefaultText>Please Add a Favorite Meal</DefaultText>
			</View>
		);
	}
};

FavoritesScreen.navigationOptions = navData => {
	return {
		headerTitle: "My Favorites",
		headerLeft: (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					iconName='ios-menu'
					title='Menu'
					onPress={() => {
						navData.navigation.toggleDrawer();
					}}
				/>
			</HeaderButtons>
		),
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default FavoritesScreen;
