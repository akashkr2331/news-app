import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const initialState = {
  mode: "light",
  isAuth:cookies.get("auth-token")
};
// const [isAuth, setIsAuth] = useState(cookies.get("auth-token"));

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setisAuth:(state,action)=>{
      state.isAuth=action.payload;
    }
  },
});

export const { setMode, setisAuth} =
  authSlice.actions;
export default authSlice.reducer;

