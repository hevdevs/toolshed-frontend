import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ItemCard, Image } from 'react-native';
import { auth, db } from '../../firebase.js';
import React, { useState, useEffect} from 'react';
import { getDocs, doc, collection, where, query} from '@firebase/firestore';

const UserItemsScreen = ( {navigation} ) => {
    const [items, setItems] = useState([]);
    const user = auth.currentUser; 
    

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
                            <Image source={{uri: item.imageUri}}/>
                            </View>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemDescription}>{item.description}</Text>
                            <Text>{item.category}</Text>
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
          margin: "5%",
      }
})