import React, { useState } from "react";
import {
  Image,
  SectionList,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  TouchableOpacity,
  Platform,
  Alert,
  ToastAndroid,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import ImagePicker from "react-native-image-crop-picker";
import { Button, Modal, Select } from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign";

import ImageSlider from "../components/ImageSlider";
import { sampleData } from "../constants/dummy";

const Home = (props) => {
  const [images, setImages] = useState(sampleData);
  const [modalVisbility, setModalVisbility] = useState(false);
  const [addNewCat, setAddNewCat] = useState(false);

  const [myFavorites, setMyFavorites] = useState([]);

  const [newData, setNewData] = useState({
    id: "",
    category: "",
    data: [],
  });

  let categories = [];
  for (var item of images) {
    categories.push(item.category);
  }

  const handleImageSelect = () => {
    ImagePicker.openPicker({
      cropping: true,
      mediaType: "photo",
    })
      .then((image) => {
        const uri = image.path;
        let data = [];
        data.push({
          uri: uri,
        });
        setNewData({
          ...newData,
          id: image.modificationDate.slice(0, 5),
          data: data,
        });
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteImg = () => {
    setNewData({ ...newData, data: [] });
  };

  const handleNewImageSubmit = () => {
    if (newData.category === "" || newData.data.length === 0) {
      Platform.OS === "ios"
        ? Alert.alert("Please choose a category or enter a new one")
        : ToastAndroid.show(
            "Please choose a category or enter a new one",
            ToastAndroid.LONG
          );
      return;
    } else {
      if (categories.indexOf(newData.category) !== -1) {
        var foundIndex = images.findIndex(
          (i) => i.category === newData.category
        );
        images[foundIndex].data.push(newData.data[0]);
      } else {
        setImages((images) => [...images, newData]);
      }
    }
    setModalVisbility(false);
    setNewData({
      category: "",
      data: [],
    });
  };

  const handleMyFavorites = (image) => {
    setMyFavorites((myFavorites) => [...myFavorites, image]);
  };

  const handleMyFavoritesRemove = (image) => {
    let temp = [];
    temp = myFavorites.filter((mf) => mf.uri !== image.uri);
    console.log(temp);
    setMyFavorites(temp);
  };

  return (
    <View style={styles.container}>
      <SectionList
        contentContainerStyle={{ paddingHorizontal: 10 }}
        keyExtractor={(item, index) => index.toString()}
        sections={images}
        renderItem={({ item }) => {
          return null;
        }}
        renderSectionHeader={({ section }) => (
          <>
            <View style={styles.header}>
              <Text style={styles.sectionHeader}>{section.category}</Text>
              <TouchableOpacity
                style={styles.seeAllBtn}
                activeOpacity={0.8}
                onPress={() =>
                  props.navigation.navigate("Gallery", { data: section })
                }
              >
                <Text style={styles.seeAllBtnText}>See All</Text>
              </TouchableOpacity>
            </View>
            <ImageSlider
              data={section.data}
              images={images}
              handleMyFavorites={handleMyFavorites}
              myFavorites={myFavorites}
              handleMyFavoritesRemove={handleMyFavoritesRemove}
            />
          </>
        )}
      />
      <TouchableOpacity
        onPress={() =>
          myFavorites.length === 0
            ? Alert.alert("Please add some images to my favorites first")
            : props.navigation.navigate("MyFavorite", {
                myFavorites: myFavorites,
              })
        }
        activeOpacity={1}
        style={styles.myFavBtn}
      >
        <Text style={styles.myFavBtnText}>Go to my favorites</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setModalVisbility(true)}
        activeOpacity={1}
        style={styles.addImageBtn}
      >
        <Text style={styles.addImageBtnText}>Add an image</Text>
      </TouchableOpacity>
      <Modal
        isOpen={modalVisbility}
        onClose={() => setModalVisbility(false)}
        size="full"
      >
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Add new Image</Modal.Header>
          <Modal.Body>
            <View style={styles.inputWrap}>
              <Text style={styles.label}>Select a Category</Text>
              <Select
                placeholder="Choose a category"
                onValueChange={(itemValue) => {
                  setNewData({ ...newData, category: itemValue });
                  setAddNewCat(false);
                }}
                selectedValue={newData.category}
                borderRadius={12}
                borderWidth={0}
                color="#4F585E"
              >
                {categories.map((c, index) => (
                  <Select.Item label={c} value={c} key={index.toString()} />
                ))}
              </Select>
            </View>
            <View style={{ alignSelf: "center", marginVertical: 10 }}>
              <Text style={{ fontWeight: "800", fontSize: 16 }}>
                ------OR------
              </Text>
            </View>
            {addNewCat ? (
              <View style={styles.inputWrap}>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.label}>Add a new category</Text>
                  <TouchableOpacity
                    onPress={() => setAddNewCat(false)}
                    activeOpacity={0.8}
                  >
                    <Text style={{ color: "#E73828" }}>Cancel</Text>
                  </TouchableOpacity>
                </View>
                <TextInput
                  style={styles.input}
                  autoCapitalize="none"
                  autoCorrect={false}
                  keyboardType="default"
                  returnKeyType="next"
                  placeholder="Type a category"
                  placeholderTextColor="#dadae0"
                  value={newData.category}
                  onChangeText={(itemValue) =>
                    setNewData({ ...newData, category: itemValue })
                  }
                />
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setAddNewCat(true);
                  setNewData({ ...newData, category: "" });
                }}
                activeOpacity={0.8}
                style={{ alignSelf: "center", marginVertical: 10 }}
              >
                <Text
                  style={{ fontWeight: "800", fontSize: 16, color: "#E73828" }}
                >
                  Add new category
                </Text>
              </TouchableOpacity>
            )}
            <View style={styles.inputWrap}>
              <Text style={styles.label}>Select an image</Text>
              {newData.data.length === 0 ? (
                <TouchableOpacity
                  onPress={handleImageSelect}
                  activeOpacity={0.8}
                >
                  <Image
                    source={require("../assets/images/addImage.png")}
                    style={{ width: 225, height: 160 }}
                  />
                </TouchableOpacity>
              ) : (
                <View>
                  <AntDesign
                    name="closecircle"
                    color="tomato"
                    size={25}
                    style={styles.deleteBtn}
                    onPress={handleDeleteImg}
                  />
                  <Image
                    source={{ uri: newData.data[0].uri }}
                    style={{ width: 225, height: 160 }}
                  />
                </View>
              )}
            </View>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setModalVisbility(false);
                }}
              >
                Cancel
              </Button>
              <Button onPress={handleNewImageSubmit}>Save</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  sectionHeader: {
    fontWeight: "800",
    fontSize: 18,
    color: "#f4f4f4",
    marginTop: 20,
    marginBottom: 5,
    textTransform: "capitalize",
  },
  item: {
    margin: 10,
  },
  itemPhoto: {
    width: 226,
    height: 162,
  },
  header: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  seeAllBtnText: {
    fontSize: 14,
    color: "tomato",
    textTransform: "capitalize",
  },
  addImageBtn: {
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  myFavBtn: {
    backgroundColor: "#00BFF9",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  myFavBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
  addImageBtnText: {
    color: "#00BFF9",
    fontSize: 16,
    fontWeight: "800",
  },
  inputWrap: {
    flexDirection: "column",
    marginVertical: 10,
  },
  label: {
    color: "#575757",
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 14,
    color: "#777777",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#EFEFEF",
    borderRadius: 3,
    backgroundColor: "#F9F9F9",
  },
  saveBtn: {
    backgroundColor: "#00BFF9",
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: 10,
  },
  saveBtnText: {
    fontSize: 16,
    letterSpacing: 0.5,
    lineHeight: 22,
    color: "#ffffff",
  },
  error: {
    color: "crimson",
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },
  deleteBtn: {
    position: "absolute",
    top: 5,
    right: 155,
    zIndex: 2,
  },
});
