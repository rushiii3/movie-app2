import React, { useState } from "react";
import { View, StyleSheet, Button, Text, TouchableOpacity } from "react-native";
import { Video, ResizeMode } from "expo-av";
import Slider from "@react-native-community/slider";
import * as ScreenOrientation from "expo-screen-orientation";
import SystemNavigationBar from "react-native-system-navigation-bar";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import {
  useSharedValue,
  withSpring,
  runOnJS,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BlurView } from "expo-blur";
import {
  Ionicons,
  SimpleLineIcons,
  Fontisto,
  FontAwesome6,
} from "@expo/vector-icons";
import CoverIcon from "../../assets/svg/CoverIcon";
import ContainIcon from "../../assets/svg/ContainIcon";
import { useRouter } from "expo-router";
import * as DropdownMenu from 'zeego/dropdown-menu'
import { MaterialIcons } from '@expo/vector-icons';

export default function Player({
  isLoading,
  error,
  finalURL,
  backdrop,
  Subtitle,
  Streams,
}:{
  isLoading: boolean;
  error: boolean | string;
  finalURL: string;
  backdrop: string;
  Subtitle: { language: string; url: string }; // Adjust the type based on your actual Subtitle prop type
  Streams: { quality: string; url: string }[]; // Adjust the type based on your actual Streams prop type

}) {
  const [selectedItem, setSelectedItem] = useState('Select an option');

  const insets = useSafeAreaInsets();
  const controlsOpacity = useSharedValue(1);
  const router = useRouter();
  const [mode, setmode] = useState("contain");

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: controlsOpacity.value,
    };
  });
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    async function setOrientation() {
      await SystemNavigationBar.stickyImmersive();
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE
      );
    }
    setOrientation();
  }, []);
  function convertDurationToHMS(durationInSeconds: number) {
    var hours = Math.floor(durationInSeconds / 3600);
    var minutes = Math.floor((durationInSeconds % 3600) / 60);
    var seconds = Math.floor(durationInSeconds % 60);
    var formattedHours = hours > 0 ? hours : "";
    var formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    var formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    var formattedDuration =
      formattedHours + ":" + formattedMinutes + ":" + formattedSeconds;

    formattedDuration = formattedDuration.replace(/^0+:/, "");
    formattedDuration = formattedDuration.replace(/^[^0-9]*/, "");

    return formattedDuration;
  }

  console.log(Subtitle);
  const formatLabel = (resolution:any, bandwidth:any) => {
    let label = `${resolution} (${(bandwidth / 1000)} kbps)`;
  
    switch (resolution) {
      case '640x360':
        label = '480p (SD)';
        break;
      case '1280x720':
        label = '720p (HD)';
        break;
      case '1920x1080':
        label = '1080p (Full HD)';
        break;
      case '2560x1440':
        label = '1440p (2K)';
        break;
      case '3840x2160':
        label = '2160p (4K)';
        break;
      default:
        break;
    }
    return label;
  };
  return (
    <View style={styles.container}>
      {/* <Video
        ref={video}
        style={{
          backgroundColor: "black",
          ...StyleSheet.absoluteFill,
          elevation: 1,
        }}
        source={{
          uri: "https://vdnm.v44381c4b81.site/_v2-vybe/9a701df34ea7e4ae16c25b01dd7fefae771974c45e1c81b9948778fe4fcd06741ae3e719f0ef63837c6cf62e8daaecb28d7ff9aa0d734593957b6d8b83565f6c2fa332d13fc9abac36c2e822d50a829f06de60eaf2e98f5ec3340eb8e9c7f9e5727599/h/list;9d705ee448b4e4e553dc06568f6feda3345b239e1c12c6.m3u8",
        }}
        useNativeControls={false}
        resizeMode={mode === "contain" ? ResizeMode.CONTAIN : ResizeMode.COVER}
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        shouldPlay={true}
        volume={1}
      /> */}
   <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', position:"absolute" }}>
      {/* <DropdownMenu.Root >
        <DropdownMenu.Trigger>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 10,
              borderWidth: 1,
              borderRadius: 5,
            }}
          >
            <Text style={{ marginRight: 10, fontSize: 16 }}>{selectedItem}</Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="black" />
          </TouchableOpacity>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content key={"sampleee"} loop={false}>
          <DropdownMenu.Item key="op1" onSelect={() => setSelectedItem('Option 1')}>
            <DropdownMenu.ItemTitle>
                Option 1
              </DropdownMenu.ItemTitle>
          </DropdownMenu.Item>
          <DropdownMenu.Item key="op2" onSelect={() => setSelectedItem('Option 2')}>
          <DropdownMenu.ItemTitle>
                Option 3
              </DropdownMenu.ItemTitle>
          </DropdownMenu.Item>
          <DropdownMenu.Item key="op3" onSelect={() => setSelectedItem('Option 3')}>
          <DropdownMenu.ItemTitle>
                Option 2
              </DropdownMenu.ItemTitle>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root> */}
    </View>
      {/* top contrls */}
      <Animated.View
        style={[
          {
            flex: 1,
            position: "absolute",
            top: 2,
            width: "100%",
            paddingTop: insets.top,
            paddingLeft: insets.left + 5,
            paddingRight: insets.right + 5,
            paddingBottom: insets.bottom,
          },
          animatedStyles,
        ]}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            flex: 1,
          }}
        >
          <View
            style={{
              borderRadius: 10,
              overflow: "hidden",
              marginTop: 10,
            }}
          >
            <BlurView intensity={90} tint="dark">
              <View
                style={{
                  padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: 30,
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    router.back();
                  }}
                >
                  <Ionicons name="close" size={30} color="white" />
                </TouchableOpacity>
                {mode === "cover" ? (
                  <TouchableOpacity
                    onPress={() => {
                      setmode("contain");
                    }}
                  >
                    <CoverIcon height={30} width={30} />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setmode("cover");
                    }}
                  >
                    <ContainIcon height={30} width={30} />
                  </TouchableOpacity>
                )}
              </View>
            </BlurView>
          </View>

          <View>
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: 15,
                maxWidth: 200,
                textAlign: "center",
              }}
            >
              Stranger Things {"\n"}
              S1 E1
            </Text>
          </View>
          <View style={{ borderRadius: 10, overflow: "hidden" }}>
            <BlurView intensity={90} tint="dark">
              <View
                style={{
                  padding: 10,
                  flexDirection: "row",
                  alignItems: "center",
                  columnGap: 10,
                  width: "100%",
                }}
              >
                {/* <View style={customStyles8.container}>
                        <Slider
                          progress={volumeProgress}
                          minimumValue={volumeMin}
                          maximumValue={volumeMax}
                          theme={{
                            disableMinTrackTintColor: "#fff",
                            maximumTrackTintColor: "#65605f",
                            minimumTrackTintColor: "#fff",
                            cacheTrackTintColor: "#333",
                            bubbleBackgroundColor: "#666",
                            heartbeatColor: "#999",
                          }}
                          onValueChange={(value) => {
                            setVolume(value);
                            console.log(value);
                          }}
                        />
                      </View> */}
                <Slider
                  style={{ width: 200, height: 40 }}
                  minimumValue={0}
                  maximumValue={1}
                  minimumTrackTintColor="#FFFFFF"
                  maximumTrackTintColor="#000000"
                  value={progress}
                  onValueChange={(value) => setProgress(value)}
                />

                {(progress === 0 || progress < 0) && (
                  <SimpleLineIcons name="volume-off" size={24} color="white" />
                )}
                {progress > 0.5 && (
                  <SimpleLineIcons name="volume-2" size={24} color="white" />
                )}
                {progress <= 0.5 && progress > 0 && (
                  <SimpleLineIcons name="volume-1" size={24} color="white" />
                )}
              </View>
            </BlurView>
          </View>
        </View>
      </Animated.View>
      {/* bottom controls */}
      <Animated.View
              style={[
                {
                  flex: 1,
                  position: "absolute",
                  bottom: 5,
                  width: "100%",
                  paddingTop: insets.top,
                  paddingLeft: insets.left,
                  paddingRight: insets.right,
                  paddingBottom: insets.bottom,
                },
                animatedStyles,
              ]}
            >
              <View style={{ borderRadius: 10, flex: 1 }}>
                <BlurView
                  intensity={90}
                  tint="dark"
                  style={{ borderRadius: 10 }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: 10,
                      borderRadius: 10,
                      paddingHorizontal: 20,
                      gap: 10,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        gap: 10,
                        // width: wp(10),
                      }}
                    >
                      <TouchableOpacity >
                        <Fontisto name="backward" size={20} color="white" />
                      </TouchableOpacity>

                      {/* {isPlaying ? (
                        <TouchableOpacity
                          onPress={togglePlayPause}
                          style={{ marginHorizontal: "auto" }}
                        >
                          <FontAwesome6 name="pause" size={25} color="white" />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          onPress={togglePlayPause}
                          style={{ marginHorizontal: "auto" }}
                        >
                          <FontAwesome6 name="play" size={25} color="white" />
                        </TouchableOpacity>
                      )} */}

                      <TouchableOpacity>
                        <Fontisto name="forward" size={20} color="white" />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        columnGap: 10,
                        marginLeft: 10,
                      }}
                    >
                      <Text style={{ color: "white", fontWeight: "600" }}>
                        {/* {convertDurationToHMS(Progress)
                          ? convertDurationToHMS(Progress)
                          : "00:00"} */}
                      </Text>
                      <View
                        style={{
                          // width: wp(100),
                        }}
                      >
                        {/* <Slider
                          progress={progress}
                          minimumValue={min}
                          maximumValue={max}
                          bubbleContainerStyle={{
                            zIndex: 100,
                            position: "absolute",
                          }}
                          onSlidingComplete={handleSlidingComplete}
                          theme={{
                            disableMinTrackTintColor: "#fff",
                            maximumTrackTintColor: "#65605f",
                            minimumTrackTintColor: "#fff",
                            cacheTrackTintColor: "#333",
                            bubbleBackgroundColor: "#666",
                            heartbeatColor: "#999",
                          }}
                        /> */}
                      </View>
                      <Text style={{ color: "white", fontWeight: "600" }}>
                        {/* -{convertDurationToHMS(duration)} */}
                      </Text>
                    </View>
                    <View style={{flex:1}}>
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                          <TouchableOpacity>
                            <Fontisto
                              name="player-settings"
                              size={20}
                              color="white"
                            />
                          </TouchableOpacity>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content>
                          <DropdownMenu.Group key={"mainmenu"}>
                            <DropdownMenu.Sub key={"subs"}>
                              <DropdownMenu.SubTrigger key="subTrigger">
                                Subtitlesss
                              </DropdownMenu.SubTrigger>
                              <DropdownMenu.SubContent key={"subContent"}>
                                {Subtitle?.map((value, key) => (
                                  <DropdownMenu.CheckboxItem
                                  value="on"
                                    // value={
                                    //   value.lang === SelectedSubtitle?.lang
                                    //     ? "on"
                                    //     : "off"
                                    // }
                                    // onValueChange={(next, previous) => {
                                    //   setSelectedSubtitle(value);
                                    // }}
                                    key={key + "subtitle"}
                                  >
                                    <DropdownMenu.ItemTitle>
                                      {value?.lang}
                                    </DropdownMenu.ItemTitle>

                                    <DropdownMenu.ItemIndicator></DropdownMenu.ItemIndicator>
                                  </DropdownMenu.CheckboxItem>
                                ))}
                              </DropdownMenu.SubContent>
                            </DropdownMenu.Sub>
                            <DropdownMenu.Sub key={"quality"}>
                              <DropdownMenu.SubTrigger key="qualityTrigger">
                                Quality
                              </DropdownMenu.SubTrigger>
                              <DropdownMenu.SubContent key={"qualityContent"}>
                                {Streams?.map((value, key) => (
                                  <DropdownMenu.CheckboxItem
                                    // value={value?.lang===SelectedSubtitle?.lang?"on":"off"}
                                    onValueChange={(next, previous) => {
                                      // setSelectedSubtitle(value);
                                    }}
                                    key={key + "quality"}
                                  >
                                    <DropdownMenu.ItemTitle>
                                      {formatLabel(value?.resolution,value?.bandwidth)}
                                    </DropdownMenu.ItemTitle>

                                    <DropdownMenu.ItemIndicator></DropdownMenu.ItemIndicator>
                                  </DropdownMenu.CheckboxItem>
                                ))}
                              </DropdownMenu.SubContent>
                            </DropdownMenu.Sub>
                          </DropdownMenu.Group>
                        </DropdownMenu.Content>
                      </DropdownMenu.Root>
                    </View>
                  </View>
                </BlurView>
              </View>
            </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
