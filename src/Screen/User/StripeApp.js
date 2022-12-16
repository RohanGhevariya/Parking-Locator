import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { BASE_URL } from "../../../Api/Api";
import axios from "axios";

//ADD localhost address of your server
const API_URL = "http://localhost:3000";

const StripeApp = (props) => {
  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();
  const { item } = props.route.params;
  const fetchPaymentIntentClientSecret = async () => {
    console.log();
    const data = {
      amount: `${item.price}99`,
      method: "card",
    };
    const response = await axios.post(
      BASE_URL + "/create-payment-intent",
      data
    );
    const { clientSecret, error } = response.data;
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    //1.Gather the customer's billing information (e.g., email)
    if (!cardDetails?.complete || !email) {
      Alert.alert("Please enter Complete card details and Email");
      return;
    }
    const billingDetails = {
      email: email,
      amount: item.price,
    };
    //2.Fetch the intent client secret from the backend
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //2. confirm the payment
      if (error) {
        console.log("Unable to process payment");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
        });
        // if (error) {
        //   alert(`Payment Confirmation Error ${error.message}`);
        // } else if (paymentIntent) {
        alert("Payment Successful");
        console.log("Payment successful ", paymentIntent);
        // }
      }
    } catch (e) {
      console.log(e);
    }
    //3.Confirm the payment with the card details
  };

  return (
    <View style={styles.container}>
      <View style={{}}>
        <Image
          source={require("../Admin/credit-card.png")}
          style={{
            height: 300,
            width: 300,
            alignContent: "center",
            alignSelf: "center",
            marginBottom: 10,
          }}
        ></Image>
      </View>
      <View
        style={{
          padding: "4%",
          height: 230,
          width: "100%",
          backgroundColor: "white",
          borderRadius: 10,
          marginBottom: 20,
        }}
      >
        <TextInput
          autoCapitalize="none"
          placeholder="E-mail"
          keyboardType="email-address"
          onChange={(value) => setEmail(value.nativeEvent.text)}
          style={styles.input}
        />
        <TextInput
          autoCapitalize="none"
          placeholder="Price"
          keyboardType="email-address"
          value={item.price.toString()}
          style={[styles.input, { marginTop: 20 }]}
        />
        <CardField
          postalCodeEnabled={true}
          placeholder={{
            number: "4242 4242 4242 4242",
          }}
          cardStyle={styles.card}
          style={styles.cardContainer}
          onCardChange={(cardDetails) => {
            setCardDetails(cardDetails);
          }}
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: "#FFA047",
          width: "50%",
          height: 40,
          alignItems: "center",
          alignContent: "center",
          alignSelf: "center",
          borderRadius: 10,
        }}
        onPress={handlePayPress}
        disabled={loading}
      >
        <Text
          style={{
            color: "white",
            alignSelf: "center",
            alignContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          Pay
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default StripeApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    height: 10,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
    borderWidth: 0.5,
  },
  card: {
    backgroundColor: "#ffffff",
    borderWidth: 0.5,
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
    borderWidth: 0.5,
    borderRadius: 8,
  },
});
