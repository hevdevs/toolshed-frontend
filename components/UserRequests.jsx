import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Button,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  doc,
  collection,
  getDocs,
  where,
  query,
  deleteDoc,
} from "firebase/firestore";

const UserRequests = () => {
  const [forumPosts, setForumPosts] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const user = auth.currentUser;

  useEffect(async () => {
    try {
      setIsDeleted(false);
      const q = query(
        collection(db, "requests"),
        where("userInfo.userUid", "==", user.uid)
      );
      const requests = await getDocs(q);
      const requestArr = [];
      requests.forEach((doc) => {
        console.log("doc >>>>", doc);
        requestArr.push(doc.data());
      });
      setForumPosts(requestArr);
    } catch (err) {
      console.log(err);
    }
  }, [isDeleted]);

  const handleDelete = async (post) => {
    try {
      await deleteDoc(doc(db, "requests", post.requestUid));
      alert("Request deleted");
      setIsDeleted(true);
    } catch (err) {
      console.log(err);
      setIsDeleted(false);
    }
  };

  return (
    <View style={styles.cardContainer}>
      {forumPosts.length > 0 ? (
        forumPosts.map((post, index) => {
          return (
            <View style={styles.card} key={post.requestUid}>
              <Text style={styles.subheader}>{post.title}</Text>
              <Text style={styles.bodyDesc}>{`"${post.body}"`}</Text>
              <Text style={styles.bodyText}>Category: {post.category}</Text>
              <Pressable
                style={styles.button}
                onPress={() => handleDelete(post)}
              >
                <Text style={styles.text}>
                  <Ionicons name={"close-circle"} size={16} />
                  {` DELETE`}
                </Text>
              </Pressable>
            </View>
          );
        })
      ) : (
        <View style={styles.card}>
          <Text>No requests found</Text>
        </View>
      )}
    </View>
  );
};

export default UserRequests;

const styles = StyleSheet.create({
  cardContainer: {
    paddingTop: "4%",
    backgroundColor: "#FFF8F090",
    width: "80%",
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    borderBottomColor: "#F36433",
    borderBottomWidth: 2,
  },
  card: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingTop: "2%",
    padding: "5%",
    borderRadius: 5,
    margin: "5%",
    marginTop: 0,
    backgroundColor: "#FFF8F0",
  },
  button: {
    backgroundColor: "#F36433",
    padding: 15,
    width: "50%",
    borderRadius: 10,
    alignItems: "center",
    marginTop: "5%",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  subheader: {
    color: "#172121",
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: "5%",
    borderBottomColor: "#172121",
    borderBottomWidth: 1,
  },
  bodyText: {
    fontSize: 16,
    color: "#172121",
    fontWeight: "bold",
  },
  bodyDesc: {
    fontSize: 16,
    color: "#172121",
    fontWeight: "bold",
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: "5%",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF8F0",
  },
});
