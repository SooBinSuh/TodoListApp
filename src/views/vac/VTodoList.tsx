import { FlatList, Pressable } from "react-native"
import { SizeConstants } from "../../constants/Constants"
import Todo from "../../@types/Todo"
import TodoListItem from "../components/TodoListItem"

export type VTodoListProps = {
    data:Todo[],
    isLoading:boolean,
    handleItemPress:(item:Todo)=>void,
    handleToggleChange:(id:number)=>void,
    handleOnEndReached:()=>void,
    handleRefresh:()=>void,
}

const VTodoList = (props:VTodoListProps)=>{


    return (
        <FlatList
        contentContainerStyle={{paddingHorizontal: SizeConstants.paddingRegular}}
        data={props.data}
        refreshing={props.isLoading}
        renderItem={({item, index}) => (
          <Pressable style={{height: 200}} onPress={() => props.handleItemPress(item)}>
            <TodoListItem item={item} handleToggleChange={()=>props.handleToggleChange(item.id)} />
          </Pressable>
        )}
        keyExtractor={item => `${item.id}`}
        onEndReached={props.handleOnEndReached}
        onRefresh={props.handleRefresh}
      />
    )
}
export default VTodoList;