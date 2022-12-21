// import { ActionTypes } from "@mui/base";

const postReducer = (postState, action) => {
  switch (action.type) {
    case "GET_POSTS":
      return {
        ...postState,
        posts: action.payload,
      };
    case "ONE_POST":
      return {
        ...postState,
        post: [action.payload],
      };
    case "UPDATE_POST":
      return {
        ...postState,
        post: [action.payload],
      };
    case "CREATE_POST":
      return {
        ...postState,
        posts: [...postState.posts, action.payload],
      };

    case "LIKE_POST":
      return {
        ...postState,
        posts: postState.posts.map((it) =>
          it._id === action.payload._id ? action.payload : it
        ),
      };
    case "SAVE":
      return {
        ...postState,
        savedPost: action.payload,
      };
    case "ADD_SAVE":
      return {
        ...postState,
        savedPost: [...postState.savedPost, action.payload],
      };
    case "REMOVE_SAVE":
      return {
        ...postState,
        savedPost: postState?.savedPost?.filter(
          (it) => it._id !== action.payload._id
        ),
      };
    default:
      return postState;
    // case "FETCH_ALL":
    //   return action.payload;
    // case "CREATE_POST":
    //   return [...posts, action.payload];
    // case "DELETE_POST":
    //   return posts.filter((post) => post._id !== action.payload);
    // case "LIKE_POST":
    //   return posts.map((post) =>
    //     post._id === action.payload._id ? action.payload : post
    //   );

    // default:
    //   return postState;
  }
};

export default postReducer;
