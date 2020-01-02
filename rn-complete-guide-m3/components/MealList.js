import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import MealItem from "./MealItem";

const MealList = props => {
	const favoriteMeals = useSelector(state => state.meals.filteredMeals);

	const renderMealItem = itemData => {
		const isFavorite = favoriteMeals.some(meal => meal.id === itemData.item.id);
		return (
			<MealItem
				onSelectMeal={() => {
					props.navigation.navigate("MealDetail", {
						mealId: itemData.item.id,
						mealTitle: itemData.item.title,
						isFav: isFavorite,
					});
				}}
				title={itemData.item.title}
				duration={itemData.item.duration}
				affordability={itemData.item.affordability}
				complexity={itemData.item.complexity}
				image={itemData.item.imageUrl}
			/>
		);
	};

	return (
		<View style={styles.list}>
			<FlatList
				keyExtractor={(item, index) => item.id}
				data={props.listData}
				renderItem={renderMealItem}
				style={{ width: "100%" }}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	list: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 15,
	},
});

export default MealList;
