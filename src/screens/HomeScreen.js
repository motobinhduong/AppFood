import { View, Text, ScrollView, SafeAreaView, Image, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon } from "react-native-heroicons/outline";
import { StatusBar } from "expo-status-bar";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Categories from "../components/Categories";

import axios from "axios";
import Recipes from "../components/Recipes";

export default function HomeScreen() {
  const [activeCategory, setActiveCategory] = useState("Beef");
  const [categories, setCategories] = useState([]);
  const [meals, setMeals] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  useEffect(() => {
    getCategories();
    getRecipes();
  }, []);

  const handleChangeCategory = (category) => {
    getRecipes(category);
    setActiveCategory(category);
    setMeals([]);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      if (response && response.data) {
        setCategories(response.data.categories);
        console.log(response.data.categories);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const getRecipes = async (category = "Beef") => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      if (response && response.data) {
        setMeals(response.data.meals);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const filteredMeals = meals.filter((meal) => meal && meal.name && meal.name.toLowerCase().includes(text.toLowerCase()));
      setMeals(filteredMeals);
    } else {
      getRecipes(activeCategory); // Reset to category-based filtering if no search term
    }
  };
  
  

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <StatusBar style="dark" />

      <SafeAreaView>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
          {/* Avatar and Bell Icon */}
          <View className="mx-4 flex-row justify-between items-center mb-4">
          <View style={{ paddingTop: hp(3) }}> 
              <AdjustmentsHorizontalIcon  size={hp(6)} color={"gray"} />
            </View>
            {/* <Image
              source={require("../../assets/images/avatar.png")}
              style={{ width: hp(5), height: hp(5), resizeMode: "cover", roundedFull: true }}
            /> */}
          </View>
         
          {/* Headlines */}
          <View className="mx-4 space-y-1 mb-2">
            <Text style={{ fontSize: hp(3.5), fontWeight: "bold" }}>Fast & Delicious</Text>
            <Text style={{ fontSize: hp(3.5), fontWeight: "extrabold" }}>
              Food You <Text style={{ color: "#f64e32" }}>Love</Text>
            </Text>
          </View>

          {/* Search Bar */}
          <View className="mx-4 flex-row items-center border rounded-xl border-black p-2">
            <View style={{ backgroundColor: "white", borderRadius: 100, padding: 2 }}>
              <MagnifyingGlassIcon size={hp(2.5)} color={"gray"} strokeWidth={3} />
            </View>
            <TextInput
              placeholder="Search Your Favorite Food"
              placeholderTextColor={"gray"}
              style={{ fontSize: hp(1.7), flex: 1, marginBottom: 1, paddingLeft: 10 }}
              onChangeText={handleSearch} // Add onChangeText handler
              value={searchQuery} 

            />
          </View>

          {/* Categories */}
          {categories.length > 0 && (
            <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />
          )}

          {/* Recipes */}
          <View>
            <Recipes meals={meals} categories={categories} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
