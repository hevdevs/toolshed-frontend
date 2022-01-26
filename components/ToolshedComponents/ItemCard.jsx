import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { Card } from 'react-native-paper';

const ItemCard = ({ item }) => {
    
    const storage = getStorage();
    const [itemImage, setItemImage] = useState("");

    useEffect(() => {
        (async () => {
            try {
                const imageUrl = await getDownloadURL(ref(storage, "images/MOCK-IMAGE.jpg"));
                setItemImage(imageUrl)
            } catch (err) {
                console.log(err)
            }
        })();
    }, []);

  return (
      <View style={styles.card}>
          {itemImage ? <Image style={styles.image} source={{ uri: itemImage }} /> : null}
          <View style={styles.cardText}>
          <Text style={styles.text}>{`${item.name} \n`}</Text>
              <Text style={styles.text}>{`${item.username}`}</Text>
          </View>
    </View>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#FAF9F6",
    width: "90%",
    padding: "5%",
    borderRadius: 5,
    margin: "5%",
  },
    cardText: {
      marginLeft: "5%",
  },
  image: {
    width: 100,
    height: 100,
    padding: 0,
    margin: 0,
  },
});
