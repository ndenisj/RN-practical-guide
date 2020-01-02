import React from "react";
import { Platform, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createDrawerNavigator } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";

import CategoriesScreen from "../screens/CategoriesScreen";
import CategoryMealScreen from "../screens/CategoryMealScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import Colors from "../constants/Colors";
import FiltersScreen from "../screens/FiltersScreen";

// STACK NAVIGATION
const defaultStackNavOptions = {
	// initialRouteName: "Categories",
	defaultNavigationOptions: {
		headerStyle: {
			backgroundColor: Colors.primaryColor,
		},
		headerTintColor: "white",
		headerTitleStyle: {
			alignSelf: "center",
			textAlign: "center",
			flex: 1,
			fontFamily: "open-sans-bold",
		},
		headerBackTitleStyle: {
			fontFamily: "open-sans",
		},
	},
};

const MealsNavigator = createStackNavigator(
	{
		Categories: {
			screen: CategoriesScreen,
		},
		CategoryMeals: {
			screen: CategoryMealScreen,
		},
		MealDetail: {
			screen: MealDetailScreen,
		},
	},
	defaultStackNavOptions
);

const FavNavigator = createStackNavigator(
	{
		Favorites: FavoritesScreen,
		MealDetail: MealDetailScreen,
	},
	defaultStackNavOptions
);

const FiltersNavigator = createStackNavigator(
	{
		FIlters: FiltersScreen,
	},
	defaultStackNavOptions
);

// TAB NAVIGATION
const tabScreenConfig = {
	Meals: {
		screen: MealsNavigator,
		navigationOptions: {
			tabBarIcon: tabInfo => {
				return (
					<Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
				);
			},
			tabBarLabel:
				Platform.OS === "android" ? (
					<Text style={{ fontFamily: "open-sans-bold" }}>MEALS</Text>
				) : (
					"MEALS"
				),
		},
	},
	Favorite: {
		screen: FavNavigator,
		navigationOptions: {
			tabBarLabel: "Favorite!",
			tabBarIcon: tabInfo => {
				return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />;
			},
			tabBarColor: Colors.accentColor,
			tabBarLabel:
				Platform.OS === "android" ? (
					<Text style={{ fontFamily: "open-sans-bold" }}>FAVORITES</Text>
				) : (
					"FAVORITES"
				),
		},
	},
};

const MealFavTabNavigator =
	Platform.OS === "android"
		? createMaterialBottomTabNavigator(tabScreenConfig, {
				activeTintColor: "white",
				shifting: true,
				// shifting: false,
				// barStyle:{
				// 	backgroundColor: Colors.primaryColor
				// }
		  })
		: createBottomTabNavigator(tabScreenConfig, {
				tabBarOptions: {
					labelStyle: {
						fontFamily: "open-sans-bold",
					},
					activeTintColor: Colors.accentColor,
				},
		  });

// DRAWER NAVIGATION
const MainNavigator = createDrawerNavigator(
	{
		MealsFavs: {
			screen: MealFavTabNavigator,
			navigationOptions: { drawerLabel: "Meals" },
		},
		Filters: {
			screen: FiltersNavigator,
			navigationOptions: { drawerLabel: "Filters" },
		},
	},
	{
		drawerType: "slide",
		contentOptions: {
			activeTintColor: Colors.accentColor,
			labelStyle: {
				fontFamily: "open-sans-bold",
			},
		},
	}
);

export default createAppContainer(MainNavigator);
