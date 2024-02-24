import { Pressable, Switch, Text, View } from "react-native"
import { ColorConstants, FontConstants, SizeConstants } from "../../constants/Constants";

export type VTodoListItemProp = {
    content:string;
    isComplete:boolean;
    isLastItem:boolean;
    handleDeletePress:()=>void;
    handleEditPress:()=>void;
    handleToggleComplete:()=>void;
}
const VTodoListItem = (props:VTodoListItemProp)=>{
 return (
    <View
    style={{
      flex: 1,
      justifyContent: 'center',
      borderBottomColor: 'black',
      borderBottomWidth: props.isLastItem ? 0 : 1,
    }}>
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Text
        style={{
          flex: 1,
          fontSize: FontConstants.sizeTitle,
        }}
        numberOfLines={4}
        ellipsizeMode="middle">
        {props.content}
      </Text>
      <View
        style={{flexDirection: 'row'}}
        //BUTTONS
      >
        <Pressable
          onPress={props.handleEditPress}
          style={{
            padding: 8,
            backgroundColor: ColorConstants.green30,
            borderRadius: SizeConstants.borderRadius,
            justifyContent: 'center',
            alignItems: 'center',
            marginEnd: SizeConstants.paddingRegular,
          }}>
          <Text>수정</Text>
        </Pressable>
        <Pressable
          onPress={props.handleDeletePress}
          style={{
            padding: 8,
            backgroundColor: ColorConstants.warning30,
            borderRadius: SizeConstants.borderRadius,
            justifyContent: 'center',
            alignItems: 'center',
            marginEnd: SizeConstants.paddingRegular,
          }}>
          <Text>삭제</Text>
        </Pressable>
        <Switch
          value={props.isComplete}
        //   onValueChange={() => props.handleToggleComplete(item.id)}
          onValueChange={props.handleToggleComplete}
        />
      </View>
    </View>
  </View>
 )   
}
export default VTodoListItem;