import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Check, Eye, EyeOff } from "lucide-react-native";
import React, { useState } from "react";
import {
    Image,
    Pressable,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/colors";

export default function Signup() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checked, setChecked] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    return (
        <SafeAreaView
            style={{ backgroundColor: COLORS.woofBrown }}
            className="flex-1"
            edges={["top"]}
        >
            <StatusBar backgroundColor={COLORS.woofBrown} style="light" />

            {/* Header */}
            <View className="items-center w-full h-[56px] flex-row py-4">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="items-center justify-center ml-6 w-12 h-12"
                >
                    <MaterialIcons name="chevron-left" size={30} color="white" />
                </TouchableOpacity>
                <Text className="text-xl text-white font-manropeBold ml-4">Sign up</Text>
            </View>

            {/* Contenu principal */}
            <View className="rounded-t-[40px] flex-1 bg-woofCream p-6">
                <View className="px-4 gap-y-1">
                    <Text className="text-2xl text-woofBrown font-manropeSemiBold">Welcome to us,</Text>
                    <Text className="text-sm text-black font-manropeSemiBold">Hello there, create New account</Text>
                </View>

                <View className="mt-[39px] items-center">
                    <Image
                        source={require("../assets/images/woofwoof.png")}
                        className="w-[285px] h-[176px]"
                        resizeMode="contain"
                    />

                </View>

                <View className="px-2 gap-y-5">

                    <TextInput
                        className="mt-[52px] border border-woofGrey rounded-xl px-4 py-3 text-base text-black font-manrope"
                        value={name}
                        onChangeText={setName}
                        placeholder={'Name'}
                    />

                    <TextInput
                        className="border border-woofGrey rounded-xl px-4 py-3 text-base text-black font-manrope"
                        value={email}
                        onChangeText={setEmail}
                        placeholder={'Email'}
                    />

                    <View className="relative mb-6">
                        <TextInput
                            className="border border-woofGrey rounded-xl px-4 py-3 text-base text-black font-manrope pr-10"
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Password"
                            secureTextEntry={!showPassword}
                            autoCapitalize="none"
                        />
                        <Pressable
                            className="absolute right-4 top-3"
                            onPress={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <EyeOff size={22} color="#8E8E8E" />
                            ) : (
                                <Eye size={22} color="#8E8E8E" />
                            )}
                        </Pressable>
                    </View>

                    <TouchableOpacity className="flex-row items-center space-x-2 gap-x-4"
                        onPress={() => setChecked(!checked)}
                        activeOpacity={0.8}>
                        <View
                            className={`w-6 h-6 rounded-md border border-gray-400 flex items-center justify-center ${checked ? "bg-woofBrown border-woofBrown" : ""
                                }`}
                        >
                            {checked && <Check size={14} color="white" />}
                        </View>
                        <View>
                            <Text className="text-base text-black font-manrope">By creating an account your agree
                                to our </Text>
                            <Text className="text-base text-woofBrown font-manropeSemiBold">Terms and conditions</Text>
                        </View>

                    </TouchableOpacity>

                    <TouchableOpacity
                        //onPress={() => }
                        className="rounded-2xl py-3 mt-7 items-center bg-woofBrown text-white"
                    >
                        <Text className="text-white font-manropeBold text-base">
                            Sign up
                        </Text>
                    </TouchableOpacity>

                    <View className="items-center mt-4">
                        <View className="flex-row gap-x-2">
                            <Text className="text-sm text-black font-manrope">Have an account? </Text>
                            <TouchableOpacity className="items-end">
                                <Text className="text-sm text-woofBrown font-manropeSemiBold">Sign In</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>






            </View>

        </SafeAreaView>
    );
}
