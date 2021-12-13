import React from "react";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import AntDesign from "react-native-vector-icons/AntDesign";

const ImageSlider = (props) => {
  return (
    <View>
      <FlatList
        data={props.data}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => {
          return (
            <View style={styles.itemStyle}>
              {props.myFavorites.find((fav) => fav.uri === item.uri) !==
              undefined ? (
                <TouchableOpacity
                  style={styles.heartBtn}
                  onPress={() => props.handleMyFavoritesRemove(item)}
                >
                  <AntDesign name="heart" color="#E73828" size={15} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.heartBtn}
                  onPress={() => props.handleMyFavorites(item)}
                >
                  <AntDesign name="hearto" color="#E73828" size={15} />
                </TouchableOpacity>
              )}
              <Image
                source={{ uri: item.uri }}
                style={{ width: 225, height: 165 }}
                resizeMode="cover"
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default ImageSlider;

const styles = StyleSheet.create({
  itemStyle: {
    marginRight: 20,
  },
  heartBtn: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 2,
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
