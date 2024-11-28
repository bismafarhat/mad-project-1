import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Modal } from "react-native";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false); // State for Modal visibility
  const BASE_URL = "https://madcs-e2028-default-rtdb.firebaseio.com";

  // Fetch cart data from Firebase
  const getData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/cart.json`);
      if (response.status === 200) {
        const data = response.data || {};
        const formattedData = Object.entries(data).map(([id, value]) => ({
          id,
          ...value,
        }));
        setCartItems(formattedData);
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  // Update quantity in Firebase
  const updateCartItemQuantity = async (id, newQuantity) => {
    try {
      await axios.patch(`${BASE_URL}/cart/${id}.json`, { quantity: newQuantity });
      alert("Quantity updated!");
      getData();
    } catch (error) {
      console.error("Error updating item quantity:", error);
    }
  };

  // Delete item from Firebase
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/cart/${id}.json`);
      alert("Item deleted!");
      getData();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  // Increase quantity
  const increaseQuantity = (id, quantity) => updateCartItemQuantity(id, quantity + 1);

  // Decrease quantity
  const decreaseQuantity = (id, quantity) => {
    if (quantity > 1) {
      updateCartItemQuantity(id, quantity - 1);
    }
  };

  // Calculate total price
  const calculateTotal = () => {
    let total = cartItems.reduce((total, item) => {
      const price = isNaN(Number(item.price)) ? 0 : Number(item.price);
      const quantity = isNaN(Number(item.quantity)) ? 0 : Number(item.quantity);
      return total + price * quantity;
    }, 0);

    return Math.floor(total); // Round down to the nearest integer
  };

  // Handle checkout button click
  const handleCheckout = () => {
    setIsModalVisible(true); // Show the modal on button click
  };

  // Close the modal
  const closeModal = () => {
    setIsModalVisible(false); // Hide the modal
  };

  // UseEffect to fetch cart data on mount
  useEffect(() => {
    getData();
  }, []);

  // Render each cart item
  const renderItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>{item.price}</Text>
        <View style={styles.quantityControls}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => decreaseQuantity(item.id, item.quantity)}
          >
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => increaseQuantity(item.id, item.quantity)}
          >
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
          />
          <View style={styles.footer}>
            
            <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
              <Text style={styles.checkoutText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>

          {/* Modal for checkout confirmation */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={isModalVisible}
            onRequestClose={closeModal} // Close modal on back button
          >
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>Checkout Successful!</Text>
                <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                  <Text style={styles.modalButtonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </>
      ) : (
        <View style={styles.emptyCart}>
          <Text style={styles.emptyText}>Your cart is empty!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  cartItem: {
    flexDirection: "row",
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
    justifyContent: "center",
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 14,
    color: "#333",
    marginVertical: 5,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  quantityButton: {
    backgroundColor: "#007BFF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  quantityText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  quantity: {
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    marginTop: 20,
    alignItems: "center",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  checkoutButton: {
    marginTop: 10,
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  checkoutText: {
    color: "#fff",
    fontSize: 16,
  },
  emptyCart: {
    alignItems: "center",
    marginTop: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: 300,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Cart;
