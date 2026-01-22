import Header from "@/components/header";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "convex/react";
import { router } from "expo-router";
import React from "react";
import {
  Alert,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type History = Doc<"history">;

const History = () => {
  const history = useQuery(api.history.getLinks);

  const historyButtonClickHandler = (url: string) => {
    let confirmed = false;

    if (Platform.OS === "web")
      confirmed = confirm("Tem certeza que deseja abrir este link?");
    else if (Platform.OS === "android") {
      Alert.alert(
        "Confirmação",
        "Tem certeza que deseja abrir este link?",
        [
          {
            text: "Cancelar",
            onPress: () => {
              confirmed = false;
              console.log("Cancel Pressed");
            },
            style: "cancel",
          },
          {
            text: "Abrir",
            onPress: () => {
              console.log("OK Pressed");
              AsyncStorage.setItem("link", url);
              router.replace("/(main)/home");
            },
          },
        ],
        { cancelable: true },
      );
    }

    if (confirmed) {
      AsyncStorage.setItem("link", url);
      router.replace("/(main)/home");
    }
  };

  const renderLinkHistoryItem = (item: History) => {
    return (
      <TouchableOpacity
        style={styles.historyItemContainer}
        onPress={() => historyButtonClickHandler(item.url)}
      >
        <View style={styles.videoHistoryIconContainer}>
          <Image
            style={{
              width: "100%",
              height: "100%",
            }}
            source={{ uri: item.thumbnail }}
          />
        </View>

        <Text style={styles.historyItemText}>{item.title}</Text>
        <Text style={styles.historyItemLink}>{item.url}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView>
      <Header />

      <View style={styles.screenTitleContainer}>
        <Text style={styles.screenTitle}>Historico</Text>
      </View>

      <View style={styles.histories}>
        <FlatList
          data={history}
          renderItem={({ item }) => renderLinkHistoryItem(item)}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenTitleContainer: {
    padding: 10,
    borderBottomWidth: 1,
  },
  screenTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },
  histories: {
    flexDirection: "column",
    margin: 10,
    borderWidth: 1,
    borderColor: "#cdcdcd",
    borderRadius: 10,
  },
  historyItemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: "#cdcdcd",
    padding: 10,
    overflow: "hidden",
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  historyItemText: {
    fontSize: 15,
  },
  historyItemLink: {
    display: "none",
  },
  videoHistoryIconContainer: {
    width: 100,
    height: 100,
    backgroundColor: "red",
    borderRadius: 10,
    overflow: "hidden",
  },
  history: {},
});

export default History;
