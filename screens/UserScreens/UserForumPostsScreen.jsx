import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { auth, db } from "../../firebase";
import {
  collection,
  getDocs,
  where,
  query,
  deleteDoc,
} from "firebase/firestore";

const UserForumPostsScreen = () => {
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
      console.log(requestArr);
      setForumPosts(requestArr);
    } catch (err) {
      console.log(err);
    }
  }, []);
  // console.log(forumPosts, "< posts");

  const handleDelete = async () => {
    await deleteDoc(doc(db, requests));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Requests</Text>
      <View style={styles.contentContainer}>
        <ScrollView style={styles.scroll}>
          {forumPosts.length < 1 ? (
            <Text style={styles.noRequest}>No Current Requests</Text>
          ) : (
            forumPosts.map((post, index) => {
              return (
                <>
                  <View style={styles.requests} key={post.index}>
                    <TouchableOpacity style={styles.requestCard}>
                      <Text>{post.title}</Text>
                      <Text>{post.description}</Text>
                      <Text>{post.category}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={handleDelete}
                    >
                      <Text>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </>
              );
            })
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export default UserForumPostsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F36433",
    width: "100%",
  },
  header: {
    margin: "5%",
    marginTop: "10%",
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFF8F0",
  },
  contentContainer: {
    width: "100%",
    padding: 0,
    margin: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9DD9D2",
  },
  noRequest: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: "20%",
  },
  requests: {
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    width: "100%",
  },
  requestCard: {
    alignItems: "center",
    width: "80%",
    padding: "5%",
    borderRadius: 5,
    margin: "5%",
    backgroundColor: "#FFF8F0",
  },
  deleteButton: {
    borderRadius: 5,
    backgroundColor: "#F36433",
    padding: 20,
  },
  scroll: {
    width: "100%",
    marginRight: "6%",
  },
});
