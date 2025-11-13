import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
    Image,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/colors";

export default function ChangePassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // ✅ Vérifie si les deux mots de passe correspondent
    const arePasswordsMatched = password.trim() !== "" && password === confirmPassword;

    // ✅ Bouton désactivé tant que ça ne correspond pas
    const isDisabled = !arePasswordsMatched;

    return (
        <SafeAreaView
            style={{ backgroundColor: COLORS.woofCream }}
            className="flex-1"
            edges={["top"]}
        >
            <StatusBar backgroundColor={COLORS.woofBrown} style="dark" />



            {/* Contenu principal */}
            <View className="px-6 mt-6">
                <View className="p-6">
                    <View className="items-center">

                    <Image
                        source={require("../assets/images/doglogo.png")}
                        className="w-[190px] h-[181px] mb-10"
                        resizeMode="contain"
                    />

                    <Text className="text-woofBrown font-manropeBold text-lg mb-12">
                        Change password successfully!
                    </Text>

                    <Text numberOfLines={2} className="text-black font-manropeSemiBold text-base mb-8 text-center">
                        You have successfully change password.
                        Please use the new password when Sign in.
                    </Text>

                    </View>

                    <TouchableOpacity
                        className="bg-woofBrown rounded-2xl py-3 items-center"
                        onPress={() => {
                            router.push('/(tabs)/explore');
                        }}
                    >
                        <Text
                            className="font-manropeBold text-base text-white"
                        >
                            Ok
                        </Text>
                    </TouchableOpacity>








                </View>
            </View>



        </SafeAreaView>
    );
}
