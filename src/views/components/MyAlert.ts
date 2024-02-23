import { Alert } from "react-native";

export type YesOrNoAlertProps = {
    title:string;
    body:string;
    handleOK:()=>void;
    handleNO:()=>void;
}

const createYesOrNoAlert = (props:YesOrNoAlertProps) =>
Alert.alert(props.title, props.body, [
  {
    text: '아니요',
    onPress: props.handleNO,
    style: 'cancel',
  },
  {text: '예', onPress: props.handleOK},
]);


export default createYesOrNoAlert