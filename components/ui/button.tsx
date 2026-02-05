import { Pressable, StyleSheet, Text, View } from "react-native";

type ButtonProps = {
  title?: string;
  onPress: () => void;
  Icon?: any;
  iconName?: string;
};

export default function Button({
  title,
  onPress,
  Icon,
  iconName,
}: ButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <View style={styles.content}>
        {Icon && iconName && (
          <Icon name={iconName} size={20} color="#6B7280" />
        )}
        
        {title && <Text style={styles.text}>{title}</Text>}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
  backgroundColor: "white",
  padding: 10,
  borderRadius: 16,
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "row",
  // iOS shadow
  shadowColor: "#6B7280",
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.5,
  shadowRadius: 1,
  // Android shadow
  elevation: 2,
  },
  text: {
    fontFamily: "Segoe UI",
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 6,
  },
});
