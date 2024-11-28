import React from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";

const Category = ({ navigation }) => {
  const categories = [
    { id: "1", name: "Women's Fashion", image: require("./images/3.jpeg") },
    { id: "2", name: "Electronics", image: require("./images/E1.jpeg") },
    { id: "3", name: "Home & Living", image: require("./images/H1.jpeg") },
    { id: "4", name: "Beauty Products", image: require("./images/b2.jpeg") },
    { id: "5", name: "Sports & Outdoors", image: require("./images/S3.jpeg") },
  ];

  const renderCategory = ({ item }) => (
    <TouchableOpacity
    style={styles.categoryCard}
    onPress={() => navigation.navigate("Home", { selectedCategory: item.id})}
  >
    <Image source={item.image} style={styles.categoryImage} />
    <Text style={styles.categoryName}>{item.name}</Text>
  </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Categories</Text>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={renderCategory}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  list: {
    justifyContent: "space-between",
  },
  categoryCard: {
    flex: 1,
    margin: 10,
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  categoryImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Category;
