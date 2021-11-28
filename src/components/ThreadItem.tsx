import React, { useMemo, useState } from "react";
import {
  Linking,
  StyleProp,
  StyleSheet,
  TextStyle,
  ViewStyle,
} from "react-native";
import { IconButton, Menu, Text } from "react-native-paper";
import HTMLView from "react-native-htmlview";

import { View } from "./Themed";
import {
  colourError,
  colourSecondaryDark,
  colourWhite,
} from "constants/Colours";
import { ConversationItem } from "types";

interface Styles {
  container: ViewStyle;
  title: ViewStyle;
  action: ViewStyle;
  authorContainer: ViewStyle;
  author: TextStyle;
  body: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  title: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  author: {
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  authorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  action: {
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: "auto",
  },
  body: {
    margin: 12,
    lineHeight: 24,
  },
});

interface MenuProps {
  visible: boolean;
  onShow: () => void;
  onDismiss: () => void;
  author: string;
  style?: StyleProp<ViewStyle>;
}

const TitleMenu = ({
  visible,
  onShow,
  onDismiss,
  author,
  style,
}: MenuProps) => (
  <Menu
    visible={visible}
    onDismiss={onDismiss}
    anchor={
      <IconButton
        onPress={onShow}
        icon="dots-vertical"
        size={20}
        style={style}
      />
    }>
    <Menu.Item
      title={`u/${author}`}
      accessibilityLabel="Navigate to user's profile"
      onPress={() => Linking.openURL(`https://reddit.com/u/${author}`)}
    />
    <Menu.Item title="Mute User" />
  </Menu>
);

interface Props {
  thread: ConversationItem;
}

const ThreadItem = ({ thread }: Props) => {
  const date = useMemo(() => {
    const d = new Date(thread.date);
    if (d.getDate() === new Date().getDate()) {
      return "Today";
    }

    return d.toLocaleDateString();
  }, [thread.date]);
  const [menuVisible, setMenuVisible] = useState(false);

  const authorColour = thread.isMod
    ? colourSecondaryDark
    : thread.isAdmin
    ? colourError
    : colourWhite;

  const showAuthorMenu = thread.author?.toLowerCase() !== "automoderator";

  if (thread.type === "Action") {
    return (
      <View style={styles.container}>
        <View style={styles.title}>
          <View style={styles.action}>
            <Text style={[styles.author, { color: authorColour }]}>
              {thread.author}
            </Text>
            <Text> {thread.message}</Text>
            <Text>
              {" \u2022 "}
              {date}
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <View style={styles.authorContainer}>
          <Text style={[styles.author, { color: authorColour }]}>
            {thread.author}
          </Text>
          <Text>
            {" \u2022 "}
            {date}
          </Text>
        </View>
        {showAuthorMenu && (
          <TitleMenu
            visible={menuVisible}
            onShow={() => setMenuVisible(true)}
            onDismiss={() => setMenuVisible(false)}
            author={thread.author}
          />
        )}
      </View>
      <HTMLView value={thread.message} />
    </View>
  );
};

export default ThreadItem;
