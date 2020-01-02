import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import { CATEGORIES } from "../data/dummy-data";
import MealList from "../components/MealList";
import DefaultText from "../components/DefaultText";

const CategoryMealScreen = props => {
	const catId = props.navigation.getParam("categoryId");

	const availableMeals = useSelector(state => state.meals.filteredMeals);

	const displayedMeals = availableMeals.filter(
		meal => meal.categoryIds.indexOf(catId) >= 0
	);

	if (displayedMeals.length > 0) {
		return <MealList listData={displayedMeals} navigation={props.navigation} />;
	} else {
		return (
			<View style={styles.screen}>
				<DefaultText>No Meal to Display</DefaultText>
			</View>
		);
	}
};

CategoryMealScreen.navigationOptions = navigationData => {
	const catId = navigationData.navigation.getParam("categoryId");
	const selectedCategory = CATEGORIES.find(cat => cat.id === catId);

	return {
		headerTitle: selectedCategory.title,
	};
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default CategoryMealScreen;
