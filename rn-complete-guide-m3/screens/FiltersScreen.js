import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Switch, Platform } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";

import CustomHeaderButton from "../components/HeaderButton";
import DefaultText from "../components/DefaultText";
import Colors from "../constants/Colors";
import { setFilters } from "../store/actions/meals";

const FilterSwitch = props => {
	return (
		<View style={styles.filterContainer}>
			<DefaultText>{props.label}</DefaultText>
			<Switch
				trackColor={{ true: Colors.primaryColor }}
				thumbColor={Platform.OS === "android" ? Colors.primaryColor : ""}
				value={props.state}
				onValueChange={props.onChange}
			/>
		</View>
	);
};

const FiltersScreen = props => {
	const { navigation } = props;

	const [isGlutenFree, setIsGlutenFree] = useState(false);
	const [isLactoseFree, setIsLactoseFree] = useState(false);
	const [isVegan, setIsVegan] = useState(false);
	const [isVegetarian, setIsVegetarian] = useState(false);

	const dispatch = useDispatch();

	const saveFilters = useCallback(() => {
		const appliedFilters = {
			glutenFree: isGlutenFree,
			lactoseFree: isLactoseFree,
			vegan: isVegan,
			vegetarian: isVegetarian,
		};

		dispatch(setFilters(appliedFilters));
	}, [isGlutenFree, isLactoseFree, isVegan, isVegetarian, dispatch]);

	useEffect(() => {
		navigation.setParams({ save: saveFilters });
	}, [saveFilters]);

	return (
		<View>
			<Text style={styles.title}>Available Filters / Restrictions</Text>
			<FilterSwitch
				label='Gluten-Free'
				state={isGlutenFree}
				onChange={newVal => setIsGlutenFree(newVal)}
			/>
			<FilterSwitch
				label='Lactose-Free'
				state={isLactoseFree}
				onChange={newVal => setIsLactoseFree(newVal)}
			/>
			<FilterSwitch
				label='Vegan'
				state={isVegan}
				onChange={newVal => setIsVegan(newVal)}
			/>
			<FilterSwitch
				label='Vegetarian'
				state={isVegetarian}
				onChange={newVal => setIsVegetarian(newVal)}
			/>
		</View>
	);
};

FiltersScreen.navigationOptions = navData => {
	return {
		headerTitle: "Filter Meals",
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
		headerRight: (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					iconName='ios-save'
					title='Save'
					onPress={navData.navigation.getParam("save")}
				/>
			</HeaderButtons>
		),
	};
};

const styles = StyleSheet.create({
	title: {
		fontFamily: "open-sans-bold",
		fontSize: 22,
		margin: 20,
		textAlign: "center",
	},
	filterContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginHorizontal: 20,
		marginVertical: 15,
		alignItems: "center",
	},
});

export default FiltersScreen;
