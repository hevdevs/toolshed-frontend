import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import {
  collection,
  getDocs,
  where,
  query,
  deleteDoc,
} from "firebase/firestore";

const UserRequests = () => {
  const [forumPosts, setForumPosts] = useState([]);
  const user = auth.currentUser;

  useEffect(async () => {
    try {
      const q = query(
        collection(db, "requests"),
        where("userInfo.userUid", "==", user.uid)
      );
      const requests = await getDocs(q);
      const requestArr = [];
      requests.forEach((doc) => {
        requestArr.push(doc.data());
      });
      setForumPosts(requestArr);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const handleDelete = async (requestId) => {
    await deleteDoc(doc(db, "requests", requestId));
  };

  return (
    <View style={styles.requestWrapper}>
      {forumPosts.length < 1 ? (
        <Text style={styles.noRequest}> No Current Requests</Text>
      ) : (
        forumPosts.map((post, index) => {
          return (
            <>
              <View style={styles.requestContainer} key={index}>
                <View style={styles.requestCard}>
                  <Text>{post.title}</Text>
                  <Text>{post.description}</Text>
                  <Text>{post.category}</Text>
                </View>

                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={handleDelete(post.requestUid)}
                >
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
            </>
          );
        })
      )}
    </View>
  );
};

export default UserRequests;

const styles = StyleSheet.create({
  requestWrapper: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  noRequest: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: "20%",
  },
  requestContainer: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    width: "100%",
  },
  requestCard: {
    alignItems: "center",
    width: "100%",
    padding: "5%",
    borderRadius: 5,
    margin: "5%",
    backgroundColor: "#FFF8F0",
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 15,
    width: "40%",
    borderRadius: 10,
    alignItems: "center",
  },
});
