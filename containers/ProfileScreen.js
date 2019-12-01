import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Button,
  Clipboard,
  Image,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  View,
  ActionSheetIOS,
  TouchableOpacity
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

export default function ProfileScreen(props) {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  token = props.userToken;
  //get the user Token
  // console.log(user);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://airbnb-api.herokuapp.com/api/user/" + props.userId,
          {
            headers: { Authorization: "Bearer " + token }
          }
        );
        setUser(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log(user);
  // }, []);

  //set the photo process
  const share = useCallback(() => {
    Share.share({
      message: image,
      title: "Check out this photo",
      url: image
    });
  }, [image]);

  const copyToClipboard = useCallback(() => {
    Clipboard.setString(image);
    alert("Copied image URL to clipboard");
  }, [image]);

  const handleImagePicked = useCallback(async pickerResult => {
    let uploadResponse, uploadResult;

    try {
      setUploading(true);

      if (!pickerResult.cancelled) {
        uploadResponse = await uploadImageAsync(
          pickerResult.uri,
          props.userToken
        );
        // convert the response to JSON format
        uploadResult = await uploadResponse.json();

        if (Array.isArray(uploadResult) === true && uploadResult.length > 0) {
          setImage(uploadResult[0]);
        }
      }
    } catch (e) {
      alert("Upload failed! Retry later");
    } finally {
      setUploading(false);
    }
  });

  const takePhoto = useCallback(async () => {
    const { status: cameraPerm } = await Permissions.askAsync(
      Permissions.CAMERA
    );

    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    // only if user allows permission to camera AND camera roll
    if (cameraPerm === "granted" && cameraRollPerm === "granted") {
      const pickerResult = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3]
      });

      handleImagePicked(pickerResult);
    }
  });

  const pickImage = useCallback(async () => {
    const { status: cameraRollPerm } = await Permissions.askAsync(
      Permissions.CAMERA_ROLL
    );

    // only if user allows permission to camera roll
    if (cameraRollPerm === "granted") {
      const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1]
      });

      handleImagePicked(pickerResult);
    }
  }, []);

  return (
    <>
      {isLoading === true ? (
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="red" />
        </View>
      ) : (
        <>
          <View style={styles.profileDescription}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: user.account.photos[0] }}
                resizeMode="contain"
                style={styles.avatar}
              />
            </View>
            <Text style={styles.nametext}>{user.account.username}</Text>
            <Text style={styles.descriptiontext}>
              {user.account.description}
            </Text>
          </View>
          <View style={styles.container}>
            <StatusBar barStyle="default" />
            {/* <Text style={styles.exampleText}>
              Example: Upload ImagePicker result
            </Text> */}
            {/* <Button
              onPress={pickImage}
              title="Pick an image from camera roll"
            />
            <Button onPress={takePhoto} title="Take a photo" /> */}
            <TouchableOpacity
              onPress={() => {
                ActionSheetIOS.showActionSheetWithOptions(
                  {
                    options: ["Cancel", "take a photo", "camera roll"],
                    // destructiveButtonIndex: 1,
                    cancelButtonIndex: 0
                  },
                  buttonIndex => {
                    if (buttonIndex === 1) {
                      takePhoto();
                    } else {
                      pickImage();
                    }
                  }
                );
              }}
              title="open action sheet"
            >
              <Ionicons
                style={styles.icon}
                name="ios-camera"
                size={120}
                color="white"
              />
            </TouchableOpacity>
            {/* display the image after downloading */}
            {/* {image && (
              <View style={styles.maybeRenderContainer}>
                <View style={styles.maybeRenderImageContainer}>
                  <Image
                    source={{ uri: image }}
                    style={styles.maybeRenderImage}
                  />
                </View>
                
                <Text
                  onPress={copyToClipboard}
                  onLongPress={share}
                  style={styles.maybeRenderImageText}
                >
                  {image}
                </Text>
              </View>
            )} */}

            {uploading && (
              <View
                style={[StyleSheet.absoluteFill, styles.maybeRenderUploading]}
              >
                <ActivityIndicator color="#fff" size="large" />
              </View>
            )}
          </View>
        </>
      )}
    </>
  );
}

async function uploadImageAsync(uri, token) {
  const apiUrl = "https://airbnb-api.herokuapp.com/api/user/upload_picture";

  // Note:
  // Uncomment this if you want to experiment with local server
  //
  // if (Constants.isDevice) {
  //   apiUrl = `https://your-ngrok-subdomain.ngrok.io/upload`;
  // } else {
  //   apiUrl = `http://localhost:3000/upload`
  // }

  const uriParts = uri.split(".");
  const fileType = uriParts[uriParts.length - 1];

  const formData = new FormData();
  formData.append("picture", {
    uri,
    name: `photo.${fileType}`,
    type: `image/${fileType}`
  });

  const options = {
    method: "POST",
    body: formData,
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "multipart/form-data"
    }
  };

  return fetch(apiUrl, options);
}

const styles = StyleSheet.create({
  activity: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  profileDescription: {
    backgroundColor: "#FF5A5F",
    alignItems: "center",
    flex: 2,
    justifyContent: "center",
    padding: 10
  },
  imageContainer: {
    height: 100
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 40
  },
  nametext: {
    color: "white",
    fontSize: 30
  },
  descriptiontext: {
    color: "white",
    fontSize: 15
  },
  container: {
    backgroundColor: "#FF5A5F",
    alignItems: "center",
    flex: 1,
    justifyContent: "center"
  },
  exampleText: {
    fontSize: 20,
    marginBottom: 20,
    marginHorizontal: 15,
    textAlign: "center"
  },
  maybeRenderUploading: {
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center"
  },
  maybeRenderContainer: {
    borderRadius: 3,
    elevation: 2,
    marginTop: 30,
    shadowColor: "rgba(0,0,0,1)",
    shadowOpacity: 0.2,
    shadowOffset: {
      height: 4,
      width: 4
    },
    shadowRadius: 5,
    width: 250
  },
  maybeRenderImageContainer: {
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    overflow: "hidden",
    alignItems: "center"
  },
  maybeRenderImage: {
    height: 150,
    width: 150
  },
  maybeRenderImageText: {
    paddingHorizontal: 10,
    paddingVertical: 10
  }
});
