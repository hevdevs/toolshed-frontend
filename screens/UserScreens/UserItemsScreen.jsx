import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ItemCard, Image } from 'react-native';
import { storage, auth, db } from '../../firebase.js';
import React, { useState, useEffect} from 'react';
import { getDocs, doc, collection, where, query} from '@firebase/firestore';
import { getDownloadURL, ref } from "@firebase/storage";

const UserItemsScreen = ( {navigation} ) => {
    const [items, setItems] = useState([]);
    const [itemImage, setItemImage] = useState([]);
    const user = auth.currentUser; 

    const handleOnPress = () => {
        
    }
    
    // useEffect( async () => {
    //     try {
    //         const urlArray = [];
    //         items.map((item) => {
    //             const imageUrl = await getDownloadURL(ref(storage, `${item.imageUri}`));
    //             urlArray.push(imageUrl)
    //           })
    //           setItemImage(urlArray);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   }, []);

    useEffect( async () => {
        try {
            const q = query(
                collection(db, "items"),
                where("userInfo.userUid", "==", user.uid)
              );
            const items = await getDocs(q)
                const itemsArr = []
            items.forEach((doc) => {
    itemsArr.push(doc.data());
})  
setItems(itemsArr)
        }
        catch (err) {
            console.log(err);
        }
    }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.header}>ListedItems</Text>
      <View style={styles.contentContainer}>
          <ScrollView>
            {
                items.map((item, index) => {
                    return (
                        <View style={styles.itemContainer}>
                            <View>
                            <Image style={styles.image} source={{uri: item.imageUri}}/>
                            </View>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemDescription}>{item.description}</Text>
                            <Text>{item.category}</Text>
                            <TouchableOpacity style={styles.button} onPress={handleOnPress}>
                                <Text style={styles.buttonText}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })
            }
          </ScrollView>
      </View>
    </View>
  )
}

export default UserItemsScreen;

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
      itemContainer: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          margin: "10%",
      },
      image: {
          height: "60%",
          width: "60%",
      },
      button: {
        backgroundColor: "#0782f9",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
      },
      buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 12,
      },
})