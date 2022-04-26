import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

// eslint-disable-next-line
export default (reducers) => {
  return persistReducer(
    {
      key: "startdev",
      storage,
      whitelist: ["auth", "user"],
    },
    reducers
  );
};
