import { StyleSheet, View, ScrollView } from "react-native";
import { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../components/Header/Header";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { getPosts } from "../../store/rootReducer";
import { PostItem } from "./Post/Post";
import { WIDTH } from "../../constants/constants";

export const Posts = () => {
  const posts = useAppSelector((state) => state.root.posts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView>
        <View style={styles.postsContainer}>
          {posts.map((post) => (
            <PostItem post={post} key={post.id} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  postsContainer: {
    paddingHorizontal: WIDTH * 0.048,
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
