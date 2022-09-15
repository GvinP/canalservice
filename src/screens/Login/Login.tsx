import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../components/Header/Header";
import { blueWater, cream, HEIGHT, WIDTH } from "../../constants/constants";
import { clearError, loginThunk } from "../../store/rootReducer";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { useAppNavigation } from "../types";

export const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.root.username);
  const error = useAppSelector((state) => state.root.error);
  const navigation = useAppNavigation();

  useEffect(() => {
    const getUser = async () => {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        navigation.navigate("Posts");
      }
    };
    getUser();
  }, [username]);

  const handleSubmit = () => {
    if (login.trim() && password.trim()) {
      dispatch(clearError());
      dispatch(loginThunk({ login: login.trim(), password: password.trim() }));
      setLogin("");
      setPassword("");
    }
  };

  return (
    <SafeAreaView>
      <Header />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.title}>Authorization</Text>
            <View style={styles.inputContainer}>
              <Text style={styles.text}>login</Text>
              <TextInput
                style={styles.input}
                value={login}
                onChangeText={setLogin}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.text}>password</Text>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
          <View>{error && <Text style={styles.error}>{error}</Text>}</View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: HEIGHT - 236,
    alignItems: "center",
    justifyContent: WIDTH < 744 ? "flex-start" : "center",
  },
  formContainer: {
    maxWidth: 480,
    height: 330,
    borderWidth: 5,
    borderColor: blueWater,
    borderRadius: 6,
    paddingVertical: WIDTH * 0.048,
    paddingHorizontal: WIDTH < 744 ? WIDTH * 0.1 : 20,
    marginHorizontal: WIDTH * 0.048,
    marginTop: WIDTH < 744 ? WIDTH * 0.048 : 0,
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: blueWater,
  },
  inputContainer: {
    flexDirection: "row",
    flexWrap: WIDTH < 744 ? "wrap" : "nowrap",
    width: WIDTH < 744 ? "100%" : 440,
    justifyContent: WIDTH < 744 ? "flex-start" : "space-between",
  },
  text: {
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 12,
  },
  input: {
    borderWidth: 4,
    borderColor: blueWater,
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
    width: WIDTH < 744 ? WIDTH * 0.66 : WIDTH * 0.4,
    height: 39,
    paddingHorizontal: 12,
  },
  button: {
    width: 213,
    height: 43,
    borderRadius: 10,
    backgroundColor: cream,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "800",
  },
  error: {
    fontSize: 18,
    fontWeight: "800",
    color: "red",
    marginTop: 20,
  },
});
