import styles from "./stylesheets/Chat.module.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown';
import { ChatInput } from "./ChatInput"
import { findConversation, systemPrompt } from "../tempBase";

const messageComposer = (message, role) => {
    return (
        {
            role,
            content: message
        }
    );
}

const historyMessageComposer = (number, conversation) => {
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


export const Chat = () => {
    const navigate = useNavigate();
    const { conversationIndex } = useParams();
    const [conversation, setConversation] = useState(null);
    const [streamRespondMessage, setStreamRespondMessage] = useState('');
    const [isStreamFinished, setIsStreamFinished] = useState(false);
    const [newQuestion, setNewQuestion] = useState('');
    const [elements, setElements] = useState([]);

    useEffect(() => {
        try {
            const foundConversation = findConversation(conversationIndex);
            setConversation(foundConversation);
        } catch (error) {
            console.error(`page ${conversationIndex} not found`);
            navigate('/');
        }
    }, []);

    useEffect(() => {
        if (!conversation) {
            return; // loading
        }

        setIsStreamFinished(false);
        setStreamRespondMessage('');
        const currentQuestion = conversation.currentQuestion;
        const message = messageComposer(currentQuestion, 'user');
        const systemMessage = messageComposer(systemPrompt, 'system');
        const history = historyMessageComposer(2, conversation);

        const fetchStream = async () => {
            const response = await fetch('http://localhost:3000/api/completion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    model: "gpt-4",
                    messages: [...history, systemMessage, message]
                })
            });

            console.log([systemMessage, ...history, message]);

            const reader = response.body.getReader();
            reader.read().then(function process({ done, value }) {
                if (done) {
                    console.log('All data has been read');
                    setIsStreamFinished(true);
                    return;
                }
                const streamDecodeResult = new TextDecoder("utf-8").decode(value);
                const jsonStrs = streamDecodeResult.split('\n').filter(Boolean);
                jsonStrs.forEach(jsonStr => {
                    if (jsonStr == 'data: [DONE]') {
                        setIsStreamFinished(true);
                        return;
                    }
                    try {
                        const resultObj = JSON.parse(jsonStr.replace(/data: /g, ''));
                        const content = resultObj.choices[0].delta.content;
                        if (content) setStreamRespondMessage(prevMessage => prevMessage + content);
                    } catch (error) {
                        console.error(error);
                    }
                });
                return reader.read().then(process);
            });
        }
        fetchStream();
    }, [conversation, newQuestion]);

    useEffect(() => {
        if (isStreamFinished) {
            conversation.newResponse = streamRespondMessage;
        }
    }, [isStreamFinished]);

    useEffect(() => {
        if (!conversation) {
            return; // loading
        }
        let tempElements = [];
        for (let i = 0; i < conversation.questionArray.length - 1; i++) {
            tempElements.push(
                <div
                    className={styles.oneRoundOfDialogue}
                    key={`${conversationIndex}dialogue${i}`}>

                    <h2 key={`${conversationIndex}prompt${i}`}>
                        {conversation.questionArray[i]}
                    </h2>

                    <ReactMarkdown key={`${conversationIndex}response${i}`}>
                        {conversation.responseArray[i]}
                    </ReactMarkdown>

                </div>
            );
        }
        setElements(tempElements);
    }, [conversation, newQuestion]);

    if (!conversation) {
        return; // loading
    }

    return (
        <div className={styles.chat}>
            <div className={styles.conversation}>

                {elements}
                <div className={styles.oneRoundOfDialogue}>
                    <h2>{conversation.currentQuestion}</h2>
                    <ReactMarkdown>{streamRespondMessage}</ReactMarkdown>
                </div>

            </div>
            <ChatInput
                behaviour='conversation'
                conversationSession={conversation}
                className={styles.input}
                setNewQuestion={setNewQuestion}
                availability={isStreamFinished}
            />
        </div>
    );
}