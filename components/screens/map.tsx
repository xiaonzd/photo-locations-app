import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "../ui/button";
import AddSpot from "../modals/addSpot";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "./profile";

// Spot type
type Spot = {
  imageUri: string;
  location?: { latitude: number; longitude: number };
  locationName?: string;
  title?: string;
  description?: string;
  tags?: string[];
  category?: string;
};

export default function MapScreen() {
  const navigation = useNavigation();

  const [addSpotOpen, setAddSpotOpen] = useState(false);
  const [spots, setSpots] = useState<Spot[]>([]);

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {spots.map((spot, idx) =>
          spot.location ? (
            <Marker
              key={idx}
              coordinate={spot.location}
              title={spot.title || "Spot"}
              description={spot.description || ""}
            />
          ) : null
        )}
      </MapView>

      {/* Header */}
      <View style={styles.header}>
        <Button
          title="Search location..."
          onPress={() => console.log("Search")}
          Icon={MaterialIcons}
          iconName="search"
        />
        <Button
          title="PFP"
          onPress={() => navigation.navigate("profile")}
        />
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Button
          title="Explore"
          onPress={() => console.log("Explore")}
          Icon={MaterialIcons}
          iconName="travel-explore"
        />
        <Button
          title="Add Spot"
          onPress={() => setAddSpotOpen(true)}
          Icon={MaterialIcons}
          iconName="add"
        />
      </View>

      {/* Modal */}
      <AddSpot
        visible={addSpotOpen}
        onClose={() => setAddSpotOpen(false)}
        onSubmit={(spot) => setSpots(prev => [...prev, spot])}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footer: {
    position: "absolute",
    bottom: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
