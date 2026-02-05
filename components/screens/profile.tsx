import React, { useState } from "react";
import { Image, Text, View, StyleSheet, useWindowDimensions, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "../ui/button";
import type { RootStackParamList } from "../../App";
import { TabView, SceneMap } from 'react-native-tab-view';

type ProfileNavProp = NativeStackNavigationProp<RootStackParamList, "profile">;

const LocationsRoute = () =>
  <View style={styles.sliderSection}>
    <Text>Setúbal</Text>

    <View style={styles.imageCarousel}>
      <View style={styles.carouselItem}>
        <Image source={require("../../assets/images/pexels-1.jpg")} style={styles.carouselImage} />
        <View style={styles.overlayInfo}>
          <Text style={styles.overlayCityName}>Setúbal</Text>
          <Text style={styles.overlayDistance}>3km away</Text>
        </View>
      </View>
      <View style={styles.carouselItem}>
        <Image source={require("../../assets/images/pexels-2.jpg")} style={styles.carouselImage} />
        <View style={styles.overlayInfo}>
          <Text style={styles.overlayCityName}>Setúbal</Text>
          <Text style={styles.overlayDistance}>3km away</Text>
        </View>
      </View>
      <View style={styles.carouselItem}>
        <Image source={require("../../assets/images/pexels-3.jpg")} style={styles.carouselImage} />
        <View style={styles.overlayInfo}>
          <Text style={styles.overlayCityName}>Setúbal</Text>
          <Text style={styles.overlayDistance}>3km away</Text>
        </View>
      </View>
    </View>
  </View>;

const FeedRoute = () =>
  <View style={styles.contentContainer}>
    <Text>Feed</Text>
  </View>;

const FavoritesRoute = () =>
  <View style={styles.contentContainer}>
    <Text>Favorites</Text>
  </View>;

const renderScene = SceneMap({
  locations: LocationsRoute,
  feed: FeedRoute,
  favorites: FavoritesRoute,
});

export default function ProfileHeader() {
  const navigation = useNavigation<ProfileNavProp>();
  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'locations', title: 'Locations' },
    { key: 'feed', title: 'Feed' },
    { key: 'favorites', title: 'Favorites' },
  ]);

  // Simple TabBar: only color changes, no animation
  const renderTabBar = (props: any) => {
    return (
      <View style={styles.customTabBar}>
        {props.navigationState.routes.map((route: any, i: number) => (
          <TouchableOpacity
            key={route.key}
            style={styles.tabItem}
            onPress={() => setIndex(i)}
            activeOpacity={1}
          >
            <Text
              style={{
                fontWeight: "600",
                fontSize: 14,
                color: index === i ? "#333333" : "#6B7280",
              }}
            >
              {route.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          onPress={() => navigation.navigate("map")}
          Icon={MaterialIcons}
          iconName="arrow-back"
        />
        <Button
          onPress={() => console.log("Settings")}
          Icon={MaterialIcons}
          iconName="settings"
        />
      </View>

      <View style={styles.profileContainer}>
        <Image source={require("../../assets/images/pexels-pfp.jpg")} style={styles.profileImage} />
        <Text style={styles.profileName}>Name</Text>
        <Text style={styles.profileUser}>username</Text>
      </View>

      <View style={styles.tabContainer}>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={renderTabBar}
        />
      </View>
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
  profileContainer: {
    alignItems: "center",
    marginTop: 140,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: "bold",
  },
  profileUser: {
    fontSize: 14,
    color: "#6B7280",
  },
  tabContainer: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  customTabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
  },
  sliderSection: {
    flex: 1,
  },
  imageCarousel: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  carouselItem: {

  },
  carouselImage: {
    width: 110,
    height: 110,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  overlayInfo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 10,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'space-between',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  overlayCityName: {
    fontWeight: "600",
    fontSize: 12,
    color: "#FFFFFF",
  },
  overlayDistance: {
    fontSize: 10,
    color: "#AFB2B5",
  },
});
