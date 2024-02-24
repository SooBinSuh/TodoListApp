import {
  Button,
  FlatList,
  LayoutChangeEvent,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import {useAppSelector} from '../../hooks';
import {
  ColorConstants,
  FontConstants,
  SizeConstants,
} from '../../constants/Constants';
import {todoActions} from '../../store/reducers/todoSlice';

import {useDispatch} from 'react-redux';
import {useEffect, useMemo, useReducer, useRef, useState} from 'react';
import Todo from '../../@types/Todo';
import {TodoEditModalMode, modalActions} from '../../store/reducers/modalSlice';
import {useNavigation} from '@react-navigation/native';

import {RootNavigationProp, TodoStackParamList} from '../../@types/Stacks';
import createYesOrNoAlert from '../components/MyAlert';
import {
  ActionCreatorWithPayload,
  CaseReducerActions,
  Dispatch,
  current,
} from '@reduxjs/toolkit';
import VTodoListItem, { VTodoListItemProp } from '../vac/VTodoListItem';
import TodoListItem from '../components/TodoListItem';

//Promise를 반환하는 Wrapper
const PromisableActionWrapper = <Type extends string, Payload>(
  dispatch: Dispatch,
  fn: ActionCreatorWithPayload<Payload, Type>,
  payload: {},
) => {
  return new Promise((resolve, reject) => {
    try {
      const newPayload: Payload = {...payload, resolve, reject} as Payload;
      dispatch(fn(newPayload));
    } catch (e) {
      reject();
    }
  });
};

const TodoList = () => {
  const _pageSize = 10;
  const _initialPageNum = 0;
  const {data, idOfCompleteTodos, isLoading} = useAppSelector(
    state => state.todos,
  );
  const [currentPage, setCurrentPage] = useState(_initialPageNum);
  const navigation = useNavigation<RootNavigationProp>();
  useEffect(() => {
    PromisableActionWrapper(dispatch, todoActions.loadGetPagedTodosRequest, {
      page: currentPage,
      pageSize: _pageSize,
    })
      .then(() => setCurrentPage(currentPage + 1))
      .catch(() => {});

    return () => {
      setCurrentPage(_initialPageNum);
    };
  }, []);

  const dispatch = useDispatch();

  //TODO: 액션핸들러에서 결과 배열을 계산하는것이 아닌 reducer에서 처리하도록 리펙토링 필요
  const handleToggleChange = (id: number) => {
    let newArr = [...idOfCompleteTodos];
    let index = idOfCompleteTodos.indexOf(id);
    if (index > -1) {
      newArr.splice(index, 1);
    } else {
      newArr.push(id);
    }
    dispatch(todoActions.toggleCompleteById(newArr));
  };
  const handleOnEndReached = () => {
    PromisableActionWrapper(dispatch, todoActions.loadGetPagedTodosRequest, {
      page: currentPage,
      pageSize: _pageSize,
    })
      .then(() => {
        setCurrentPage(currentPage + 1);
      })
      .catch(() => {});
  };
  const handleRefresh = () => {
    PromisableActionWrapper(dispatch, todoActions.loadRefreshTodosRequest, {
      pageSize: _pageSize,
    })
      .then(() => setCurrentPage(_initialPageNum + 1))
      .catch(() => {});
  };

  const handleItemPress = (item: Todo) => {
    navigation.navigate('TodoDetail', {todo: item});
  };

  return (
    <FlatList
      contentContainerStyle={{paddingHorizontal: SizeConstants.paddingRegular}}
      data={data}
      refreshing={isLoading}
      renderItem={({item, index}) => (
        <Pressable style={{height: 200}} onPress={() => handleItemPress(item)}>
          <TodoListItem item={item} handleToggleChange={handleToggleChange} />
        </Pressable>
      )}
      keyExtractor={item => `${item.id}`}
      onEndReached={() => handleOnEndReached()}
      onRefresh={() => handleRefresh()}
    />
  );
};




const TodoHome = () => {
  const dispatch = useDispatch();
  const {data, isLoading} = useAppSelector(state => state.todos);

  const handleShowModalButtonPress = () => {
    dispatch(
      modalActions.toggleTodoEditModalVisible({
        content: '',
        mode: TodoEditModalMode.create,
      }),
    );
  };
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
        onPress={handleShowModalButtonPress}>
        <Text>추가하기</Text>
      </Pressable>
    </View>
  );
};

export default TodoHome;
