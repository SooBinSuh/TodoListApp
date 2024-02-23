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
import { toggleTodoEditModalVisible } from './store/reducers/modalSlice';
// import createNativeStackNavigator from '@react-navigation/native-stack/lib/typescript/src/navigators/createNativeStackNavigator';

const TodoStack = createNativeStackNavigator<TodoStackParamList>();
// const TodoStack = createNativeStackNavigator
//MODAL VAC
const TodoStackView = () => {
  return (
    <TodoStack.Navigator initialRouteName="TodoHome">
      <TodoStack.Screen name="TodoHome" component={TodoHome} />
      <TodoStack.Screen name="TodoDetail" component={TodoHome}/>
    </TodoStack.Navigator>
  );
};

function App(): React.JSX.Element {
  // const [isModalVisible, setModalVisible] = useState(false);
  
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaView style={{flex: 1}}>
          <View style={{flex: 1}}>
            <TodoStackView />
            <TodoModal
              // handleCloseModal={toggleTodoEditModalVisible}
            />
          </View>
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
