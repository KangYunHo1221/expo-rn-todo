import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  NotFound: undefined;
};

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>; 