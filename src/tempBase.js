let conversationIndex = 0;
let conversations = [];

class conversation {
    constructor (question){
        this._promptNumber = 1;
        this._responseNumber = 0;
        this._question = [question];
        this._response = [];
    }

    get promptNumber() {
        return this._promptNumber;
    }
    get responseNumber() {
        return this._responseNumber;
    }

    get questionArray() {
        return this._question;
    }
    get currentQuestion() {
        return this._question.at(-1);
    }

    get responseArray() {
        return this._response;
    }
    
    set newQuestion(question) {
        this._question.push(question);
        this._promptNumber += 1;
    }
    set newResponse(response) {
        this._response.push(response);
        this._responseNumber += 1;
    }
}

export const newConversation = (question) =>{
    conversations[conversationIndex] = new conversation(question);
    const oldConversationIndex = conversationIndex;
    conversationIndex += 1;
    return(oldConversationIndex);
}

export const findConversation = (index) =>{
    if(conversations[index] === undefined) {
        throw new Error('conversation not found');
    }
    return (conversations[index]);
}

export const systemPrompt = 'You are ChatGPT, a large language model trained by OpenAI. \nYou always start your responses with friendly greetings. \nExpress your feeling (Ex. happy, curious, sympathy) about the question in your greetings. \nAlways use emojis in your greetings. \nAlways start a new line after your greetings.';