import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Picker,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  collection,
  getDocs,
  updateDoc,
  doc,
  where,
  query,
} from "firebase/firestore";
import { db, auth } from "../../firebase";
import {
  getUserDataFromUid,
  calculateDistance,
  updateItemLocationFormat,
} from "../../utils";

import ToolSearch from "../../components/ToolshedComponents/ToolSearch";
import ItemCard from "../../components/ToolshedComponents/ItemCard";
import ActionButton from "react-native-action-button";
import * as Progress from "react-native-progress";

const ToolshedScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [filteredTools, setFilteredTools] = useState([]);
  const [newItem, setNewItem] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDistance, setSelectedDistance] = useState(15);
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState("");

  const categories = [
    "All",
    "DIY",
    "Household",
    "Kitchen",
    "Electronics",
    "Arts and Crafts",
    "Garden",
    "Furniture",
  ];

  const distances = [1, 2, 5, 10, 15, 20];

  const handlePress = () => {
    navigation.navigate("PostItem", { setNewItem });
  };

  const resetFilter = () => {
    setSearchQuery("");
    setSearch("");
    setSelectedDistance(15);
    setSelectedCategory("All");
  };

  useEffect(() => {
    (async () => {
      // setIsLoading(true);
      try {
        const itemList =
          selectedCategory === "All"
            ? await getDocs(collection(db, "items"))
            : await getDocs(
                query(
                  collection(db, "items"),
                  where("category", "==", `${selectedCategory}`)
                )
              );
        const userInfo = await getUserDataFromUid(auth.currentUser.uid);
        const itemArray = [];
        itemList.forEach((item) => {
          const data = item.data();
          if (
            selectedDistance === "Any" ||
            calculateDistance(
              data.userInfo.userLocation,
              userInfo.userLocation
            ) < selectedDistance
          ) {
            itemArray.push(Object.assign({ uid: item.id }, item.data()));
          }
        });
        let filteredItems = !searchQuery
          ? itemArray
          : itemArray.filter((item) => {
              let itemCased = item.name.toLowerCase();
              let lowerSearch = searchQuery.toLowerCase();
              let regex = new RegExp(`(${lowerSearch})`, "g");
              return itemCased.match(regex);
            });
        setItems(filteredItems);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [newItem, selectedCategory, searchQuery, selectedDistance]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Toolshed</Text>
      </View>
      <View style={styles.contentContainer}>
        <ToolSearch
          style={styles.bar}
          setSearchQuery={setSearchQuery}
          search={search}
          setSearch={setSearch}
        />
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
        >
          {categories.map((category, index) => {
            return (
              <Picker.Item
                label={`${category}`}
                value={`${category}`}
                key={index}
              />
            );
          })}
        </Picker>
        <Picker
          selectedValue={selectedDistance}
          onValueChange={(itemValue) => setSelectedDistance(itemValue)}
        >
          <Picker.Item label={"Any"} value={"Any"} />
          {distances.map((distance, index) => {
            return (
              <Picker.Item
                label={`+${distance} miles`}
                value={distance}
                key={index}
              />
            );
          })}
        </Picker>
        <Text style={{ fontWeight: "bold", textAlign: "center" }}>
          {searchQuery || "All items"}{" "}
          {selectedCategory !== "All"
            ? `in category: ${selectedCategory} `
            : ""}
          within {selectedDistance} miles
        </Text>
        <Pressable onPress={resetFilter}>
          <Text>Clear filters</Text>
        </Pressable>
        <ScrollView>
          <View style={styles.cardContainer}>
            {items.map((item) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("ItemScreen", { item });
                  }}
                  item={item}
                  key={item.uid}
                >
                  <ItemCard item={item} />
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <ActionButton buttonColor="#F36433">
        <ActionButton.Item onPress={handlePress} title={"Post a Tool"}>
          <Ionicons name={"build"} size={24} color={"white"} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};

export default ToolshedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#9DD9D2",
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
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
    alignSelf: "center",
  },
  contentContainer: {
    marginTop: "40%",
    width: "100%",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#9DD9D2",
  },
  bar: {
    width: "100%",
  },
  button: {
    backgroundColor: "#F36433",
    margin: "5%",
    padding: 10,
    borderRadius: 35,
    position: "relative",
    bottom: 0,
    alignSelf: "flex-end",
  },
  text: {
    color: "#FFF8F0",
    fontWeight: "bold",
    fontSize: 30,
  },
  progressPie: {
    alignSelf: "center",
  },
});
