import { View, Text } from "react-native";
import React, { FC, memo } from "react";
import { Spokenlanguage } from "@/types";
const convertMinutesToHoursAndMinutes = (totalMinutes: number) => {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const formattedTime = hours > 0 ? `${hours}h${minutes}m` : `${minutes}m`;
  return formattedTime;
};
const convertArrayofLanguagesToString = (languages: Spokenlanguage[]) => {
  const array_of_languages = languages?.map((value) => value?.name);
  return array_of_languages?.join(", ");
};
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = date.toLocaleString("default", { month: "short" });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};
interface ShortInfoProps {
  duration: number | undefined;
  status: string | undefined;
  languages: Spokenlanguage[];
  release_date: string;
}
const ShortInfo: FC<ShortInfoProps> = ({
  duration,
  status,
  languages,
  release_date,
}) => {
  return (
    <View
      style={{
        marginVertical: 15,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        flex: 1,
      }}
    >
      <View style={{ gap: 5 }}>
        <Text style={{ color: "white", fontWeight: "300" }}>
          {duration && "Duration"} {status && "Status"}
        </Text>
        <Text style={{ color: "white", fontSize: 17, fontWeight: "600" }}>
          {duration && convertMinutesToHoursAndMinutes(duration)}{" "}
          {status && status}
        </Text>
      </View>
      <View style={{ gap: 5 }}>
        <Text style={{ color: "white", fontWeight: "300" }}>Language</Text>
        <Text style={{ color: "white", fontSize: 17, fontWeight: "600" }}>
          {convertArrayofLanguagesToString(languages)}
        </Text>
      </View>
      <View style={{ gap: 5 }}>
        <Text style={{ color: "white", fontWeight: "300" }}>Release date</Text>
        <Text style={{ color: "white", fontSize: 17, fontWeight: "600" }}>
          {formatDate(release_date)}
        </Text>
      </View>
    </View>
  );
};

export default memo(ShortInfo);
