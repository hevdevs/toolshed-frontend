import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const ItemCard = ({ item }) => {
  const storage = getStorage();
  const [itemImage, setItemImage] = useState("");
  
  useEffect(() => {
    (async () => {
      try {
        const imageUrl = await getDownloadURL(
          ref(storage, `${item.imageUri}`)
        );
        setItemImage(imageUrl);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <View style={styles.card}>
      {itemImage ? (
        <Image style={styles.image} source={{ uri: itemImage }} />
      ) : null}
      <View>
        <Text style={styles.cardText}>{`${item.name} \n`}</Text>
        <Text style={styles.cardText}>{`${item.owner}`}</Text>
      </View>
    </View>
  );
};

export default ItemCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    width: "100%",
    padding: "5%",
    borderRadius: 5,
    marginBottom: "5%",
    backgroundColor: "#FFF8F0",
  },
  cardText: {
    marginRight: 0,
    marginLeft: "5%",
  },
  image: {
    width: 100,
    height: 100,
    padding: 0,
    margin: 0,
  },
});
