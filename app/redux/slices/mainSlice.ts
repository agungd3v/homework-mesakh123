import { createSlice, Dispatch } from "@reduxjs/toolkit";
import axios from "axios";

// Define the interface for a Card
interface Card {
  activity: string;
  type: string;
  participants: number;
  price: number;
  link: string;
  key: string;
  accessibility: number;
}

// Define the interface for the state managed by this slice
interface CardState {
  cardDetails: Card;
}

const initialState: CardState = {
  cardDetails: {
    activity: "",
    type: "",
    participants: 0,
    price: 0,
    link: "",
    key: "",
    accessibility: 0,
  },
}

const cardSlice = createSlice({
  name: "cards", // Name of the slice
  initialState, // Initial state
  reducers: {
    // Reducer for updating cardDetails after a successful resource fetch
    getResourcesSuccess(state, action) {
      const resources = action.payload;
      state.cardDetails = resources;
    },
  },
});

export const { getResourcesSuccess } = cardSlice.actions;

export default cardSlice.reducer;
