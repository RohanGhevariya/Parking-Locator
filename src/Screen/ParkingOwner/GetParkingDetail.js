import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { BASE_URL } from "../../../Api/Api";

const GetParkingDetail = (props) => {
  const [data, setData] = useState([]);
  const { item } = props.route.params;
  console.log("Item", item._id);
  const apiCall = () => {
    axios
      .get(BASE_URL + `/api/parking/getBookingList/${item._id}`)
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
    <View>
      <View style={styles.cellView}>
        <Text style={styles.name}>Title : {item.title}</Text>
        <Text style={{ fontWeight: "500" }}>Address : {item.address}</Text>
        <Text>
          AvailableParking Slots: {item.availableParking - item.bookedParking}
        </Text>
        <Text>
          Timings : {new Date(item.openTime).getHours()}:
          {new Date(item.openTime).getMinutes()} to{" "}
          {new Date(item.closeTime).getHours()}:
          {new Date(item.closeTime).getMinutes()}
        </Text>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => {
          return (
            <View style={styles.cellView}>
              <Text>Name : {item.name}</Text>
              <Text>Number Plate : {item.carNumberPlate}</Text>
              <Text>
                Booking Date : {new Date(item.bookingDate).getDate()}/
                {new Date(item.bookingDate).getMonth() + 1}/
                {new Date(item.bookingDate).getFullYear()}
              </Text>
              <Text>
                Timimg -{" "}
                {new Date(item.startTime).getHours() === 0
                  ? 12
                  : new Date(item.startTime).getHours()}
                :{new Date(item.startTime).getMinutes()} to{" "}
                {new Date(item.endTime).getHours() === 0
                  ? 12
                  : new Date(item.endTime).getHours()}
                :{new Date(item.endTime).getMinutes()}
              </Text>
              <Text>Total Pay : {item.price}</Text>
            </View>
          );
        }}
      />
    </View>
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
export default GetParkingDetail;
