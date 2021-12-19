import React, { useEffect } from "react";
import { FlatList, ListRenderItem, StyleSheet, ViewStyle } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { Divider, FAB } from "react-native-paper";

import { ConversationItem, MainStackParamList } from "types";
import {
  clearActiveThread,
  fetchThreadById,
  getActiveThread,
} from "features/Thread/slice";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { View } from "components/Themed";
import ThreadItem from "components/ThreadItem";

interface Styles {
  container: ViewStyle;
  composeFab: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
  },
  composeFab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

const Thread = ({ route }: StackScreenProps<MainStackParamList, "Thread">) => {
  const { id } = route.params;
  const dispatch = useAppDispatch();
  const thread = useAppSelector(getActiveThread);

  const renderThreadPart: ListRenderItem<ConversationItem> = ({ item }) => (
    <ThreadItem thread={item} />
  );

  useEffect(() => {
    dispatch(fetchThreadById({ id }));

    return () => {
      dispatch(clearActiveThread());
    };
  }, []);

  return (
    <View style={styles.container}>
      <FlatList<ConversationItem>
        data={thread}
        renderItem={renderThreadPart}
        ItemSeparatorComponent={Divider}
      />
      <FAB icon="send" style={styles.composeFab} label="Reply" />
    </View>
  );
};

export default Thread;
