import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../constants/colors";

type Message = {
  id: string;
  sender: string;
  text: string;
  time: string;
};

type Props = {
  id: number;
  name: string;
  messages: Message[];
  image?: string | null;
  unread?: number;
};

export default function Conversation({ id, name, messages, image, unread }: Props) {
  const lastMessage = messages?.[messages.length - 1];

  const handlePress = () => {
    router.push({
      pathname: "/discussion/[id]",
      params: { id: String(id) }, // ✅ envoie bien un param string
    });
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className="flex-row items-center py-4 border-b border-woofCream"
    >
      {image ? (
        <Image source={{ uri: image }} className="w-12 h-12 rounded-full mr-3" />
      ) : (
        <View className="w-12 h-12 rounded-full bg-[#F4E3D3] mr-3 items-center justify-center">
          <Text className="text-lg font-manropeBold text-woofBrown">
            {name.charAt(0)}
          </Text>
        </View>
      )}

      <View className="flex-1">
        <Text className="font-manropeBold text-[15px] text-black">{name}</Text>
        {lastMessage ? (
          <Text className="text-gray-500 text-sm" numberOfLines={1}>
            {lastMessage.sender === "me" ? "You: " : ""}
            {lastMessage.text}
          </Text>
        ) : (
          <Text className="text-gray-400 text-sm italic">No messages yet</Text>
        )}
      </View>

      {unread ? (
        <View
          style={{ backgroundColor: COLORS.woofBrown }}
          className="w-6 h-6 rounded-full items-center justify-center"
        >
          <Text className="text-white text-[12px] font-manropeBold">{unread}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}
