export const UserReducer = (userState, action) => {
  switch (action.type) {
    case "GET_USER":
      return {
        ...userState,
        user: action.payload,
      };
    case "UPDATE":
      return {
        ...userState,
        ...userState.user,
        followers: action.payload.followers,
        following: action.payload.following,
      };
    case "LOGIN":
      return {
        ...userState,
        user: action.payload,
      };
    case "REGISTER":
      return {
        ...userState,
        user: action.payload,
      };
    case "LOGOUT":
      return {
        ...userState,
        user: null,
      };

    default:
      return userState;
  }
};
