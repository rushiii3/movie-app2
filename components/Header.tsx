import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Dispatch, SetStateAction, useCallback, useState } from "react";
import { debounce } from "lodash";
import { hp } from "@/common/common";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";

const Header = ({
  title,
  setSearchPhrase,
  setGenresWithSelection,
  genresWithSelection,
}: {
  title: string;
  setSearchPhrase: Dispatch<SetStateAction<string>>;
  setGenresWithSelection: Dispatch<
    SetStateAction<{ id: number; isSelected: boolean; name: string }[]>
  >;
  genresWithSelection: { id: number; isSelected: boolean; name: string }[];
}) => {
  const [text, settext] = useState("");
  const handleGenreChange = (genreId: number) => {
    const updatedGenres = genresWithSelection?.map(
      (genre: { id: number; isSelected: boolean;  name: string }) => {
        if (genre.id === genreId) {
          return {
            ...genre,
            isSelected: !genre.isSelected,
          };
        } else {
          return genre;
        }
      }
    );
    setGenresWithSelection(updatedGenres);
  };
  const handleChange = async (textParam: string) => {
    settext(textParam);
    debounceCall(textParam);
  };
  const debounceCall = useCallback(
    debounce((textParam) => {
      setSearchPhrase(textParam);
    }, 1000),
    []
  );
  return (
    <View style={{ paddingBottom: 15 }}>
      <Text
        style={{
          color: "white",
          fontSize: hp(5),
          fontWeight: "bold",
          marginBottom: 5,
        }}
      >
        {title}
      </Text>
      <View style={{ position: "relative", marginBottom: 10 }}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType="default"
          autoFocus={false}
          onChangeText={handleChange}
          placeholder={`Search your ${title.toLowerCase()}`}
          placeholderTextColor="#6b7280"
          style={{
            height: 44,
            backgroundColor: "#f1f5f9",
            paddingHorizontal: 16,
            borderRadius: 12,
            fontSize: 15,
            fontWeight: "500",
            color: "#222",
            paddingLeft: 40,
          }}
          value={text}
        />
        <Ionicons
          name="search-outline"
          size={24}
          color="black"
          style={{ position: "absolute", top: 10, left: 7 }}
        />
        {text && (
          <TouchableOpacity
            style={{ position: "absolute", top: 12, right: 7 }}
            onPress={() => {
              setSearchPhrase("");
              settext("");
            }}
          >
            <AntDesign name="closecircleo" size={20} color="black" />
          </TouchableOpacity>
        )}
      </View>
      <FlashList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={genresWithSelection}
        extraData={{}}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              borderWidth: 1,
              borderColor: "white",
              padding: 5,
              paddingHorizontal: 10,
              borderRadius: 15,
              backgroundColor: item.isSelected
                ? "white"
                : "rgba(255,255,255,0.2)",
              marginHorizontal: 5,
            }}
            onPress={() => {
              handleGenreChange(item.id);
            }}
          >
            <Text
              style={{
                color: item.isSelected ? "black" : "white",
                fontWeight: "500",
              }}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
        estimatedItemSize={Dimensions.get("window").height}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
