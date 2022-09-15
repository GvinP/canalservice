import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const loginThunk = createAsyncThunk<AuthData | undefined, FormData>(
  "root/login",
  async ({ login, password }, apiThunk) => {
    const res = await new Promise<AuthData>(async (resolve, reject) => {
      if (login === "user" && password === "1234") {
        resolve({ username: login });
      } else {
        reject("Login or password is incorrect!");
      }
    });
    await AsyncStorage.setItem("user", JSON.stringify(res.username));
    return res;
  }
);

export const getPosts = createAsyncThunk<
  { users: User[]; posts: Post[]; photos: Photos[] } | undefined,
  void
>("root/getPosts", async () => {
  try {
    const users = await axios.get<User[]>(
      "https://jsonplaceholder.typicode.com/users"
    );
    const posts = await axios.get<Post[]>(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const photos = await axios.get<Photos[]>(
      "https://jsonplaceholder.typicode.com/photos"
    );
    return { users: users.data, posts: posts.data, photos: photos.data };
  } catch (error) {}
});

const rootSlice = createSlice({
  name: "rootReducer",
  initialState: {
    posts: [] as Posts[],
    username: "",
    error: "",
  },
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
    logoutAction: (state) => {
      state.username = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.username = action.payload?.username || "";
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.error = action.error.message || "";
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.posts =
          action.payload?.users!.map((user) => ({
            id: user.id,
            name: user.name,
            company: user.company.name,
            title:
              action.payload?.posts.find((post) => post.userId === user.id)
                ?.title || "",
            body:
              action.payload?.posts.find((post) => post.userId === user.id)
                ?.body || "",
            photo:
              action.payload?.photos.find((album) => album.albumId === user.id)
                ?.thumbnailUrl || "",
          })) || ([] as Posts[]);
      });
  },
});

export const { clearError, logoutAction } = rootSlice.actions;

export const root = rootSlice.reducer;

export type FormData = {
  login: string;
  password: string;
};

export type AuthData = {
  username: string;
};

export interface Posts {
  id: number;
  title: string;
  body: string;
  name: string;
  company: string;
  photo: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
}

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Photos {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
