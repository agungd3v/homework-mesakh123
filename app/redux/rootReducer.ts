import { combineReducers } from 'redux';
import userSliceReducer from './slices/userSlice';

const rootReducer = combineReducers({
  user: userSliceReducer,
});

export default rootReducer;