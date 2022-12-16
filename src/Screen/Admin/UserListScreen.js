import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import axios from "axios";
import { BASE_URL } from "../../../Api/Api";

const UserListScreen = (props) => {
  const [data, setData] = useState([]);
  const apiCall = () => {
    axios
      .get(BASE_URL + "/api/user/getUserList")
      .then((result) => {
        console.log(result.data);
        setData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    apiCall();
  }, []);
  return (
    <FlatList
      data={data}
      renderItem={({ item }) => {
        return (
          <View style={styles.cellView}>
            <Text style={styles.name}>
              {item.firstName} {item.lastName}
            </Text>
            <Text style={styles.email}>{item.email}</Text>
            <Text style={styles.type}>{item.type}</Text>
            <View
              style={{
                height: 1,
                backgroundColor: "black",
                marginVertical: 10,
              }}
            />
            <View
              style={{
                flexDirection: "row",
                width: "30%",
                alignItems: "center",
                alignSelf: "flex-end",
                justifyContent: "space-between",
              }}
            >
              <Text
                style={{ color: "green", fontSize: 15, fontWeight: "500" }}
                onPress={() =>
                  props.navigation.navigate("UpdateUser", {
                    item: item,
                  })
                }
              >
                Edit
              </Text>
              <Text
                style={{ color: "green", fontSize: 15, fontWeight: "500" }}
                onPress={() => {
                  axios
                    .post(BASE_URL + "/api/user/deleteUser")
                    .then((result) => {
                      console.log(result.data);
                      if (result.data.success) {
                        alert(result.data.message);
                        apiCall();
                      } else {
                        apiCall();
                      }
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                }}
              >
                Delete
              </Text>
            </View>
          </View>
        );
      }}
    />
  );
};
const styles = StyleSheet.create({
  cellView: {
    elevation: 10,
    shadowColor: "black",
    shadowOffset: { height: 2, width: 0 },
    shadowRadius: 10,
    shadowOpacity: 0.24,
    margin: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "white",
  },
  name: {
    fontSize: 17,
    fontWeight: "500",
  },
  email: {
    color: "gray",
    fontWeight: "500",
  },
  type: {
    color: "#FBA31F",
    textAlign: "right",
    fontWeight: "500",
  },
});
export default UserListScreen;
