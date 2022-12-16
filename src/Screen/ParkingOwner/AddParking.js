import React, { useState } from "react";
import {
  Button,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import DateTimePicker from "@react-native-community/datetimepicker";
import { BASE_URL } from "../../../Api/Api";
import axios from "axios";
import { UserId } from "../../../Context";
import * as ImagePicker from "expo-image-picker";

const AddParkingScreen = (props) => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [availableParking, setAvailableParking] = useState("");
  const region = {
    latitude: 43.6532,
    longitude: -79.3832,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const id = React.useContext(UserId);
  const [selectRegion, setSelectRegion] = useState(region);
  const [imageUrl, setImageUrl] = useState("");
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImageUrl(result.assets[0]);
    }
  };
  return (
    <ScrollView style={{}}>
      <View style={styles.container}>
        <View style={{ margin: 10 }}>
          {imageUrl && (
            <Image
              source={{ uri: imageUrl.uri }}
              style={{
                width: 100,
                height: 100,
                alignSelf: "center",
                borderRadius: 100 / 2,
              }}
            />
          )}
          <Button title="Pick an image" color={"#FBA31F"} onPress={pickImage} />
        </View>
        <TextInput
          placeholder="Enter title"
          style={styles.input}
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <TextInput
          placeholder="Enter  Address"
          style={styles.input}
          value={address}
          onChangeText={(text) => setAddress(text)}
        />
        <TextInput
          placeholder="Enter Hourly Rate"
          style={styles.input}
          value={hourlyRate}
          onChangeText={(text) => setHourlyRate(text)}
        />
        <View style={styles.pickerView}>
          <Text
            style={{
              color: "black",
              fontSize: 15,
              fontWeight: "500",
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
        <View style={styles.pickerView}>
          <Text
            style={{
              color: "black",
              fontSize: 15,
              fontWeight: "500",
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
        <View style={{ height: 300, margin: 10, borderRadius: 8 }}>
          <View style={{ flex: 1 }}>
            <MapView
              region={selectRegion}
              style={{ height: "100%", width: "100%", borderRadius: 8 }}
              onPress={(region) => {
                const data = {
                  latitude: region.nativeEvent.coordinate.latitude,
                  longitude: region.nativeEvent.coordinate.longitude,
                  // latitudeDelta: 0.0922,
                  // longitudeDelta: 0.0421,
                };
                setSelectRegion(data);
              }}
              onRegionChange={(region, detail) => {
                console.log(region);
                const data = {
                  latitude: region.latitude,
                  longitude: region.longitude,
                  // latitudeDelta: region.latitudeDelta,
                  // longitudeDelta: region.longitudeDelta,
                };
                setSelectRegion(data);
              }}
            >
              <Marker coordinate={selectRegion} title="Selectd Location" />
            </MapView>
          </View>
          <TextInput
            placeholder="Enter  AvailableParking Slots"
            style={styles.input}
            value={availableParking}
            onChangeText={(text) => setAvailableParking(text)}
          />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#FBA31F",
            alignItems: "center",
            justifyContent: "center",
            alignContent: "center",
            alignSelf: "center",
            height: 40,
            width: "70%",
            borderRadius: 10,
            marginBottom: 20,
          }}
          onPress={() => {
            if (title.length === 0) {
              alert("Enter Title");
            } else if (address.length === 0) {
              alert("Enter Address");
            } else if (startTime.getHours() - endTime.getHours() >= 10) {
              alert("Enter Parking Time more then 10 hours");
            } else if (hourlyRate === "") {
              alert("Enter HourlyRate");
            } else if (availableParking === "") {
              alert("Enter AvailableParking");
            } else {
              const createFormData = () => {
                const data = new FormData();

                data.append("image", {
                  name: new Date() + "_profile",
                  uri: imageUrl.uri,
                  type: "image/jpg",
                });

                data.append("title", title);
                data.append("address", address);
                data.append("ownerId", id.userId.toString());
                data.append("openTime", new Date(startTime).toUTCString());
                data.append("closeTime", new Date(endTime).toUTCString());
                data.append("hourlyRate", hourlyRate);
                data.append("availableParking", availableParking);
                data.append("latitude", selectRegion.latitude);
                data.append("longitude", selectRegion.longitude);
                console.log(data);
                return data;
              };
              // const formData = new FormData();

              // formData.append("image", imageUrl);
              // console.log("Image", formData);
              // const data = {
              //   title: title,
              //   address: address,
              //   ownerId: id.userId.toString(), //"638d5b83cd150bfcccbcd15e",
              //   openTime: startTime,
              //   closeTime: endTime,
              //   hourlyRate: hourlyRate,
              //   availableParking: availableParking,
              //   coordinates: region,
              // };
              axios
                .post(
                  BASE_URL + "/api/parking/createParking",
                  createFormData(),
                  {
                    headers: {
                      Accept: "application/json",
                      "Content-Type": "multipart/form-data",
                    },
                  }
                )
                .then((result) => {
                  if (result.data.success) {
                    alert(result.data.message);
                    setImageUrl("");
                    setTitle("");
                    setAddress("");
                    setStartTime(new Date());
                    setEndTime(new Date());
                    setHourlyRate("");
                    setAvailableParking("");
                    setSelectRegion(region);
                    props.navigation.goBack();
                  } else alert(result.data.message);
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          }}
        >
          <Text style={{ color: "white", fontWeight: "500" }}>Add Parking</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  input: {
    height: 40,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomStartRadius: 10,
    margin: 15,
    backgroundColor: "#f5f6f6",
  },
  pickerView: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
export default AddParkingScreen;
