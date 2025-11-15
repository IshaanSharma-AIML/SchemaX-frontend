// Redux store configuration
// Combines all reducers (auth, projects, chat) into a single store
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './users-panel/auth/authSlice';
import projectReducer from './users-panel/projects/projectSlice';
import chatReducer from './users-panel/chat/chatSlice';
export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
      projects: projectReducer,
      chat: chatReducer,
    },
  });
};