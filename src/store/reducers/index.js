import { combineReducers } from 'redux';
import posts from './post_reducer';
import user from './user_reducer';
const appReducers = combineReducers({
    posts,
    user
})
export default appReducers;