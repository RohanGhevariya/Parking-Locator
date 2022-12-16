import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import MapView, { Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import { getDistance, getPreciseDistance } from "geolib";
import axios from "axios";
import { BASE_URL } from "../../Api/Api";
import { UserId } from "../../Context";
const MapViewScreen = (props) => {
  const id = React.useContext(UserId);
  const [isVisible, setIsVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const time = endTime.getHours() - startTime.getHours();
  const min = endTime.getMinutes() - startTime.getMinutes();
  const [select, setSelect] = useState(0);
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [selectedParking, setSelectedParking] = useState("");
  const [name, setName] = useState("");
  const [carNumberPlate, setCarNumberPlate] = useState("");
  const [search, setSearch] = useState("");
  const initalRegion = {
    latitude: 43.6532,
    longitude: -79.3832,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  let region1;
  const [region, setRegion] = useState(initalRegion);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const apiCall = () => {
    console.log("SSSS");
    axios
      .get(BASE_URL + "/api/parking/getAllParkingList")
      .then((result) => {
        console.log("Data", result.data);
        setData(result.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        enabledHighAccuracy: true,
      });

      region1 = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.045,
      };
      setLocation(location);
      console.log("COORDS", region1);
    })();
    apiCall();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        // provider= {PROVIDER_GOOGLE}
        mapType="none"
        style={styles.map}
        region={region}
        showsMyLocationButton={true}
        showsUserLocation={true}
        showsCompass={true}
      >
        {data.map((marker) => {
          return (
            <Marker
              coordinate={marker.coordinates}
              title={`Title: ${marker.title}`}
              description={`Address : ${marker.address}`}
              // image={{ uri: BASE_URL + "/" + marker.imageUrl }}
              // style={{ height: 50 }}
              onSelect={() => {
                console.log("This is Select ", marker);
                setIsVisible(true);
                setSelectedParking(marker);
                setSelect(1);
              }}
            />
          );
        })}
      </MapView>

      <Modal visible={isVisible} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              width: "100%",
              padding: 10,
              height: "65%",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Text style={{ color: "black", fontSize: 17, fontWeight: "500" }}>
                Book Your Parking Solt
              </Text>
              <Text
                onPress={() => setIsVisible(false)}
                style={{
                  color: "#FBA31F",
                  fontSize: 17,
                  fontWeight: "500",
                  textAlign: "right",
                  margin: 10,
                }}
              >
                Close
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "lightgray",

                borderRadius: 8,
                padding: 2,
              }}
            >
              <TouchableOpacity
                style={{
                  width: "50%",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: select === 0 ? "#FBA31F" : null,
                  padding: 10,
                  borderRadius: 8,
                }}
                disabled={select === 0 ? true : false}
                onPress={() => setSelect(0)}
              >
                <Text style={{ color: select === 0 ? "white" : null }}>
                  Location
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: "50%",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: select === 1 ? "#FBA31F" : null,
                  padding: 10,
                  borderRadius: 8,
                }}
                disabled={select === 1 ? true : false}
                onPress={() => setSelect(1)}
              >
                <Text
                  style={{
                    color: select === 1 ? "white" : null,
                    fontWeight: "500",
                  }}
                >
                  Details
                </Text>
              </TouchableOpacity>
            </View>
            {select === 1 ? (
              <>
                <ScrollView keyboardShouldPersistTaps="handled">
                  <TouchableOpacity
                    onPress={() => setSelect(0)}
                    style={{ overflow: "hidden" }}
                  >
                    <View
                      style={{
                        height: 40,
                        paddingLeft: 10,
                        borderBottomWidth: 1,
                        borderBottomStartRadius: 10,
                        margin: 10,
                        backgroundColor: "#f5f6f6",
                        justifyContent: "center",
                      }}
                    >
                      <Text>
                        {/* placeholder="Please Select Address into Loaction"
                        style={{
                         
                        }} */}

                        {selectedParking?.address
                          ? selectedParking?.address
                          : "Select Address"}
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <View style={{ margin: 10 }}>
                    <TextInput
                      placeholder="Enter Your Name"
                      style={{
                        height: 40,
                        paddingLeft: 10,
                        borderBottomWidth: 1,
                        borderBottomStartRadius: 10,
                        margin: 5,
                        backgroundColor: "#f5f6f6",
                      }}
                      value={name}
                      onChangeText={(text) => setName(text)}
                    />
                  </View>
                  <View style={{ margin: 10 }}>
                    <TextInput
                      placeholder="Enter Your Number Plate"
                      style={{
                        height: 40,
                        paddingLeft: 10,
                        borderBottomWidth: 1,
                        borderBottomStartRadius: 10,
                        margin: 5,
                        backgroundColor: "#f5f6f6",
                      }}
                      value={carNumberPlate.toLocaleUpperCase()}
                      onChangeText={(text) =>
                        setCarNumberPlate(text.toLocaleUpperCase())
                      }
                    />
                  </View>

                  {selectedParking?.address && (
                    <View>
                      <View style={{ margin: 10 }}>
                        <View style={styles.pickerView}>
                          <Text
                            style={{
                              color: "black",
                              fontSize: 15,
                              fontWeight: "500",
                            }}
                          >
                            Booking Date
                          </Text>
                          <DateTimePicker
                            value={date}
                            display="calendar"
                            mode="date"
                            minimumDate={new Date()}
                            onChange={(event, date) => {
                              console.log(event);
                              setDate(date);
                            }}
                            textColor="#FBA31F"
                          />
                        </View>
                      </View>
                      <View style={{ margin: 10 }}>
                        <Text style={{ color: "red", marginBottom: 5 }}>
                          Please Add Maximum 1 hr in timimg*
                        </Text>
                        <View style={styles.pickerView}>
                          <View>
                            <Text
                              style={{
                                color: "black",
                                fontSize: 15,
                                fontWeight: "500",
                                margin: 5,
                              }}
                            >
                              Start Time
                            </Text>
                            <DateTimePicker
                              value={startTime}
                              display="default"
                              mode="time"
                              onChange={(event, date) => {
                                console.log(date);
                                setStartTime(date);
                              }}
                              textColor="#FBA31F"
                            />
                          </View>
                          <View>
                            <Text
                              style={{
                                color: "black",
                                fontSize: 15,
                                fontWeight: "500",
                                margin: 5,
                              }}
                            >
                              End Time
                            </Text>
                            <DateTimePicker
                              value={endTime}
                              display="default"
                              mode="time"
                              onChange={(event, date) => {
                                console.log(event);
                                setEndTime(date);
                              }}
                              textColor="#FBA31F"
                            />
                          </View>
                        </View>
                      </View>
                      {time > 0 && (
                        <View
                          style={{
                            margin: 5,
                            justifyContent: "center",
                            padding: 2,
                            // alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              color: "green",
                              fontSize: 17,
                              fontWeight: "500",
                              marginBottom: 5,
                            }}
                          >
                            {" "}
                            Payable Amount :- ${" "}
                            {time > 0 && min === 0
                              ? time * selectedParking.hourlyRate
                              : 0}
                          </Text>
                        </View>
                      )}
                    </View>
                  )}
                </ScrollView>
              </>
            ) : (
              <View>
                <View style={{ margin: 10 }}>
                  <TextInput
                    style={styles.input}
                    placeholder="Search Location"
                    value={search}
                    onChangeText={(text) => {
                      setSearch(text);
                      const filter = data.filter((item) =>
                        item.address
                          .toLocaleLowerCase()
                          .match(text.toLocaleLowerCase())
                      );
                      console.log(filter);
                      setFilterData(filter);
                    }}
                  />
                  <FlatList
                    keyboardShouldPersistTaps="handled"
                    data={search === "" ? data : filterData}
                    contentContainerStyle={{ paddingBottom: 150 }}
                    renderItem={({ item }) => {
                      const calulate = (lat, long) => {
                        const dis = getDistance(
                          {
                            latitude: lat,
                            longitude: long,
                          },
                          {
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                          }
                        );
                        return dis;
                      };
                      const d = calulate(
                        item.coordinates.latitude,
                        item.coordinates.longitude
                      );
                      console.log(d);
                      return (
                        <TouchableWithoutFeedback
                          onPress={() => {
                            const data = {
                              latitude: item.coordinates.latitude,
                              longitude: item.coordinates.longitude,
                              latitudeDelta: 0.0022,
                              longitudeDelta: 0.0121,
                            };
                            setRegion(data);
                            setSelectedParking(item);
                            setSelect(1);
                          }}
                        >
                          <View
                            style={{
                              margin: 10,
                              padding: 10,
                              borderRadius: 8,
                              elevation: 10,
                              shadowColor: "black",
                              backgroundColor: "white",
                              shadowOffset: { height: 2, width: 0 },
                              shadowOpacity: 0.24,
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Text>{item.title}</Text>
                              <Text>{`${d / 1000} KMs`}</Text>
                            </View>
                            <Text>Address : {item.address}</Text>
                            <Text>
                              Available Slots :{" "}
                              {item.availableParking - item?.bookedParking}
                            </Text>
                            <Text>
                              Timing :- {new Date(item.openTime).getHours()}:
                              {new Date(item.openTime).getMinutes()} to{" "}
                              {new Date(item.closeTime).getHours()}:
                              {new Date(item.closeTime).getMinutes()}
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>
                      );
                    }}
                  />
                </View>
              </View>
            )}

            <View style={{ margin: 10 }}>
              <TouchableOpacity
                style={{
                  height: 40,
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#FBA31F",
                  borderRadius: 12,
                }}
                onPress={() => {
                  const price = time * selectedParking.hourlyRate;
                  console.log(selectedParking._id);

                  if (name.length === 0) {
                    alert("Please Enter Your Name");
                  } else if (carNumberPlate.length === 0) {
                    alert("Please Enter Your Plate");
                  } else if (time < 0 && min !== 0) {
                    alert("Enter At least One Hour");
                  } else {
                    const data = {
                      name: name,
                      userId: id.userId.toString(), //"638d5b4ccd150bfcccbcd15c",
                      carNumberPlate: carNumberPlate,
                      parkingId: selectedParking._id,
                      bookingDate: date,
                      startTime: startTime,
                      endTime: endTime,
                      price: price,
                    };
                    console.log(data);
                    axios
                      .post(BASE_URL + "/api/booking", data)
                      .then((result) => {
                        console.log(result.data);
                        if (result.data.success) {
                          setName("");
                          setCarNumberPlate("");
                          setDate(new Date());
                          setStartTime(new Date());
                          setEndTime(new Date());
                          alert(result.data.message);
                          setIsVisible(false);
                          props.navigation.navigate("Payment", {
                            item: {
                              price: 10,
                            },
                          });
                        } else {
                          alert(result.data.message);
                        }
                      })
                      .catch((err) => console.log(err));
                  }
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 15, fontWeight: "500" }}
                >
                  Book Slot
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        onPress={() => setIsVisible(true)}
        style={{
          position: "absolute",
          bottom: 10,
          alignSelf: "center",
          backgroundColor: "#FBA31F",
          padding: 10,
          borderRadius: 8,
        }}
      >
        <Text style={{ color: "white", fontSize: 17, fontWeight: "500" }}>
          Book Parking Slot
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default MapViewScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "cent er",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  pickerView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    height: 40,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomStartRadius: 10,
    margin: 15,
    backgroundColor: "#f5f6f6",
  },
});
// const markers = [
//   {
//     title: "Location 1",
//     coordinates: {
//       latitude: 43.647998,
//       longitude: -79.396,
//     },
//   },
//   {
//     title: "Location 2",
//     coordinates: {
//       latitude: 43.645504,
//       longitude: -79.3692,
//     },
//   },
//   {
//     title: "Location 3",
//     coordinates: {
//       latitude: 43.662533,
//       longitude: -79.37719,
//     },
//   },
// ];
