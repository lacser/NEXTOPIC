import { configureStore, createSlice } from '@reduxjs/toolkit';
import chatHistoryReducer from './features/ChatHistoryPanel/chatHistorySlice';

// Helper function to save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

// Helper function to load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined; // If nothing is stored, return undefined so the app will use the default state
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state", err);
    return undefined;
  }
};

// Load the persisted state from localStorage
const persistedState = loadState();

// Create the store with persisted state
const store = configureStore({
  reducer: {
    chatHistory: chatHistoryReducer,
  },
  preloadedState: persistedState
});

// Subscribe to store changes and save state to localStorage
store.subscribe(() => {
  saveState({
    chatHistory: store.getState().chatHistory, // Save only the chatHistory slice of the state
  });
});

export default store;