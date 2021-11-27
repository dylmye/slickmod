import React, { useEffect } from "react";
import { FlatList, StyleSheet, View, ViewStyle } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { MainStackParamList } from "types";
import { fetchThreadById } from "features/Thread/slice";
import { useAppDispatch } from "hooks/redux";

interface Styles {
  container: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
  },
});

const Thread = ({
  navigation,
  route,
}: StackScreenProps<MainStackParamList, "Thread">) => {
  const { id } = route.params;
  const dispatch = useAppDispatch();

  console.log(id);

  useEffect(() => {
    dispatch(fetchThreadById({ id }));
  }, []);

  return <View style={styles.container}>{/* <FlatList /> */}</View>;
};

export default Thread;
