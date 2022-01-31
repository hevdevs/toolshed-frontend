import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import React, {useState, useEffect} from 'react';
import { auth, db } from "../../firebase"
import {collection, getDocs, where, query} from "firebase/firestore"

const UserForumPostsScreen = () => {
  const [forumPosts, setForumPosts] = useState([])
    const user = auth.currentUser;

    useEffect( async() => {
try {

const requests = await getDocs(collection(db, "requests"))
const posts = requests.forEach((doc) => {
  return doc.userUid === user.uid;
})
console.log(posts);
} catch (err) {
console.log(err)
}
    }, [])

    return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Requests</Text>
      <View style={styles.contentContainer}>

      </View>
    </View>
  );
}

export default UserForumPostsScreen

const styles = StyleSheet.create ({
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
})