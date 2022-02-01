import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

import { auth, db } from "../../firebase";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";

const RequestScreen = ({ route, navigation }) => {
  const { req } = route.params;

  const handlePress = async () => {
    try {
      const messageId =
        req.userInfo.userUid < auth.currentUser.uid
          ? `${auth.currentUser.uid}-${req.userInfo.userUid}`
          : `${req.userInfo.userUid}-${auth.currentUser.uid}`;
      await updateDoc(doc(db, `users/${auth.currentUser.uid}`), {
        chats: arrayUnion(messageId),
      });
      await updateDoc(doc(db, `users/${req.userInfo.userUid}`), {
        chats: arrayUnion(messageId),
      });

      navigation.navigate("ChatScreen", {
        messageId,
        userUsername: `${req.userInfo.userFirstName} ${req.userInfo.userSurname}`,
      });
    } catch (err) {
      alert("Error: Could not create chat");
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Toolboard</Text>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.whiteBox}>
          <Text style={styles.subheader}>
            Request sent by {req.userInfo.userUsername}
          </Text>
          <Text style={styles.subheader}>
            ({req.userInfo.userFirstName}
            {req.userInfo.userSurname})
          </Text>
          <Text style={styles.subheader}>{`Looking for: ${req.title}`}</Text>
          <View style={styles.bodyTextWrapper}>
            <Text style={styles.bodyDesc}>{`"${req.body}"`}</Text>
          </View>
          <Text style={styles.bodyText}> Category: {`${req.category}`}</Text>
          <Text style={styles.bodyText}>
            {" "}
            Date posted: {`${req.timestamp.date} ${req.timestamp.time}`}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handlePress}
        itemOwner={req.owner}
      >
        <Text style={styles.text}>
          MESSAGE <Ionicons name={"paper-plane"} size={16} />
        </Text>
      </TouchableOpacity>
      <Pressable
        title="View Map"
        style={styles.button}
        onPress={() => {
          navigation.navigate("MapScreen", { item: req });
        }}
      >
        <Text style={styles.text}>
          VIEW MAP <Ionicons name={"map"} size={16} />
        </Text>
      </Pressable>
      <Pressable
        style={styles.button}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Text style={styles.text}>
          <Ionicons name={"arrow-back-circle"} size={16} />
          {" BACK"}
        </Text>
      </Pressable>
    </View>
  );
};

export default RequestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    backgroundColor: "#9DD9D2",
  },
  whiteBox: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF8F0",
    width: "90%",
    padding: "5%",
    margin: "5%",
    borderRadius: 5,
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
    fontWeight: "bold",
    color: "#FFF8F0",
    textAlign: "center",
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#F36433",
    margin: "3%",
    padding: 10,
    borderRadius: 5,
    width: 200,
    alignItems: "center",
  },
  image: {
    justifyContent: "center",
    height: 200,
    width: 200,
    borderRadius: 5,
  },
  contentContainer: {
    width: "100%",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF8F0",
  },
  subheader: {
    color: "#172121",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: "2%",
  },
  bodyTextWrapper: {
    width: "80%",
    margin: "5%",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    borderTopColor: "#172121",
    borderTopWidth: 1,
    borderBottomColor: "#172121",
    borderBottomWidth: 1,
    paddingTop: "5%",
    paddingBottom: "5%",
  },
  bodyText: {
    fontSize: 20,
    color: "#172121",
    fontWeight: "bold",
    textAlign: "center",
  },
  bodyDesc: {
    fontSize: 20,
    color: "#172121",
    fontWeight: "bold",
    textAlign: "center",
    fontStyle: "italic",
  },
});
