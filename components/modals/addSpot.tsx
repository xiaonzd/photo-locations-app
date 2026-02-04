import React, { useState } from "react";
import { Modal, View, Text, Pressable, TextInput, Image, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import Feather from '@expo/vector-icons/Feather';

type Spot = {
  imageUri: string;
  location?: { latitude: number; longitude: number };
  locationName?: string;
  title?: string;
  description?: string;
  tags?: string[];
  category?: string;
};

type AddSpotProps = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (spot: Spot) => void;
};

export default function AddSpot({ visible, onClose, onSubmit }: AddSpotProps) {
  const [step, setStep] = useState(1);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locationName, setLocationName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access photos is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const resetModal = () => {
    setStep(1);
    setImageUri(null);
    setLocation(null);
    setLocationName("");
    setTitle("");
    setDescription("");
    setTags("");
    setCategory("");
  };

  const handleSubmit = () => {
    if (!imageUri) return;
    onSubmit({
      imageUri,
      location: location || undefined,
      locationName,
      title,
      description,
      tags: tags.split(",").map(t => t.trim()),
      category,
    });
    resetModal();
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
            {/* Step Indicator */}
            <View style={styles.stepHeader}>
            <Text style={styles.stepTitle}>
                {step === 1
                ? "Upload Photo"
                : step === 2
                ? "Select Location"
                : "Add Details"}
            </Text>
            <View style={styles.stepBarContainer}>
                {[1, 2, 3].map((s) => (
                <View
                    key={s}
                    style={[
                    styles.stepBar,
                    s === step ? styles.stepBarActive : styles.stepBarInactive,
                    ]}
                />
                ))}
            </View>
            </View>

          {/* Step 1 */}
          {step === 1 && (
            <View style={styles.step}>
              <Pressable style={styles.uploadBox} onPress={pickImage}>
                {imageUri ? (
                  <Image source={{ uri: imageUri }} style={styles.uploadedImage} />
                ) : (
                  <View style={styles.uploadContent}>
                    <Feather name="camera" size={40} color="#6B7280" />
                    <Text style={styles.uploadText}>Click to upload your photo</Text>
                    <Text style={styles.uploadSubtext}>JPG, PNG up to 10MB</Text>
                  </View>
                )}
              </Pressable>

              <Pressable
                style={[styles.button, !imageUri && styles.buttonDisabled]}
                disabled={!imageUri}
                onPress={() => setStep(2)}
              >
                <Text style={styles.buttonText}>Continue</Text>
              </Pressable>
            </View>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <View style={styles.step}>
              <MapView
                style={styles.map}
                onPress={e => setLocation(e.nativeEvent.coordinate)}
                initialRegion={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                {location && <Marker coordinate={location} />}
              </MapView>

              <TextInput
                style={styles.input}
                placeholder="Location Name"
                value={locationName}
                onChangeText={setLocationName}
              />

              <View style={styles.navButtons}>
                <Pressable style={styles.button} onPress={() => setStep(1)}>
                  <Text style={styles.buttonText}>Back</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => setStep(3)}>
                  <Text style={styles.buttonText}>Continue</Text>
                </Pressable>
              </View>
            </View>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <View style={styles.step}>
              {imageUri && <Image source={{ uri: imageUri }} style={styles.thumbnail} />}

              <TextInput
                style={styles.input}
                placeholder="Title"
                value={title}
                onChangeText={setTitle}
              />
              <TextInput
                style={[styles.input, styles.descriptionInput]}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
              />
              <TextInput
                style={styles.input}
                placeholder="Tags (comma separated)"
                value={tags}
                onChangeText={setTags}
              />
              <TextInput
                style={styles.input}
                placeholder="Category"
                value={category}
                onChangeText={setCategory}
              />

              <View style={styles.navButtons}>
                <Pressable style={styles.button} onPress={() => setStep(2)}>
                  <Text style={styles.buttonText}>Back</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Share Location</Text>
                </Pressable>
              </View>
            </View>
          )}
 
          <Pressable style={styles.closeButton} onPress={() => { resetModal(); onClose(); }}>
            <MaterialIcons name="close" size={20} color="#6B7280" />
          </Pressable>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#ffffff",
    width: "90%",
    borderRadius: 16,
    padding: 16,
    position: "relative",
  },
  step: {
    marginVertical: 10,
  },
  stepHeader: {
    marginBottom: 16,
    alignItems: "center",
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    color: "#333333",
  },
  stepBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  stepBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 2,
  },
  stepBarActive: {
    backgroundColor: "#4F46E5",
  },
  stepBarInactive: {
    backgroundColor: "#CCCCCC",
  },
  uploadBox: {
    height: 300,
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#CCCCCC",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginBottom: 20,
    marginTop: 10,
  },
  uploadContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
    textAlign: "center",
  },
  uploadSubtext: {
    marginTop: 4,
    fontSize: 12,
    color: "#bbbbbb",
    textAlign: "center",
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
    resizeMode: "cover",
  },
  button: {
    backgroundColor: "#4F46E5",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 5,
  },
  buttonDisabled: {
    backgroundColor: "#AAAAAA",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  map: {
    height: 200,
    borderRadius: 12,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 12,
    padding: 10,
    marginVertical: 5,
  },
  descriptionInput: {
    height: 60,
  },
  navButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  thumbnail: {
    width: "100%",
    height: 150,
    borderRadius: 12,
    marginBottom: 10,
  },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 8,
  },
});