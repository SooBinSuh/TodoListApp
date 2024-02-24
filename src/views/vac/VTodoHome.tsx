import { Pressable, Text, View } from "react-native"
import TodoList from "../components/TodoList"
import { SizeConstants } from "../../constants/Constants"

export type VTodoHomeProps = {
    handleShowModalButtonPress:()=>void,
}

const VTodoHome = (props:VTodoHomeProps)=>{
    return (
        <View style={{flex: 1}}>
        <TodoList />
        <Pressable
          style={{
            height: SizeConstants.bottomButtonHeight,
            backgroundColor: 'lightblue',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={props.handleShowModalButtonPress}>
          <Text>추가하기</Text>
        </Pressable>
      </View>
    )
}
export default VTodoHome;