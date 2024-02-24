/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from 'react-native';

import TodoModal from './views/components/TodoModal';
import {Provider, useSelector} from 'react-redux';
import store from './store/reducers';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {TodoStackParamList} from './@types/Stacks';
import TodoHome from './views/container/TodoHome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAppSelector } from './hooks';
import TodoDetail from './views/container/TodoDetail';

// import createNativeStackNavigator from '@react-navigation/native-stack/lib/typescript/src/navigators/createNativeStackNavigator';

const TodoStack = createNativeStackNavigator<TodoStackParamList>();

const TodoStackView = () => {
  const error = useAppSelector(state=>state.todos.error);
  useEffect(()=>{
    //NOTE: 디버깅용 State.Error 출력
    console.log("error!:",error);
  },[error])
  return (
    <TodoStack.Navigator initialRouteName="TodoHome">
      <TodoStack.Screen name="TodoHome" component={TodoHome} options={{headerTitle:"할일"}} />
      <TodoStack.Screen name="TodoDetail" component={TodoDetail} options={{headerTitle:"상세 정보"}}/>
    </TodoStack.Navigator>
  );
};

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1}}>
            <TodoStackView />
            <TodoModal/>
          </View>
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
