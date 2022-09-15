import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Posts } from "../../../store/rootReducer";
import { blueWater, WIDTH } from "../../../constants/constants";

type PostProps = {
  post: Posts;
};

export const PostItem = ({ post }: PostProps) => {
  return (
    <View style={styles.container}>
      {WIDTH >= 744 && (
        <Image source={{ uri: post.photo }} style={styles.image} />
      )}
      <Text style={styles.text}>Author: {post.name}</Text>
      <Text style={styles.text}>Company: {post.company}</Text>
      <Text style={styles.text}>Title: {post.title}</Text>
      {WIDTH >= 744 && (
        <Text style={styles.text} numberOfLines={5}>
          {post.body}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: WIDTH < 744 ? WIDTH - 40 : 325,
    width: WIDTH,
    height: WIDTH < 744 ? 200 : 470,
    borderWidth: 5,
    borderColor: blueWater,
    borderRadius: 6,
    marginTop: 10,
    padding: WIDTH < 744 ? 17 : 25,
    marginRight: 20,
    justifyContent: "space-between",
  },
  image: {
    width: 150,
    height: 150,
  },
  text: {
    fontSize: 16,
    fontWeight: "800",
    overflow: "hidden",
  },
});
