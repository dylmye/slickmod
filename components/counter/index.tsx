import React, { useState } from 'react';
import { Pressable } from 'react-native';

import { Text, View } from 'components/Themed';
import { useAppSelector, useAppDispatch } from 'hooks/redux';
import { decrement, increment } from './slice';

const Counter = () => {
  const count = useAppSelector(state => state.counter.value)
  const dispatch = useAppDispatch();

  return (
    <View>
      <Text>{count}</Text>
      <Pressable onPress={() => dispatch(increment())}>
        <Text>Increment</Text>
      </Pressable>
      <Pressable onPress={() => dispatch(decrement())}>
        <Text>Decrement</Text>
      </Pressable>
    </View>
  );
};

export default Counter;
