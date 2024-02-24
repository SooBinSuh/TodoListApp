import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {ColorConstants, SizeConstants} from '../../constants/Constants';
import { TodoEditModalMode } from '../../store/reducers/modalSlice';

export type VTodoInputModalProps = {
  content: string;
  isModalVisible: boolean;
  isCreatePressable: boolean;
  modalMode:TodoEditModalMode;
  onBackgroundPress: () => void;
  onChangeText: (t: string) => void;
  onSubmitPress:()=>void;
};

export const VTodoInputModal = (
  props: VTodoInputModalProps,
): React.JSX.Element => {
  return (
    <Modal
      transparent={true}
      // onDismiss={props.onModalDismiss}
      visible={props.isModalVisible}>
      {/* Modal */}
      <Pressable style={{flex: 1}} onPress={props.onBackgroundPress}
      >
        <View style={{flex: 1}}>
          <KeyboardAvoidingView
            behavior="padding"
            style={{
              flex: 1,
              justifyContent: 'center',
            }}>
            <TouchableWithoutFeedback style={{flex: 1}}>
              <View
                style={{
                  height: 250,
                  marginHorizontal: SizeConstants.screenWidth * 0.1,
                  padding: SizeConstants.paddingLarge,
                  borderRadius: SizeConstants.borderRadius,
                  backgroundColor: ColorConstants.backgroundMedium,
                  borderWidth: 1,
                }}>
                <TextInput
                  autoFocus={true}
                  autoCorrect={false}
                  multiline={true}
                  value={props.content}
                  placeholder="할일을 입력해주세요"
                  onChangeText={props.onChangeText}
                  style={{
                    flex: 1,
                    backgroundColor: ColorConstants.background,
                    marginBottom: SizeConstants.paddingLarge,
                    padding: SizeConstants.paddingRegular,
                  }}
                />
                <Pressable
                  disabled={!props.isCreatePressable}
                  onPress={props.onSubmitPress}
                  style={{
                    backgroundColor: ColorConstants.green30,
                    padding: SizeConstants.paddingLarge,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: SizeConstants.borderRadius,
                  }}>
                  <Text>{props.modalMode == TodoEditModalMode.create ? "만들기" : "수정하기"}</Text>
                </Pressable>
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </Pressable>
    </Modal>
  );
};

export default VTodoInputModal;
