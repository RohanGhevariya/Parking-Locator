import React from "react";
import { View, Image, Button, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
export default class ImageScreen extends React.Component {
  state = {
    photo: "",
  };

  handleChoosePhoto = async () => {
    const response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });
    console.log(response);
    this.setState({ photo: response.assets[0] });
  };

  handleUploadPhoto = () => {
    const formData = new FormData();
    formData.append("image", {
      name: new Date() + "_profile",
      uri: this.state.photo.uri,
      type: "image/jpg",
    });
    axios
      .post("http://192.168.29.10:5000/api/parking/image", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          //   authorization: `JWT ${token}`,
        },
      })
      .then((response) => response.data)
      .then((response) => {
        console.log("upload succes", response);
        alert("Upload success!");
        this.setState({ photo: null });
      })
      .catch((error) => {
        console.log("upload error", error);
        alert("Upload failed!");
      });
  };

  render() {
    const { photo } = this.state;

    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        {photo && (
          <React.Fragment>
            <Image
              source={{ uri: photo.uri }}
              style={{ width: 300, height: 300 }}
            />
            <Button title="Upload" onPress={this.handleUploadPhoto} />
          </React.Fragment>
        )}
        <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
      </View>
    );
  }
}
