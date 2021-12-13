import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

const Gallery = (props) => {
  const { width, height } = useWindowDimensions();
  const THUMBNAIL_IMAGE = 80;
  const SPACING = 10;

  const data = props.route.params.data;

  const mainRef = React.useRef();
  const thumbRef = React.useRef();
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToActiveIndex = (index) => {
    setActiveIndex(index);
    mainRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true,
    });
    if (index * (THUMBNAIL_IMAGE + SPACING) - THUMBNAIL_IMAGE / 2 > width / 2) {
      thumbRef?.current?.scrollToOffset({
        offset:
          index * (THUMBNAIL_IMAGE + SPACING) - width / 2 + THUMBNAIL_IMAGE / 2,
        animated: true,
      });
    } else {
      thumbRef?.current?.scrollToOffset({
        offset: 0,
        animated: true,
      });
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={mainRef}
        data={data.data}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(ev) => {
          scrollToActiveIndex(
            Math.round(ev.nativeEvent.contentOffset.x / width)
          );
        }}
        renderItem={({ item }) => {
          return (
            <View style={{ width, height }}>
              <Image
                source={{ uri: item.uri }}
                style={[StyleSheet.absoluteFillObject]}
              />
            </View>
          );
        }}
      />
      <FlatList
        ref={thumbRef}
        data={data.data}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ position: "absolute", bottom: THUMBNAIL_IMAGE }}
        contentContainerStyle={{ paddingHorizontal: SPACING }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => scrollToActiveIndex(index)}
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: item.uri }}
                style={{
                  width: THUMBNAIL_IMAGE,
                  height: THUMBNAIL_IMAGE,
                  borderRadius: 12,
                  marginRight: SPACING,
                  borderWidth: 2,
                  borderColor: index === activeIndex ? "#fff" : "transparent",
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Gallery;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
});
