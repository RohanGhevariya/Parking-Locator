import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import axios from "axios";
import { BASE_URL } from "../../../Api/Api";

const CreateUserScreen = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [cPassword, setCpassword] = useState("");
  const [type, setType] = useState("USER");
  const [hidePassword, setHidePassword] = useState(true);
  const [cHidePassword, setCHidePassword] = useState(true);
  return (
    <View style={styles.main}>
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
          Hello
        </Text>
        <Text
          style={{
            color: "#FBA31F",
            fontSize: "30",
            fontWeight: "bold",
            alignContent: "center",
            alignItems: "center",
            alignSelf: "flex-start",
            marginLeft: 30,
          }}
        >
          Let's get started!
        </Text>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Enter Your First Name"
            style={styles.input}
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Enter Your Last Name"
            style={styles.input}
            value={lastName}
            onChangeText={(text) => setlastName(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            placeholder="Enter Your Email"
            style={styles.input}
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
        </View>
        <View
          style={[
            styles.inputView,
            { flexDirection: "row", alignItems: "center", paddingRight: 10 },
          ]}
        >
          <TextInput
            placeholder="Enter Your Password"
            style={styles.input}
            value={password}
            onChangeText={(text) => setpassword(text)}
            secureTextEntry={hidePassword}
            maxLength={6}
          />
          <Text onPress={() => setHidePassword(hidePassword ? false : true)}>
            {hidePassword ? "SHOW" : "HIDE"}
          </Text>
        </View>
        <View
          style={[
            styles.inputView,
            { flexDirection: "row", alignItems: "center", paddingRight: 10 },
          ]}
        >
          <TextInput
            placeholder="Enter Your Conform Password"
            style={styles.input}
            value={cPassword}
            onChangeText={(text) => setCpassword(text)}
            secureTextEntry={cHidePassword}
            maxLength={6}
          />
          <Text onPress={() => setCHidePassword(cHidePassword ? false : true)}>
            {cHidePassword ? "SHOW" : "HIDE"}
          </Text>
        </View>
        <View
          style={{
            marginLeft: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 17 }}>Select Type</Text>
          <View
            style={[
              {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                // width: "50%",
                backgroundColor: "lightgray",
                borderRadius: 8,
                padding: 3,
                margin: 10,
                marginTop: 20,
              },
            ]}
          >
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: type === "USER" ? "#FBA31F" : null,
                padding: 10,
                borderRadius: 8,
              }}
              disabled={type === "USER" ? true : false}
              onPress={() => setType("USER")}
            >
              <Text
                style={{
                  color: type === "USER" ? "white" : "black",
                  fontWeight: "500",
                }}
              >
                USER
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: type === "OWNER" ? "#FBA31F" : null,
                padding: 10,
                borderRadius: 8,
              }}
              disabled={type === "OWNER" ? true : false}
              onPress={() => setType("OWNER")}
            >
              <Text
                style={{
                  color: type === "OWNER" ? "white" : "black",
                  fontWeight: "500",
                }}
              >
                OWNER
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
          style={{
            height: 45,
            width: "85%",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center ",
            alignSelf: "center",
            backgroundColor: "#FBA31F",
            borderRadius: 12,
            margin: 10,
          }}
          onPress={() => {
            if (firstName.length === 0) {
              alert("Enter Your First Name");
            } else if (lastName.length === 0) {
              alert("Enter Your Last Name");
            } else if (email.length === 0) {
              alert("Enter Your Email");
            } else if (password.length !== 6) {
              alert("Enter Your 6 digit Password");
            } else if (password !== cPassword) {
              alert("Password not match");
            } else {
              const data = {
                firstName: firstName,
                lastName: lastName,
                email: email.toLocaleLowerCase(),
                password: password,
                type: type,
              };
              axios
                .post(BASE_URL + "/api/user/createuser", data)
                .then((result) => {
                  console.log(result.data);
                  if (result.data.success) {
                    setFirstName("");
                    setlastName("");
                    setEmail("");
                    setpassword("");
                    setType("USER");
                    props.navigation.goBack();
                  } else {
                    alert(result.data.message);
                  }
                })
                .catch((err) => console.log(err));
            }
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "500",
              fontSize: 17,
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
        <Text style={{ textAlign: "center", margin: 20 }}>
          Already have an acount?{" "}
          <Text
            style={{ fontWeight: "500", color: "#FBA31F" }}
            onPress={() => props.navigation.goBack()}
          >
            Log In
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  inputView: {
    width: "85%",
    height: 45,
    alignSelf: "center",
    marginTop: 30,
    borderRadius: 10,
    borderWidth: 0.5,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 20,
  },
  input: {
    flex: 1,
  },
});
export default CreateUserScreen;
