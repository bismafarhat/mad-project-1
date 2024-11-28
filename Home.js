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
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";

// import Login from "./Login";
// import Registration from "./Registration";

const Home = ({ navigation, route }) => {
  const { selectedCategory = null } = route.params || {};
  const [cartItems, setCartItems] = useState([]);

  const BASE_URL = "https://madcs-e2028-default-rtdb.firebaseio.com";

  const handleAddToCart = async (item) => {
    try {
      // First, check if the item already exists in the cart
      const response = await axios.get(`${BASE_URL}/cart.json`);
      const cartData = response.data || {};
      
      // Check if item is already in the cart
      const existingItem = Object.values(cartData).find(cartItem => cartItem.name === item.name);
      
      if (existingItem) {
        // If the item exists, increase the quantity
        const updatedQuantity = existingItem.quantity + 1;
        await axios.patch(`${BASE_URL}/cart/${existingItem.id}.json`, { quantity: updatedQuantity });
        alert("Item quantity updated!");
      } else {
        // If the item does not exist, add a new entry
        const newItem = {
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: 1, // Default quantity when added
        };
  
        // Send a POST request to save the item
        await axios.post(`${BASE_URL}/cart.json`, newItem);
        alert("Item added to cart!");
      }
  
      // Refresh the cart data after adding/updating
      getData();
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
            name: "Simple Dress",
            image: require("./images/6.jpeg"),
            price: "Rs.850",
            status: "Only 2 left",
          },
          {
            id: "1-2",
            name: "Elegant Dress",
            image: require("./images/7.jpeg"),
            price: "Rs.900",
            status: "Almost sold out",
          },
          {
            id: "1-3",
            name: "Casual Dress",
            image: require("./images/8.jpeg"),
            price: "Rs.1200",
            status: "New Arrival",
          },
          {
            id: "1-4",
            name: "Frock ",
            image: require("./images/9.jpeg"),
            price: "Rs.1500",
            status: "Limited Stock",
          },
          {
            id: "1-5",
            name: "Fancy Dress",
            image: require("./images/10.jpeg"),
            price: "Rs.1500",
            status: "Limited Stock",
          },
          {
            id: "1-6",
            name: "Maxi",
            image: require("./images/1.jpeg"),
            price: "Rs.1500",
            status: "Limited Stock",
          },
          {
            id: "1-7",
            name: "Pink Maxi",
            image: require("./images/2.jpeg"),
            price: "Rs.1500",
            status: "Limited Stock",
          },
          {
            id: "1-8",
            name: "Shalwar Qameez",
            image: require("./images/3.jpeg"),
            price: "Rs.1500",
            status: "Limited Stock",
          },
          {
            id: "1-9",
            name: "Casula Frock",
            image: require("./images/4.jpeg"),
            price: "Rs.1500",
            status: "Limited Stock",
          },
          {
            id: "1-10",
            name: "Gown",
            image: require("./images/5.jpeg"),
            price: "Rs.1500",
            status: "Limited Stock",
          },
        ],
      },
      {
        id: "2",
        name: "Electronics",
        products: [
          {
            id: "2-1",
            name: "Timer",
            image: require("./images/E1.jpeg"),
            price: "Rs.850",
            status: "Only 2 left",
          },
          {
            id: "2-2",
            name: "Mobile",
            image: require("./images/E11.jpeg"),
            price: "Rs.900",
            status: "Almost sold out",
          },
          {
            id: "2-3",
            name: "Tab",
            image: require("./images/E12.jpeg"),
            price: "Rs.1200",
            status: "New Arrival",
          },
          {
            id: "2-4",
            name: "Earbuds",
            image: require("./images/E10.jpeg"),
            price: "Rs.1500",
            status: "Limited Stock",
          },
          {
            id: "2-5",
            name: "Timer",
            image: require("./images/E9.jpeg"),
            price: "Rs.1500",
            status: "Limited Stock",
          },
          {
            id: "2-6",
            name: "Laptop",
            image: require("./images/E6.jpeg"),
            price: "Rs.1500",
            status: "Limited Stock",
          },
          {
            id: "2-7",
            name: "Wires",
            image: require("./images/E7.jpeg"),
            price: "Rs.1500",
            status: "Limited Stock",
          },
          {
            id: "2-8",
            name: "Watch",
            image: require("./images/E8.jpeg"),
            price: "Rs.1500",
            status: "Limited Stock",
          },
          {
            id: "2-9",
            name: "Timer",
            image: require("./images/E9.jpeg"),
            price: "Rs.1500",
            status: "Limited Stock",
          },
          {
            id: "2-10",
            name: "Earbuds",
            image: require("./images/E10.jpeg"),
            price: "Rs.1500",
            status: "Limited Stock",
          },
        ],
      },
      {
        id: "3",
        name: "Home & Living",
        products: [
          {
            id: "3-1",
            name: "Sofa",
            image: require("./images/H1.jpeg"),
            price: "Rs.850",
            status: "Only 2 left",
          },
          {
            id: "3-2",
            name: "3 Seater",
            image: require("./images/H2.jpeg"),
            price: "Rs.900",
            status: "Almost sold out",
          },
          {
            id: "3-3",
            name: "6 Seater",
            image: require("./images/H3.jpeg"),
            price: "Rs.1200",
            status: "New Arrival",
          },
          {
            id: "3-4",
            name: "Seater",
            image: require("./images/H4.jpeg"),
            price: "Rs.1500",
            status: "Limited Stock",
          },
          {
            id: "3-5",
            name: "Table",
            image: require("./images/H5.jpeg"),
            price: "Rs.1500",
            status: "Limited Stock",
          },
          {
            id: "3-6",
            name: "Chair",
            image: require("./images/H6.jpeg"),
            price: "Rs.1500",
            status: "Limited Stock",
          },
          {
            id: "3-7",
            name: "Stools",
            image: require("./images/H9.jpeg"),
            price: "Rs.1500",
            status: "Limited Stock",
          },
          {
            id: "3-8",
            name: "Cushions",
            image: require("./images/H10.jpeg"),
            price: "Rs.1500",
            status: "Limited Stock",
          },
          {
            id: "3-9",
            name: "6 Set Sofas",
            image: require("./images/H7.jpeg"),
            price: "Rs.1500",
            status: "Limited Stock",
          },
          {
            id: "3-10",
            name: "Sofa Chair",
            image: require("./images/H8.jpeg"),
            price: "Rs.1500",
            status: "Limited Stock",
          },
        ],
      },
      {
        id: "4",
        name: "Beauty Products",
        products: [
          {
            id: "4-1",
            name: "BlushOn",
            image: require("./images/b8.jpeg"),
            
            price: "Rs.850",
            status: "Only 2 left",
          },
          {
            id: "4-2",
            name: "Lipstick",
            image: require("./images/b9.jpeg"),
            price: "Rs.900",
            status: "Almost sold out",
          },
          {
            id: "4-3",
            name: "Brush",
            image: require("./images/b10.jpeg"),
            price: "Rs.1200",
            status: "New Arrival",
          },
          {
            id: "4-4",
            name: "Maskara",
            image: require("./images/b11.jpeg"),
            price: "Rs.1500",
            status: "Limited Stock",
          },
          {
            id: "4-5",
            name: "Base",
            image: require("./images/b12.jpeg"),
            price: "Rs.1500",
            status: "Limited Stock",
          },
          {
            id: "4-6",
            name: "Base & Brush",
            image: require("./images/b1.jpeg"),
            price: "Rs.1500",
            status: "Limited Stock",
          },
          {
            id: "4-7",
            name: "Cream",
            image: require("./images/b2.jpeg"),
            price: "Rs.1500",
            status: "Limited Stock",
          },
          {
            id: "4-8",
            name: "Kajal",
            image: require("./images/b3.jpg"),
            price: "Rs.1500",
            status: "Limited Stock",
          },
          {
            id: "4-9",
            name: "Serum",
            image: require("./images/b4.jpeg"),
            price: "Rs.1500",
            status: "Limited Stock",
          },
          {
            id: "4-10",
            name: "Gell",
            image: require("./images/b5.jpg"),
            price: "Rs.1500",
            status: "Limited Stock",
          },
        ],
      },
      {
        id: "5",
        name: "Sports & Outdoors",
        products: [
          {
            id: "5-1",
            name: "All Items",
            image: require("./images/S5.jpeg"),
            price: "Rs.850",
            status: "Only 2 left",
          },
          {
            id: "5-2",
            name: "Tenis",
            image: require("./images/S6.jpeg"),
            price: "Rs.900",
            status: "Almost sold out",
          },
          {
            id: "5-3",
            name: "Football",
            image: require("./images/S7.jpeg"),
            price: "Rs.1200",
            status: "New Arrival",
          },
          {
            id: "5-4",
            name: "Bat",
            image: require("./images/S8.jpeg"),
            price: "Rs.1500",
            status: "Limited Stock",
          },
          {
            id: "5-5",
            name: "Helmet",
            image: require("./images/S9.jpeg"),
            price: "Rs.1500",
            status: "Limited Stock",
          },
          {
            id: "5-6",
            name: "Table Tennis",
            image: require("./images/S10.jpeg"),
            price: "Rs.1500",
            status: "Limited Stock",
          },
          {
            id: "5-7",
            name: "Footballs",
            image: require("./images/S1.jpeg"),
            price: "Rs.1500",
            status: "Limited Stock",
          },
          {
            id: "5-8",
            name: "Badmentons",
            image: require("./images/S2.jpeg"),
            price: "Rs.1500",
            status: "Limited Stock",
          },
          {
            id: "5-9",
            name: "Football & Badmenton",
            image: require("./images/S3.jpeg"),
            price: "Rs.1500",
            status: "Limited Stock",
          },
          {
            id: "5-10",
            name: "All Items",
            image: require("./images/S4.jpeg"),
            price: "Rs.1500",
            status: "Limited Stock",
          },
        ],
      },
    ];

  const filteredCategories = selectedCategory
    ? categories.filter((category) => {
        console.log("Category ID:", category.id,"Selected Category: ",selectedCategory);  
        return category.id === selectedCategory;
      })
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

      {/* Login Buttons */}
      <View style={styles.buttonsContainer}>
        <Text style={styles.header}>PakStore</Text>
        {/* <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity> */}
      </View>
      
        
        {/* Search Bar */}
        {/* <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for products"
          />
         <TouchableOpacity style={styles.searchButtonContainer}>
  <Image source={require("./images/search.png")} style={styles.search} />
</TouchableOpacity>
        </View> */}

    

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
  authButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  searchBar: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 10,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
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
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  search: {
    width: 22,
    height: 22,
    resizeMode: "contain",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: "#007BFF",
    paddingVertical: 14,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginHorizontal: 5,
    elevation: 6,
    borderWidth: 1,
    borderColor: "#0056b3",
    marginLeft:"850px"
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1,
    
  },
  buttonHover: {
    backgroundColor: "#0056b3",
    borderColor: "#003d80",
  },
  buttonActive: {
    backgroundColor: "#003d80",
    borderColor: "#002750",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 20,
  },
  categorySection: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  productCard: {
    width: 150,
    marginRight: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  productImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginHorizontal: 10,
    color: "#333",
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "bold",
    marginVertical: 5,
    marginHorizontal: 10,
    color: "#007BFF",
  },
  productStatus: {
    fontSize: 12,
    color: "#f00",
    marginHorizontal: 10,
  },
  addButton: {
    paddingVertical: 8,
    marginTop: 10,
    marginBottom: 15,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  productCardHover: {
    backgroundColor: "#f1f1f1",
  },
  authButtonText: {
    color: "#fff",
    fontSize: 14,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#007BFF",
    marginBottom:"30px"
  },
});


export default Home;
