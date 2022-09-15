import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { useState, useEffect } from "react";
import { blueWater, cream, WIDTH } from "../../constants/constants";
import { useAppDispatch, useAppSelector } from "../../store/store";
import LogoutIcon from "./Logout";
import { logoutAction } from "../../store/rootReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppNavigation } from "../../screens/types";

export const Header = () => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();
  const [user, setUser] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        setUser(user);
      } else {
        setUser("");
      }
    };
    getUser();
  });

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    dispatch(logoutAction());
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      {WIDTH < 744 ? (
        <Image
          source={require("../../../assets/logoSmall.png")}
          style={{ width: 70, height: 63 }}
        />
      ) : (
        <Image
          source={require("../../../assets/logoLarge.png")}
          style={{ width: 273, height: 63 }}
        />
      )}
      {user && (
        <TouchableOpacity onPress={logout}>
          <LogoutIcon fill={blueWater} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: 118,
    backgroundColor: cream,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: WIDTH * 0.048,
  },
});
