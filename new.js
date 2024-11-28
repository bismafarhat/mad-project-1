import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

const Home = ({ navigation, route }) => {
  const { selectedCategory = null } = route.params || {};
  const BASE_URL = "https://madcs-e2028-default-rtdb.firebaseio.com";
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart data
  const getCartData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/cart.json`);
      const cartData = response.data ? Object.values(response.data) : [];
      setCartItems(cartData);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  // Add to cart logic
  const handleAddToCart = async (item) => {
    try {
      const response = await axios.get(`${BASE_URL}/cart.json`);
      const cartData = response.data || {};
      const existingItem = Object.entries(cartData).find(
        ([, cartItem]) => cartItem.name === item.name
      );

      if (existingItem) {
        const [id, cartItem] = existingItem;
        await axios.patch(`${BASE_URL}/cart/${id}.json`, {
          quantity: cartItem.quantity + 1,
        });
        alert("Item quantity updated!");
      } else {
        await axios.post(`${BASE_URL}/cart.json`, {
          ...item,
          quantity: 1,
        });
        alert("Item added to cart!");
      }
      getCartData();
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const categories = [
    {
      id: "1",
      name: "Women's Fashion",
      products: [
        {
          id: "1-1",
          name: "Retro Dress",
          image: require("./images/1.jpeg"),
          price: "Rs.850",
          status: "Only 2 left",
        },
        {
          id: "1-2",
          name: "Elegant Dress",
          image: require("./images/2.jpeg"),
          price: "Rs.900",
          status: "Almost sold out",
        },
      ],
    },
    {
      id: "2",
      name: "Electronics",
      products: [
        {
          id: "2-1",
          name: "Smartphone",
          image: require("./images/E1.jpeg"),
          price: "Rs.12000",
          status: "Limited Stock",
        },
        {
          id: "2-2",
          name: "Headphones",
          image: require("./images/E2.jpeg"),
          price: "Rs.3500",
          status: "In Stock",
        },
      ],
    },
  ];

  const filteredCategories = selectedCategory
    ? categories.filter((category) => category.id === selectedCategory)
    : categories;

  const renderProduct = (product) => (
    <View style={styles.productCard}>
      <Image source={product.image} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>{product.price}</Text>
      <Text style={styles.productStatus}>{product.status}</Text>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => handleAddToCart(product)}
      >
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );

  const Separator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      {/* Top Navigation */}
      <View style={styles.buttonsContainer}>
        <Text style={styles.header}>PakStore</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for products"
        />
        <TouchableOpacity style={styles.searchButtonContainer}>
          <Image source={require("./images/search.png")} style={styles.search} />
        </TouchableOpacity>
      </View>

      {/* Product Categories */}
      <FlatList
        data={filteredCategories}
        keyExtractor={(item) => item.id}
        renderItem={({ item: category }) => (
          <View style={styles.categorySection}>
            <Text style={styles.categoryTitle}>{category.name}</Text>
            <FlatList
              data={category.products}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(product) => product.id}
              renderItem={({ item }) => renderProduct(item)}
            />
          </View>
        )}
        ItemSeparatorComponent={Separator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007BFF",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  searchBar: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    margin: 20,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 15,
    height: 45,
    fontSize: 16,
    color: "#333",
  },
  searchButtonContainer: {
    marginLeft: 10,
    padding: 8,
    borderRadius: 50,
    backgroundColor: "#007BFF",
  },
  search: {
    width: 22,
    height: 22,
  },
  categorySection: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginRight: 10,
    width: 150,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  productImage: {
    width: "100%",
    height: 100,
    resizeMode: "contain",
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  productStatus: {
    fontSize: 12,
    color: "#888",
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 8,
    borderRadius: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontSize: 14,
  },
});

export default Home;
