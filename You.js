import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";

const You = ({ navigation, user }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.username}>{user?.name || "Guest"}</Text>
        <View style={styles.actions}>
          <Text style={styles.actionText}>Support</Text>
          <Text style={styles.actionText}>Settings</Text>
        </View>
      </View>

      <Text style={styles.freeShippingText}>Free shipping on all orders</Text>
      <Text style={styles.limitedOfferText}>Limited-time offer</Text>

      <View style={styles.section}>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Messages</Text>
          <Text style={styles.badge}>19</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Your orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Your reviews</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Coupons & offers</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Credit balance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.row}>
          <Text style={styles.rowText}>Addresses</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  username: { fontSize: 18, fontWeight: "bold" },
  actions: { flexDirection: "row" },
  actionText: { marginLeft: 10, color: "#007BFF", fontWeight: "bold" },
  freeShippingText: { color: "green", fontWeight: "bold" },
  limitedOfferText: { color: "orange", marginBottom: 10 },
  section: { borderTopWidth: 1, borderColor: "#ddd", marginTop: 10, paddingTop: 10 },
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 10, borderBottomWidth: 1, borderColor: "#ddd" },
  rowText: { fontSize: 16 },
  badge: { backgroundColor: "red", color: "#fff", borderRadius: 15, paddingHorizontal: 10, fontSize: 14, alignSelf: "center" },
});

export default You;
