import "react-native-gesture-handler";
import React, { useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { Button, StyleSheet, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import CreateUserScreen from "./src/Screen/User/CreateUserScreen";
import MapViewScreen from "./src/Screen/MapView";
import AddParkingScreen from "./src/Screen/ParkingOwner/AddParking";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Splash from "./Splash";
import LogInScreen from "./src/Screen/User/LogInScreen";
import UserListScreen from "./src/Screen/Admin/UserListScreen";
import ParkingListScreen from "./src/Screen/Admin/ParkingListScreen";
import BookingListScreen from "./src/Screen/User/BookingListScreen";
import AllBookingListScreen from "./src/Screen/Admin/AllBookingListScreen";
import RegisterScreen from "./src/Screen/Admin/RegisterScreen";
import ParkingList from "./src/Screen/ParkingOwner/ParkingList";
import GetParkingDetail from "./src/Screen/ParkingOwner/GetParkingDetail";
import { UserId } from "./Context";
import UpdateParkingScree from "./src/Screen/ParkingOwner/UpdateParking";
import DirectionScreen from "./src/Screen/User/DirectionScreen";
import ImageScreen from "./ImageScreen";
import StripeApp from "./src/Screen/User/StripeApp";
import { StripeProvider } from "@stripe/stripe-react-native";
import UpdateUserScreen from "./src/Screen/Admin/UpdateUserScreen";

const Drawer = createDrawerNavigator();

// function MyDrawer() {
//   return (
//     <Drawer.Navigator
//       screenOptions={{
//         headerStyle: {
//           backgroundColor: "red",
//         },
//         headerTintColor: "white",
//       }}
//     >
//       <Drawer.Screen name="Map View" component={MapViewScreen} />
//       <Drawer.Screen name="User List" component={UserListScreen} />
//       <Drawer.Screen name="Parking List" component={ParkingListScreen} />
//       <Drawer.Screen name="Add Parking" component={AddParkingScreen} />
//       <Drawer.Screen name="Create User" component={CreateUserScreen} />
//       <Drawer.Screen name="Booking List" component={BookingListScreen} />
//       <Drawer.Screen name="All Booking List" component={AllBookingListScreen} />
//     </Drawer.Navigator>
//   );
// }

const AdminParking = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ParkingList"
        component={ParkingListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="UpdateParking" component={UpdateParkingScree} />
      <Stack.Screen name="Detail" component={GetParkingDetail} />
    </Stack.Navigator>
  );
};

const UserStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="UserList"
        component={UserListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="UpdateUser" component={UpdateUserScreen} />
    </Stack.Navigator>
  );
};
const Admin = (props) => {
  const { userId, type } = props.route.params;
  console.log(userId, type);
  const user = {
    userId: userId.toString(),
    type: type,
  };

  return (
    <UserId.Provider value={user}>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#FBA31F",
          },
          headerTintColor: "white",
          drawerActiveTintColor: "#FBA31F",
          headerRight: () => {
            return (
              <Button
                title="Log Out"
                color="white"
                onPress={() => {
                  props.navigation.reset({
                    index: 0,
                    routes: [{ name: "Log In" }],
                  });
                }}
              />
            );
          },
        }}
      >
        <Drawer.Screen name="Map View" component={MapViewScreen} />
        <Drawer.Screen name="All User" component={UserStack} />
        <Drawer.Screen name="Parking List" component={AdminParking} />
        <Drawer.Screen name="Create Parking" component={AddParkingScreen} />
        <Drawer.Screen name="Create User" component={RegisterScreen} />
        <Drawer.Screen
          name="All Booking List"
          component={AllBookingListScreen}
        />
      </Drawer.Navigator>
    </UserId.Provider>
  );
};

const MapDiraction = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="BookingList"
        component={BookingListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="DirectionScreen" component={DirectionScreen} />
    </Stack.Navigator>
  );
};
const Map = () => {
  return (
    <StripeProvider publishableKey="pk_test_51MDtzOBsZ5DeknzbtSoKvfAOpgY0HUmm5ZVCmaIFZgcjE0Qbkz5Zum7j3TEfbq8RO49VCBF7z7tmU3l5pKiklDTf00idaiIlS0">
      <Stack.Navigator>
        <Stack.Screen
          name="Map View"
          component={MapViewScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Payment" component={StripeApp} />
      </Stack.Navigator>
    </StripeProvider>
  );
};
const User = (props) => {
  const { userId, type } = props.route.params;
  console.log(userId, type);
  const user = {
    userId: userId.toString(),
    type: type,
  };

  return (
    <UserId.Provider value={user}>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#FBA31F",
          },
          headerTintColor: "white",
          drawerActiveTintColor: "#FBA31F",
          headerRight: () => {
            return (
              <Button
                title="Log Out"
                color="white"
                onPress={() => {
                  props.navigation.reset({
                    index: 0,
                    routes: [{ name: "Log In" }],
                  });
                }}
              />
            );
          },
        }}
      >
        <Drawer.Screen name="Map" component={Map} />
        <Drawer.Screen name="Booking List" component={MapDiraction} />
        {/* <Drawer.Screen name="DirectionScreen" component={DirectionScreen} /> */}
      </Drawer.Navigator>
    </UserId.Provider>
  );
};
const Parking = (props) => {
  // const { userId, type } = props.route.params;
  // console.log(userId, type);
  // const user = {
  //   userId: userId.toString(),
  //   type: type,
  // };

  return (
    // <UserId.Provider value={user}>
    <Stack.Navigator>
      <Drawer.Screen
        name="ParkingList"
        component={ParkingList}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Detail" component={GetParkingDetail} />
      <Stack.Screen name="UpdateParking" component={UpdateParkingScree} />
    </Stack.Navigator>
    // </UserId.Provider>
  );
};
const Owener = (props) => {
  const { userId, type } = props.route.params;
  console.log(userId, type);
  const user = {
    userId: userId.toString(),
    type: type,
  };

  return (
    <UserId.Provider value={user}>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#FBA31F",
          },
          headerTintColor: "white",
          drawerActiveTintColor: "#FBA31F",
          headerRight: () => {
            return (
              <Button
                title="Log Out"
                color="white"
                onPress={() => {
                  props.navigation.reset({
                    index: 0,
                    routes: [{ name: "Log In" }],
                  });
                }}
              />
            );
          },
        }}
      >
        <Drawer.Screen name="Parking List" component={Parking} />
        <Drawer.Screen name="Create Parking" component={AddParkingScreen} />
      </Drawer.Navigator>
    </UserId.Provider>
  );
};
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="Image" component={ImageScreen} /> */}
        <Stack.Screen
          options={{ headerShown: false }}
          component={Splash}
          name="Splash"
        />
        <Stack.Screen
          options={{ headerShown: false }}
          component={LogInScreen}
          name="Log In"
        />
        <Stack.Screen
          component={Admin}
          name="Home"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={User}
          name="User"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          component={Owener}
          name="Owner"
          options={{ headerShown: false }}
        />
        <Stack.Screen component={CreateUserScreen} name="Register" />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
