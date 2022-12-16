import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { BASE_URL } from "../../../Api/Api";
import axios from "axios";

const LogInScreen = (props) => {
  const [email, setEmail] = useState();
  const [password, setpassword] = useState();
  return (
    <View style={styles.main}>
      <Text
        style={{
          color: "#FBA31F",
          fontSize: "40",
          fontWeight: "bold",
          alignContent: "center",
          alignItems: "center",
          alignSelf: "flex-start",
          marginLeft: 30,
        }}
      >
        Welcome back!
      </Text>
      <Text
        style={{
          color: "#FBA31F",
          fontSize: "20",
          fontWeight: "bold",
          alignContent: "center",
          alignItems: "center",
          alignSelf: "flex-start",
          marginLeft: 30,
        }}
      >
        Login to your account
      </Text>
      <TextInput
        placeholder="Enter Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
      />
      <TextInput
        placeholder="Enter Password"
        value={password}
        secureTextEntry={true}
        onChangeText={(text) => setpassword(text)}
        maxLength={6}
        style={styles.input}
      />
      <View>
        <TouchableOpacity
          style={{
            marginTop: 40,
            alignItems: "center",
            justifyContent: "center",
            width: "70%",
            height: 40,
            backgroundColor: "#FBA31F",
            alignSelf: "center",
            borderRadius: 8,
          }}
          onPress={() => {
            const data = {
              email: email.toLowerCase(),
              password: password,
            };
            axios
              .post(BASE_URL + "/api/user/logIn", data)
              .then((result) => {
                console.log(result.data);
                if (result.data.success) {
                  if (result.data.data.type === "USER") {
                    props.navigation.navigate("User", {
                      userId: result.data.data._id,
                      type: result.data.data.type,
                    });
                  } else if (result.data.data.type === "OWNER") {
                    props.navigation.navigate("Owner", {
                      userId: result.data.data._id.toString(),
                      type: result.data.data.type,
                    });
                  } else {
                    props.navigation.navigate("Home", {
                      userId: result.data.data._id.toString(),
                      type: result.data.data.type,
                    });
                  }
                } else {
                  alert(result.data.message);
                  console.log("User Not Found");
                }
              })
              .catch((err) => console.log(err));
          }}
        >
          <Text style={{ color: "white", fontSize: 17, fontWeight: "600" }}>
            Log In
          </Text>
        </TouchableOpacity>
      </View>
      <Text
        style={{
          position: "absolute",
          bottom: 20,
          alignSelf: "center",
          marginBottom: 210,
        }}
      >
        Don't have an account?{" "}
        <Text
          style={{ color: "#FBA31F", fontWeight: "500" }}
          onPress={() => props.navigation.navigate("Register")}
        >
          Sign Up
        </Text>
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: "85%",
    height: 50,
    alignSelf: "center",
    marginTop: 30,
    borderRadius: 10,
    borderWidth: 0.5,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default LogInScreen;
