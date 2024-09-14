import { createSlice } from '@reduxjs/toolkit';

const createConversation = (mode, question) => ({
    promptNumber: 1,
    responseNumber: 0,
    initialMode: mode,
    questionArray: [question],
    responseArray: [],
});

const chatHistorySlice = createSlice({
    name: 'chatHistory',
    initialState: {
        conversations: [],
        conversationNum: 0,
    },
    reducers: {
        newConversation: (state, action) => {
            state.conversations.push(createConversation(action.payload.mode, action.payload.question));
            state.conversationNum += 1;
        },
        addQuestion: (state, action) => {
            const conversation = state.conversations[action.payload.conversationIndex];
            conversation.questionArray.push(action.payload.question);
            conversation.promptNumber += 1;
        },
        addResponse: (state, action) => {
            const conversation = state.conversations[action.payload.conversationIndex];
            conversation.responseArray.push(action.payload.response);
            conversation.responseNumber += 1;
        }

    },
});

export default chatHistorySlice.reducer;
export const { newConversation, addQuestion, addResponse } = chatHistorySlice.actions;