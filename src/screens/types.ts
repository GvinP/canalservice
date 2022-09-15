import { NavigationProp, useNavigation } from "@react-navigation/native";

export type RootStackParamsList = {
  Posts: undefined;
  Login: undefined;
};

export type NavigationUseType = NavigationProp<RootStackParamsList>;

export const useAppNavigation = () => useNavigation<NavigationUseType>();
