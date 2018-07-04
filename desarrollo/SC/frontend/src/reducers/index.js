import { combineReducers } from 'redux';
import authReducer from './authReducer';
import businessReducer from './businessReducer';
import hoursReducer from './hoursReducer';
import reviewReducer from './reviewReducer';
import { reducer as reduxForm } from 'redux-form';

export default combineReducers({
  auth: authReducer,
  business: businessReducer,
  hoursForm: hoursReducer,
  review: reviewReducer,
  form: reduxForm
});
