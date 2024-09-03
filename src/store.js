import { configureStore } from '@reduxjs/toolkit';
import chatHistoryReducer from './features/ChatHistoryPanel/chatHistorySlice';

// Create the store
const store = configureStore({
    reducer: {
        chatHistory: chatHistoryReducer,
    }
});

export default store;