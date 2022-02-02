import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  Picker,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { calculateDistance, getUserDataFromUid } from "../../utils";

import RequestCard from "../../components/ToolboardComponents/RequestCard";
import ActionButton from "react-native-action-button";
import * as Progress from "react-native-progress";

import AppLoading from "expo-app-loading";
import {
  Oxygen_400Regular,
  Oxygen_700Bold,
  useFonts,
} from "@expo-google-fonts/oxygen";

const ToolboardScreen = ({ navigation }) => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDistance, setSelectedDistance] = useState(15);
  const [newRequest, setNewRequest] = useState(false);

  const distances = [1, 2, 5, 10, 15, 20];

  useLayoutEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const userInfo = await getUserDataFromUid(auth.currentUser.uid);
        const unsubscribe = onSnapshot(
          collection(db, "requests"),
          (requestList) => {
            const requestArray = [];

            requestList.forEach((doc) => {
              if (
                selectedDistance === "Any" ||
                calculateDistance(
                  doc.data().userInfo.userLocation,
                  userInfo.userLocation
                ) < selectedDistance
              )
                requestArray.push(doc.data());
            });
            setRequests(requestArray);
            setIsLoading(false);
          }
        );
        return unsubscribe;
      } catch (err) {
        alert(err);
        console.log(err);
        setIsLoading(false);
      }
    })();
  }, [newRequest, selectedDistance]);

  const handlePress = () => {
    navigation.navigate("PostRequest", { setNewRequest });
  };

  let [fontsLoaded] = useFonts({
    Oxygen_400Regular,
    Oxygen_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Toolboard</Text>
      </View>
      <View style={styles.contentContainer}>
        <Picker
          selectedValue={selectedDistance}
          onValueChange={(itemValue) => setSelectedDistance(itemValue)}
        >
          <Picker.Item label={"Any"} value={"Any"} />
          {distances.map((distance) => {
            return (
              <Picker.Item
                label={`+${distance} miles`}
                value={distance}
                key={distance}
              />
            );
          })}
        </Picker>
        <ScrollView style={styles.scroll}>
          {requests.length ? (
            <RequestCard requests={requests} navigation={navigation} />
          ) : isLoading ? (
            <Progress.Circle
              size={50}
              indeterminate={true}
              style={styles.spinner}
              color={"#F36433"}
            />
          ) : (
            <View style={styles.noRequestsContainer}>
              <Text style={styles.noRequestsText}>
                No requests{" "}
                {selectedDistance === "All"
                  ? ""
                  : `within ${selectedDistance} mile${
                      selectedDistance === 1 ? "" : "s"
                    }`}
              </Text>
            </View>
          )}
          {/* // )} */}
        </ScrollView>
      </View>
      <ActionButton buttonColor="#F36433">
        <ActionButton.Item onPress={handlePress} title={"Post a Request"}>
          <Ionicons name={"help-circle"} size={24} color={"white"} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};

export default ToolboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#9DD9D2",
    fontFamily: "Oxygen_400Regular",
  },
  headerContainer: {
    paddingTop: "10%",
    backgroundColor: "#F36433",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    top: 0,
  },
  header: {
    margin: "5%",
    marginTop: "10%",
    fontSize: 28,
    fontFamily: "Oxygen_700Bold",
    color: "#FFF8F0",
    alignSelf: "center",
  },
  contentContainer: {
    marginTop: "40%",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#9DD9D2",
  },
  button: {
    backgroundColor: "#F36433",
    margin: "5%",
    padding: 10,
    borderRadius: 35,
    position: "relative",
    bottom: 0,
    alignSelf: "flex-end",
  },
  scroll: {
    padding: 0,
    margin: 0,
    width: "100%",
  },
  text: {
    color: "#FFF8F0",
    fontFamily: "Oxygen_700Bold",
    fontSize: 30,
  },
  spinner: {
    alignSelf: "center",
    marginTop: "60%",
  },
  noRequestsText: {
    color: "black",
    fontFamily: "Oxygen_700Bold",
    fontSize: 20,
  },
  noRequestsContainer: {
    marginTop: "40%",
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#9DD9D2",
    alignItems: "center",
  },
});
