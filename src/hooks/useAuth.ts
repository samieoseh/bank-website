import AuthContext from "@/context/AuthContext";
import { useContext } from "react";

export default function useAuth ()   {
  if (!AuthContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return useContext(AuthContext)
}