import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'

// Define a type for the slice state
interface IUserState {
  name?: string;
  isLog: boolean;
}

// Define the initial state using that type
const initialState: IUserState = {
  name: "lolo",
  isLog: false
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setName: (state: IUserState, action: PayloadAction<string>) => {
     console.log(action);
    },
    // decrement: state => {
    //   state.value -= 1
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // }
  }
})

export const { setName } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const name = (state: RootState) => state.user.name;

export default userSlice.reducer