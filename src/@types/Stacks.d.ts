import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type TodoStackParamList = {
    TodoHome:undefined;
    TodoDetail:{todo:Todo};
}

export type RootNavigationProp = NativeStackNavigationProp<TodoStackParamList>;