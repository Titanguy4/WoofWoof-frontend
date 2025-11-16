import Login from "@/screens/Login";
import ProfileScreen from "@/screens/Profile";
import { useAuth } from "@/utils/auth/AuthContext";
import React from "react";

export default function ProfileTab() {
  const { isAuthenticated } = useAuth();

  return <>{isAuthenticated ? <ProfileScreen /> : <Login />}</>;
}
