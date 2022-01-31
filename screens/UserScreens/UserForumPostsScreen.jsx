import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, {useState, useEffect} from 'react';
import { auth, db } from "../../firebase"
import {collection, getDocs, where, query, deleteDoc} from "firebase/firestore"

const UserForumPostsScreen = () => {
    const [forumPosts, setForumPosts] = useState([]);
    const user = auth.currentUser; 

    useEffect( async () => {
        try {
            const q = query(
                collection(db, "requests"),
                where("userInfo.userUid", "==", user.uid)
              );
            const requests= await getDocs(q)
                const requestArr = []
            requests.forEach((doc) => {
    requestArr.push(doc.data());
})  
setForumPosts(requestArr)

        }
        catch (err) {
            console.log(err);
        }
    }, [])
console.log(requests, "< items")

const handleDelete = async () => {
await deleteDoc(doc(db, requests, request.uid))
}

    return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Requests</Text>
      <View style={styles.contentContainer}>
        {forumPosts.map((post) => {
            return (
                <>
                <View>
                <TouchableOpacity>
                <Text>{post.title}</Text>
                <Text>{post.description}</Text>
                <Text>{post.category}</Text>
               </TouchableOpacity> 
               <TouchableOpacity onPress={handleDelete}>
                   <Text>Delete</Text>
               </TouchableOpacity>
               </View>
                </>
            )
        })}
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