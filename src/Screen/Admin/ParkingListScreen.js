import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import axios from "axios";
import { BASE_URL } from "../../../Api/Api";

const ParkingListScreen = (props) => {
  const [data, setData] = useState([]);
  const apiCall = () => {
    axios
      .get(BASE_URL + "/api/parking/getAllParkingList")
      .then((result) => {
        console.log(result.data);
        setData(result.data.data);
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
          <TouchableWithoutFeedback
            onPress={() =>
              props.navigation.navigate("Detail", {
                item: item,
              })
            }
          >
            <View style={styles.cellView}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={{ uri: BASE_URL + "/" + item.imageUrl }}
                  style={{
                    height: 100,
                    width: 100,
                    borderRadius: 100 / 2,
                    marginRight: 10,
                  }}
                />
                <View>
                  <Text style={styles.name}>Title : {item.title}</Text>
                  <Text style={{ fontWeight: "500" }}>
                    Address : {item.address}
                  </Text>
                  <Text style={styles.email}>
                    Timings : {new Date(item.openTime).getHours()}:
                    {new Date(item.openTime).getMinutes()} to{" "}
                    {new Date(item.closeTime).getHours()}:
                    {new Date(item.closeTime).getMinutes()}
                  </Text>
                  <Text style={{ color: "black" }}>
                    Available Slots : {item.availableParking}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  height: 1,
                  backgroundColor: "black",
                  marginVertical: 10,
                }}
              />
              <Text
                style={{ fontSize: 20, fontWeight: "600", color: "darkgray" }}
              >
                Owner Details
              </Text>

              <Text style={styles.name}>
                Name : {item.ownerId.firstName} {item.ownerId.lastName}
              </Text>
              <Text>{item.ownerId.email}</Text>
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
                    props.navigation.navigate("UpdateParking", {
                      item: item,
                    })
                  }
                >
                  Edit
                </Text>
                <Text
                  style={{ color: "green", fontSize: 15, fontWeight: "500" }}
                  onPress={() => {
                    const data = { id: item._id };
                    axios
                      .post(BASE_URL + "/api/parking/deleteParking", data)
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
          </TouchableWithoutFeedback>
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
export default ParkingListScreen;
