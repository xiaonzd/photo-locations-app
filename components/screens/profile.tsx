import React, { useState } from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MaterialIcons } from "@expo/vector-icons";
import Button from "../ui/button";
import type { RootStackParamList } from "../../App";

type ProfileNavProp = NativeStackNavigationProp<RootStackParamList, "profile">;

export default function ProfileHeader() {
    const navigation = useNavigation<ProfileNavProp>();

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

            <View style={styles.contentContainer}>
                
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
  contentContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
});