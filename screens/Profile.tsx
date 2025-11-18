import brookeprofile from "@/assets/images/brookeprofile.png";
import dogheader from "@/assets/images/dogheader.png";
import { Section } from "@/components/Section";
import { SectionButton } from "@/components/SectionButton";
import { useAuth } from "@/utils/auth/AuthContext";
import { Router, useRouter } from "expo-router";
import {
  Bell,
  Globe,
  House,
  MessageCircleQuestionMark,
  ShieldCheck,
  SquarePen,
} from "lucide-react-native";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ProfileScreen() {
  const router: Router = useRouter();
  const { user, logout, openAccountPage, isWoofer } = useAuth();
  console.log(isWoofer);

  return (
    <ScrollView
      className="flex pt-safe bg-woofCream-500"
      contentContainerClassName="grow"
      showsVerticalScrollIndicator={false}
    >
      <View className="w-full h-[230px] items-center">
        <Image
          source={dogheader}
          className="w-[180px] h-[180px]"
          resizeMode="contain"
        />
      </View>

      <View className="w-5/6 -mt-[120px] z-1 self-center bg-woofCream-50 rounded-2xl shadow p-8 gap-y-5">
        <View className="flex-row items-center gap-x-3">
          <Image
            source={brookeprofile}
            className="w-[40px] h-[40px] rounded-full"
          />
          <View className="flex-1">
            <Text className="text-xl font-bold">{user.name}</Text>
            <Text className="text-woofGrey-500">{user.email}</Text>
          </View>
          <TouchableOpacity onPress={openAccountPage}>
            <SquarePen />
          </TouchableOpacity>
        </View>

        <View className="flex-row rounded-lg items-center justify-between mt-4">
          <View className="flex-row items-center gap-x-3">
            <House size={25} />
            <Text>{isWoofer ? "Woofer" : "Backpacker"}</Text>
          </View>

          <Text className="font-manropeSemiBold text-base text-woofBrown-500">
            27 Volunteers hosted
          </Text>
        </View>
      </View>

      <View className="bg-woofCream-50 p-4 gap-y-1 mt-10 rounded-t-3xl flex-1">
        <Section title="General">
          <SectionButton
            icon={<Globe />}
            label={"Language"}
            onPress={() => router.push("/profile/languages")}
          ></SectionButton>
          <SectionButton
            icon={<Bell />}
            label={"Notifications"}
            onPress={() => router.push("/profile/notifications")}
          />
        </Section>
        <Section title="Preferences">
          <SectionButton
            icon={<ShieldCheck />}
            label={"Legal & Policies"}
            onPress={() => router.push("/profile/policies")}
          />
          <SectionButton
            icon={<MessageCircleQuestionMark />}
            label={"Help & Support"}
            onPress={() => router.push("/profile/help")}
          />
        </Section>
        <View className="mt-5">
          <SectionButton label={"Sign out"} onPress={logout} />
        </View>
      </View>
    </ScrollView>
  );
}
