import React, { useEffect } from "react";
import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import { Divider, FAB, List, Text, useTheme } from "react-native-paper";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/core";

import { Conversation } from "types";
import { View } from "components/Themed";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import {
  clearAllConversations,
  fetchConversations,
  getConversations,
  getConversationsLoading,
} from "features/ConversationList/slice";

interface Styles {
  container: ViewStyle;
  composeFab: ViewStyle;
  contentContainer: ViewStyle;
  emptyContainer: ViewStyle;
  date: TextStyle;
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
  contentContainer: {
    flexGrow: 1,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  date: {
    marginTop: 8,
    position: "absolute",
    right: 4,
  },
});

const Conversations = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const theme = useTheme();
  const conversations = useAppSelector(getConversations);
  const loading = useAppSelector(getConversationsLoading);
  const clearMessages = () => dispatch(clearAllConversations());
  const fetchConvos = () => dispatch(fetchConversations());

  const titleStyle: TextStyle = { color: theme.colors.text };

  const onRefresh = () => {
    clearMessages();
    fetchConvos();
  };

  const renderConversation: ListRenderItem<Conversation> = ({ item }) => (
    <List.Item
      title={item.subject}
      description={item.messageSnippet}
      descriptionNumberOfLines={2}
      titleStyle={titleStyle}
      titleNumberOfLines={1}
      onPress={() => navigation.navigate("Thread", { id: item.id })}
      right={props => (
        <Text style={styles.date}>{dayjs(item.lastUpdated).format("L")}</Text>
      )}
    />
  );

  const refreshControl = (
    <RefreshControl refreshing={loading} onRefresh={onRefresh} />
  );

  const EmptyView = (
    <View style={styles.emptyContainer}>
      <Text>Nothing to see here</Text>
    </View>
  );

  useEffect(() => {
    fetchConvos();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList<Conversation>
        refreshControl={refreshControl}
        data={conversations}
        contentContainerStyle={styles.contentContainer}
        renderItem={renderConversation}
        onEndReached={fetchConvos}
        ListEmptyComponent={EmptyView}
        onEndReachedThreshold={0.1}
        ItemSeparatorComponent={Divider}
      />
      <FAB icon="send" style={styles.composeFab} label="Compose" />
    </View>
  );
};

export default Conversations;
