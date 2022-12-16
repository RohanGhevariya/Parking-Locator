import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { BASE_URL } from "../../../Api/Api";
import axios from "axios";

const AllBookingListScreen = (props) => {
  const [data, setData] = useState([]);
  const apiCall = () => {
    axios
      .get(BASE_URL + "/api/getAllBookingList")
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
          <View style={styles.cellView}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              Name : {item.name}
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              Number Plate : {item.carNumberPlate}
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              Booking Date : {new Date(item.bookingDate).getDate()}/
              {new Date(item.bookingDate).getMonth() + 1}/
              {new Date(item.bookingDate).getFullYear()}
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              Booking Duration :{" "}
              {new Date(item.startTime).getHours() === 0
                ? 12
                : new Date(item.startTime).getHours()}
              :{new Date(item.startTime).getMinutes()} to{" "}
              {new Date(item.endTime).getHours() === 0
                ? 12
                : new Date(item.endTime).getHours()}
              :{new Date(item.endTime).getMinutes()}
            </Text>
            <Text style={{ fontSize: 15, fontWeight: "500" }}>
              Parking Address : {item?.parkingId?.address}
            </Text>
            <View
              style={{ height: 1, backgroundColor: "gray", marginVertical: 10 }}
            />
            <Text
              style={{
                fontSize: 15,
                fontWeight: "500",
                color: "#FBA31F",
                textAlign: "right",
              }}
            >
              Total Pay : {item.price}
            </Text>
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
});
export default AllBookingListScreen;
