import React, { useEffect } from "react";
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Conversation } from "types";

import { View } from "components/Themed";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import {
  clearAllMessages,
  fetchConversations,
  getConversations,
  getConversationsLoading,
} from "features/ConversationList/slice";
import { List } from "react-native-paper";

interface Styles {
  container: ViewStyle;
  listItemTitle: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
  },
  listItemTitle: {
    color: "#ffffff",
  },
});

const Conversations = () => {
  const dispatch = useAppDispatch();
  const conversations = useAppSelector(getConversations);
  const loading = useAppSelector(getConversationsLoading);
  const clearMessages = () => dispatch(clearAllMessages());
  const fetchConvos = () => dispatch(fetchConversations());

  const renderConversation: ListRenderItem<Conversation> = ({ item }) => (
    <List.Item
      title={item.subject}
      description={item.messageSnippet}
      titleStyle={styles.listItemTitle}
    />
  );

  const refreshControl = (
    <RefreshControl
      refreshing={loading}
      onRefresh={() => {
        clearMessages();
        fetchConvos();
      }}
    />
  );

  useEffect(() => {
    fetchConvos();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList<Conversation>
        refreshControl={refreshControl}
        data={conversations}
        renderItem={renderConversation}
      />
    </View>
  );
};

export default Conversations;
