import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import Animated from "react-native-reanimated";

export default function WelcomeScreen() {
  const animation = useRef(null);
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: "#f64e32" }}>
      <Image
        source={require("../../assets/images/background.png")}
        style={{
          position: "absolute",
          width: wp(100),
          height: hp(100),
          resizeMode: "cover",
        }}
      />

      <StatusBar style="light" />

      {/* Lottie Logo */}
      <View style={{ position: "absolute", top: hp(20), left: wp(30) }}>
        <LottieView
          autoPlay
          ref={animation}
          style={{ width: wp(40), height: hp(40) }}
          source={require("../../assets/lottie/food-logo.json")}
        />
      </View>

      {/* Title and Subtitle */}
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{ textWhite: true, fontExtrabold: true, trackingWidest: true, fontSize: hp(5) }}
        >
          Food Recipe
        </Text>
        <Text
          style={{ textWhite: true, trackingWidest: true, fontMedium: true, fontSize: hp(2.5) }}
        >
          Explore some delicious recipes
        </Text>
      </View>

      {/* Get Started Button */}
      <View style={{ position: "absolute", bottom: hp(10), right: wp(21) }}>
        <TouchableOpacity
          style={{
            backgroundColor: "#fff",
            paddingVertical: hp(1.5),
            paddingHorizontal: hp(5),
            borderRadius: hp(1.5),
          }}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={{ color: "#f64e32", fontSize: hp(3.3), fontWeight: "bold" }}>
            Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
