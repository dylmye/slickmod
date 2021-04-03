import React, { useState } from 'react';
import { Pressable } from 'react-native';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { decrement, increment } from './slice';
import { Text, View } from '../Themed';

const Counter = () => {
  const count = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch();

  return (
    <View>
      <Text>{count}</Text>
      <Pressable onPress={() => dispatch(increment())}>
        <Text>Increment!</Text>
      </Pressable>
      <Pressable onPress={() => dispatch(decrement())}>
        <Text>Decrement!</Text>
      </Pressable>
    </View>
  );
};

export default Counter;
