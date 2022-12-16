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
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { getDistance, getPreciseDistance } from "geolib";
import axios from "axios";
import MapViewDirections from "react-native-maps-directions";
const DirectionScreen = (props) => {
  //   const id = React.useContext(UserId);

  const initalRegion = {
    latitude: 43.6532,
    longitude: -79.3832,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const { item } = props.route.params;
  const [region, setRegion] = useState(initalRegion);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
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
      let region1 = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.045,
      };
      setLocation(region1);
      console.log(location.coords, item);
    })();
  }, []);
  const origin = {
    latitude: location?.latitude,
    longitude: location?.longitude,
  };
  const destination = { latitude: item?.latitude, longitude: item?.longitude };
  return (
    <View style={styles.container}>
      <MapView
        // provider="google"
        followsUserLocation={true}
        mapType="none"
        style={styles.map}
        region={location}
        showsMyLocationButton={true}
        showsUserLocation={true}
        showsCompass={true}
        zoomTapEnabled={true}
        zoomEnabled={true}
      >
        <Marker title="Current Location" coordinate={location} />
        <Marker title="Parking Location" coordinate={item} />
        {item && (
          <Polyline
            coordinates={[
              { latitude: origin.latitude, longitude: origin.longitude },
              {
                latitude: destination.latitude,
                longitude: destination.longitude,
              },
            ]}
            strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
            strokeColors={["#7F0000"]}
            strokeWidth={3}
          />
        )}
        {/* <MapViewDirections origin={origin} destination={destination} /> */}
      </MapView>
    </View>
  );
};
export default DirectionScreen;
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
    borderRadius: 8,
    borderWidth: 0.5,
    paddingLeft: 10,
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
