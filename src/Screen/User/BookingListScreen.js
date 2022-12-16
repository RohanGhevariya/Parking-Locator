import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { BASE_URL } from "../../../Api/Api";
import axios from "axios";
import { UserId } from "../../../Context";

const BookingListScreen = (props) => {
  const id = React.useContext(UserId);

  const [data, setData] = useState([]);
  const apiCall = () => {
    axios
      .get(BASE_URL + "/api/user/getBookingList/" + `${id.userId.toString()}`)
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
            onPress={() => {
              props.navigation.navigate("DirectionScreen", {
                item: item.parkingId.coordinates,
              });
            }}
          >
            <View style={styles.cellView}>
              <Text style={{ fontWeight: "600" }}>Name : {item.name}</Text>
              <Text style={{ fontWeight: "600" }}>
                Vehicle Number : {item.carNumberPlate}
              </Text>
              <Text style={{ fontWeight: "600" }}>
                Date :{new Date(item.bookingDate).getDate()}/
                {new Date(item.bookingDate).getMonth() + 1}/
                {new Date(item.bookingDate).getFullYear()}
              </Text>
              <Text style={{ fontWeight: "600" }}>
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
              <Text style={{ fontWeight: "600" }}>
                Total Price : ${item.price}
              </Text>
              <Text style={{ fontWeight: "600" }}>
                Parking Address : {item.parkingId.address}
              </Text>
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
});
export default BookingListScreen;
