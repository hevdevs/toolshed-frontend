import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../firebase";

import ToolSearch from "../../components/ToolshedComponents/ToolSearch";
import ItemCard from "../../components/ToolshedComponents/ItemCard";
import ActionButton from "react-native-action-button";
import * as Progress from "react-native-progress";

const ToolshedScreen = ({ navigation }) => {
  const [items, setItems] = useState([]);
  const [filteredTools, setFilteredTools] = useState([]);
  const [newItem, setNewItem] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const handlePress = () => {
    navigation.navigate("PostItem", { setNewItem });
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      try {
        const itemList = await getDocs(collection(db, "items"));
        const itemArray = [];
        itemList.forEach((doc) => {
          itemArray.push(Object.assign({ uid: doc.id }, doc.data()));
        });
        setItems(itemArray);
        setIsLoading(false)
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      try {
        const toolList = await getDocs(collection(db, "items"));
        const toolArray = [];
        toolList.forEach((doc) => {
          toolArray.push(Object.assign({ uid: doc.id }, doc.data()));
        })
        setFilteredTools(toolArray);
        setIsLoading(false);
      }
      catch (err) {
        console.log(err)
        setIsLoading(false);
      }
    })();
  }, [newItem]);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Toolshed</Text>
      </View>
      <View style={styles.contentContainer}>
        <ToolSearch
          style={styles.bar}
          items={items}
          setItems={setItems}
          navigation={navigation}
          setFilteredTools={setFilteredTools}
          filteredTools={filteredTools}
        />
        <ScrollView>
          {isLoading ? (
            <Progress.Circle style={styles.progressPie} size={50} indeterminate={true} color={"#F36433"} />
          ) : (
            <View style={styles.cardContainer}>
              {filteredTools.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("ItemScreen", { item });
                    }}
                    item={item}
                    key={index}
                  >
                    <ItemCard item={item} key={index} />
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
