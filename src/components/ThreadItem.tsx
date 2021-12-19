import React, { useEffect, useMemo, useState } from "react";
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
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(isToday);
dayjs.extend(localizedFormat);

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
  isMutable: boolean;
  style?: StyleProp<ViewStyle>;
}

const TitleMenu = ({
  visible,
  onShow,
  onDismiss,
  author,
  isMutable,
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
    {/* {isMutable && <Menu.Item title="Mute User" />}
    {isMutable && <Menu.Item title="Approve User" />} */}
  </Menu>
);

interface Props {
  thread: ConversationItem;
}

const ThreadItem = ({ thread }: Props) => {
  const date = useMemo(() => {
    const d = dayjs(thread.date);
    if (d.isToday()) {
      return "Today, " + d.format("LT");
    }

    return d.format("l");
  }, [thread.date]);
  const [menuVisible, setMenuVisible] = useState(false);

  const authorColour = thread.isMod
    ? colourSecondaryDark
    : thread.isAdmin
    ? colourError
    : colourWhite;

  const isActionItem = thread.type === "Action";

  const showAuthorMenu =
    !isActionItem && thread.author?.toLowerCase() !== "automoderator";

  if (isActionItem) {
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
        <View style={isActionItem ? styles.action : styles.authorContainer}>
          <Text style={[styles.author, { color: authorColour }]}>
            {thread.author}
          </Text>
          {isActionItem && <Text> {thread.message}</Text>}
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
            isMutable={!thread.isMod && !thread.isAdmin}
          />
        )}
      </View>
      {!isActionItem && <HTMLView value={thread.message} />}
    </View>
  );
};

export default ThreadItem;
