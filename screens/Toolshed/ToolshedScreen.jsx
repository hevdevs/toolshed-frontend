import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
  Picker,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  collection,
  getDocs,
  updateDoc,
  doc,
  where,
  query,
  onSnapshot,
  orderBy,
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
import AppLoading from "expo-app-loading";
import {
  Oxygen_400Regular,
  Oxygen_700Bold,
  useFonts,
} from "@expo-google-fonts/oxygen";

const ToolshedScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [filteredTools, setFilteredTools] = useState([]);
  const [newItem, setNewItem] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDistance, setSelectedDistance] = useState(15);
  const [displayFilter, setDisplayFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [availableOnly, setAvailableOnly] = useState(true);
  const [isEnabled, setIsEnabled] = useState(false);

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
    setDisplayFilter(false);
  };

  const handleDisplayFilter = () => {
    setDisplayFilter((currDisplay) => !currDisplay);
  };

  useLayoutEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const unsubscribe = onSnapshot(
          selectedCategory === "All"
            ? query(
                collection(db, "items"),
                orderBy("timestamp.fullStamp", "desc")
              )
            : query(
                collection(db, "items"),
                where("category", "==", `${selectedCategory}`),
                orderBy("timestamp.fullStamp", "desc")
              ),
          async (itemList) => {
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
                if (!availableOnly || (availableOnly && data.available))
                  itemArray.push(Object.assign({ uid: item.itemUid }, data));
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
            setIsLoading(false);
          }
        );
        return unsubscribe;
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    })();
  }, [newItem, selectedCategory, searchQuery, selectedDistance, availableOnly]);

  let [fontsLoaded] = useFonts({
    Oxygen_400Regular,
    Oxygen_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const toggleIsAvailableFilter = async () => {
    setIsEnabled((previousState) => !previousState);
    setAvailableOnly((previousState) => !previousState);
  };

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
        <Pressable style={styles.dropdown} onPress={handleDisplayFilter}>
          <Text style={styles.text}>
            {`Filter `}
            <Text style={styles.arrow}>
              {displayFilter ? (
                <Ionicons name={"caret-up-circle"} size={16} color={"white"} />
              ) : (
                <Ionicons
                  name={"caret-down-circle"}
                  size={16}
                  color={"white"}
                />
              )}
            </Text>
          </Text>
        </Pressable>
        {displayFilter ? (
          <View style={styles.filter}>
            <Text style={styles.toggleText}>Filter item list by category</Text>
            <TouchableOpacity style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
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
            </TouchableOpacity>
            <Text style={styles.toggleText}>Filter item list by distance</Text>
            <TouchableOpacity style={styles.pickerContainer}>
              <Picker
                style={styles.picker}
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
            </TouchableOpacity>
            <View style={styles.toggleAvailable}>
              <Text style={styles.toggleText}>Filter unavailable items</Text>
              <Switch
                trackColor={{ false: "#9DD9D2", true: "#F36433" }}
                thumbColor={availableOnly ? "#2DC2BD" : "#2DC2BD"}
                onValueChange={toggleIsAvailableFilter}
                value={availableOnly}
                label="Toggle"
              />
            </View>
            <Pressable onPress={resetFilter} style={styles.resetFilter}>
              <Text style={styles.text}>
                <Ionicons name={"close-circle"} size={20} color={"white"} />
                CLEAR
              </Text>
            </Pressable>
          </View>
        ) : null}
        <ScrollView>
          {isLoading ? (
            <Progress.Circle
              size={50}
              indeterminate={true}
              style={styles.progressPie}
              color={"#F36433"}
            />
          ) : (
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
          )}
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
    fontFamily: "Oxygen_400Regular",
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
    margin: "10%",
    marginTop: "10%",
    fontSize: 28,
    fontFamily: "Oxygen_700Bold",
    color: "#FFF8F0",
    alignSelf: "center",
  },
  contentContainer: {
    marginTop: "30%",
    width: "100%",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#9DD9D2",
  },
  filter: {
    alignItems: "center",
    width: "90%",
    justifyContent: "center",
    margin: "5%",
    marginTop: 0,
    marginBottom: 0,
    paddingBottom: "5%",
    backgroundColor: "#FFF8F0",
    borderBottomColor: "#172121",
    borderBottomWidth: 2,
  },
  picker: {
    width: 200,
  },
  pickerContainer: {
    margin: "2%",
    backgroundColor: "#9DD9D2",
    alignSelf: "center",
    alignItems: "center",
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
    fontFamily: "Oxygen_700Bold",
    fontSize: 20,
  },
  toggleText: {
    paddingTop: "3.5%",
    fontSize: 16,
  },
  progressPie: {
    alignSelf: "center",
  },
  resetFilter: {
    backgroundColor: "#F36433",
    margin: "5%",
    marginBottom: 0,
    padding: 10,
    borderRadius: 5,
    position: "relative",
    bottom: 0,
    alignSelf: "center",
  },
  text: {
    color: "#FFF8F0",
    fontFamily: "Oxygen_700Bold",
    fontSize: 16,
    fontWeight: "bold",
  },
  switch: {
    bottom: -35,
    right: -70,
    position: "absolute",
  },
  toggleAvailable: {
    flexDirection: "row",
    justifyContent: "center",
  },
  dropdown: {
    backgroundColor: "#F36433",
    margin: "5%",
    width: "100%",
    alignSelf: "center",
    marginBottom: 0,
    marginTop: 0,
    padding: 10,
    position: "relative",
    bottom: 0,
    alignItems: "center",
    borderTopColor: "#172121",
    borderTopWidth: 1,
  },
});
