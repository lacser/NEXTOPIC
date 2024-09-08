import styles from "./Chat.module.css";
import React, { useEffect, useState, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import { ChatInput } from "../../components/ChatInput"
import { useParams } from "react-router-dom";
import store from "../../store";
import { addResponse } from "../ChatHistoryPanel/chatHistorySlice";
import defaultUserProfilePhoto from '../../medias/defaultUserProfilePhoto300.png';


const messageComposer = (message, role) => { //生成当前问题请求对象
    return (
        {
            role,
            content: message
        }
    );
}

const historyMessageComposer = (number, conversation) => { //生成聊天历史记录请求对象
    const length = conversation.responseNumber;
    const history = [];
    if (length == 0) {
        return [];
    }
    if (length < number) {
        number = length;
    }
    for (let i = length - number; i < length; i++) {
        history.push({
            role: 'user',
            content: conversation.questionArray[i]
        })
        history.push({
            role: 'assistant',
            content: conversation.responseArray[i]
        })
    }
    return (history);
}

const Chat = () => {
    const navigate = useNavigate();
    const systemPrompt = 'You are ChatGPT, a large language model trained by OpenAI. \nYou always start your responses with friendly greetings. \nExpress your feeling (Ex. happy, curious, sympathy) about the question in your greetings. \nAlways use emojis in your greetings. \nAlways start a new line after your greetings.';
    const conversationIndex = useParams().chatIndex;
    const [historyElements, setHistoryElements] = useState([]);
    const [streamElement, setStreamElement] = useState();
    const [promptNumber, setPromptNumber] = useState(0);
    const [responseNumber, setResponseNumber] = useState(0);
    const [streamAns, setStreamAns] = useState('');
    const [conversation, setConversation] = useState(undefined);
    const [fetchInProgress, setFetchInProgress] = useState(false);
    const [refershStore, setRefreshStore] = useState(false);
    const fetchInProgressRef = useRef(false);

    useEffect(() => {
        if (!store.getState().chatHistory.conversations[conversationIndex]) {
            navigate('/');
        }
        setConversation(store.getState().chatHistory.conversations[conversationIndex]);
        console.log(store.getState().chatHistory.conversations[conversationIndex]);
    }, [conversationIndex, refershStore]);

    useEffect(() => {
        if (!conversation) {
            return; // conversation not loaded yet
        }
        const unsubscribe = store.subscribe(() => {
            setPromptNumber(conversation.promptNumber);
            setResponseNumber(conversation.responseNumber);
            setRefreshStore(!refershStore);
        });
        return unsubscribe;
    }, [conversation]);

    useEffect(() => { // fetch response from GPT
        if (!conversation) {
            return; // conversation not loaded yet
        }
        if (conversation.promptNumber <= conversation.responseNumber) {
            return; // there's no new question
        }
        if (fetchInProgressRef.current) {
            return; // Prevent concurrent fetches
        }


        console.log('fetching');

        fetchInProgressRef.current = true;
        setFetchInProgress(true);
        setStreamAns('');

        const message = messageComposer(conversation.questionArray.at(-1), 'user');
        const systemMessage = messageComposer(systemPrompt, 'system');
        const history = historyMessageComposer(2, conversation);
        let buffer = '';

        console.log([...history, systemMessage, message]);

        const fetchStream = async () => {
            const response = await fetch('http://localhost:3000/api/completion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "gpt-4o-mini",
                    messages: [...history, systemMessage, message]
                })
            });

            const reader = response.body.getReader();
            reader.read().then(function process({ done, value }) {
                if (done) {
                    console.log('All data has been read');
                    setFetchInProgress(false);
                    fetchInProgressRef.current = false;
                    return;
                }

                const streamDecodeResult = new TextDecoder("utf-8").decode(value);
                buffer += streamDecodeResult;

                while (buffer.includes('\n')) {
                    const newlineIndex = buffer.indexOf('\n');
                    const fullMessage = buffer.slice(0, newlineIndex);

                    try {
                        let resultObj = {};
                        let content = '';

                        if (fullMessage && fullMessage.substring(6) !== '[DONE]') {
                            resultObj = JSON.parse(fullMessage.substring(6));
                            content = resultObj.choices[0].delta.content;
                            if (content) {
                                setStreamAns((prev) => prev + content);
                            }
                        }
                    } catch (error) {
                        console.error(error);
                    }
                    buffer = buffer.slice(newlineIndex + 2);
                }
                return reader.read().then(process);
            });
        }
        fetchStream();
    }, [conversationIndex, conversation]);

    useEffect(() => { // 来自GPT的流式回复
        if (!conversation) {
            return; // conversation not loaded yet
        }
        if (fetchInProgress) {
            setStreamElement(
                <div className={styles.oneRoundOfDialogue}>
                    <div className={styles.questionBox}>
                        <img src={defaultUserProfilePhoto} className={styles.userProfilePhoto} />
                        <div className={styles.questionChat}>
                            <p className={styles.names}>You</p>
                            <p className={styles.question}>{conversation.questionArray.at(-1)}</p>
                        </div>
                    </div>

                    <div className={styles.responseBox}>
                        <img src={defaultUserProfilePhoto} className={styles.userProfilePhoto} />
                        <div className={styles.responseChat}>
                            <p className={styles.names}>ChatGPT</p>
                            <ReactMarkdown className={styles.response}>{streamAns}</ReactMarkdown>
                        </div>
                    </div>
                </div>
            );
        } else if (streamAns && conversation.promptNumber > conversation.responseNumber) {
            store.dispatch(addResponse({ conversationIndex: conversationIndex, response: streamAns }));
            setStreamAns('');
            setStreamElement(<></>);
        }

    }, [fetchInProgress, streamAns, conversation]);

    useEffect(() => { // 生成聊天历史记录
        if (!conversation) {
            return; // conversation not loaded yet
        }
        let tempElements = [];
        for (let i = 0; i < conversation.responseNumber; i++) {
            tempElements.push(
                <div
                    className={styles.oneRoundOfDialogue}
                    key={`${conversationIndex}dialogue${i}`}>
                    <div className={styles.questionBox}>
                        <img src={defaultUserProfilePhoto} className={styles.userProfilePhoto} />
                        <div className={styles.questionChat}>
                            <p className={styles.names}>You</p>
                            <p className={styles.question} key={`${conversationIndex}prompt${i}`}>
                                {conversation.questionArray[i]}
                            </p>
                        </div>
                    </div>
                    <div className={styles.responseBox}>
                        <img src={defaultUserProfilePhoto} className={styles.userProfilePhoto} />
                        <div className={styles.responseChat}>
                            <p className={styles.names}>ChatGPT</p>
                            <ReactMarkdown className={styles.response} key={`${conversationIndex}response${i}`}>
                                {conversation.responseArray[i]}
                            </ReactMarkdown>
                        </div>
                    </div>
                </div>
            );
        }
        setHistoryElements(tempElements);
    }, [conversationIndex, responseNumber, conversation]);

    return (
        <div className={styles.chat}>
            <div className={styles.conversation}>
                {historyElements}
                {streamElement}
            </div>
            <ChatInput
                className={styles.input}
                isStreamFinished={!fetchInProgress}
            />
            <span className={styles.factWarn}>ChatGPT可能会出现错误，请考虑检查重要事实。</span>
        </div>
    );
}

export default Chat;