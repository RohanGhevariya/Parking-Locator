import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Log In");
    }, 3000);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
      }}
    >
      <Image
        source={require("../Mobile/assets/parkit.png")}
        style={{
          width: 100,
          height: 100,
          borderRadius: 10,
          resizeMode: "center",
        }}
      />
    </View>
  );
};

export default Splash;
