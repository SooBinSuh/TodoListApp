import {
  KeyboardAvoidingView,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import Todo from '../../@types/Todo';
import {ColorConstants, SizeConstants} from '../../constants/Constants';
import {Pressable} from 'react-native';

export type VTodoDetailProps = {
  todo: Todo;
  isComplete: boolean;
  isEditable: boolean;
  inputContent: string;
  handleToggleChange: () => void;
  handleInputChange: (t: string) => void;
  handleSetTodo: () => void;
  handleBackgroundPress: () => void;
};
export const VTodoDetail = (props: VTodoDetailProps) => {
  return (
    <Pressable style={{flex: 1}} onPress={props.handleBackgroundPress}>
      <View style={{flex: 1, padding: SizeConstants.paddingLarge}}>
        <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
          <View style={{flex: 1, justifyContent: 'flex-start'}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}>
              <Text>완료상태</Text>
              <Switch
                value={props.isComplete}
                onValueChange={props.handleToggleChange}
              />
            </View>
            <TextInput
              editable={props.isEditable}
              multiline={true}
              value={props.inputContent}
              onChangeText={props.handleInputChange}
              style={{
                flex: 0.7,
                backgroundColor: ColorConstants.backgroundMedium,
                marginVertical: SizeConstants.paddingRegular,
              }}
            />
            <Pressable
              disabled={!props.isEditable}
              onPress={props.handleSetTodo}
              style={{
                height: SizeConstants.bottomButtonHeight,
                backgroundColor: ColorConstants.primary,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>저장하기</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Pressable>
  );
};

export default VTodoDetail;
