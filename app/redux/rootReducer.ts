import { combineReducers } from 'redux';
import mainSliceReducer from './slices/mainSlice';

const rootReducer = combineReducers({
  cards: mainSliceReducer,
});

export default rootReducer;