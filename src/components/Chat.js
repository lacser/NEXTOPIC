import styles from "./stylesheets/Chat.module.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ChatInput } from "./ChatInput"
import { findConversation } from "../tempBase";
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

const messageComposer = (message) => {
    return (
        {
            role: 'user',
            content: message
        }
    );
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
        const currentQuestion = conversation.currentQuestion;
        const message = messageComposer(currentQuestion);
        const fetchStream = async () => {
            const stream = await openai.chat.completions.create({
                model: "gpt-3.5-turbo",
                messages: [message],
                stream: true,
            });
            setStreamRespondMessage('');
            for await (const part of stream) {
                if (part.choices[0].delta.content) {
                    setStreamRespondMessage(prevMessage => prevMessage + part.choices[0].delta.content);
                }
            }
            setIsStreamFinished(true);
            console.log('server respond finished')
        }
        fetchStream();
    }, [conversation, newQuestion]);

    useEffect(() => {
        if (isStreamFinished) {
            conversation.newResponse = streamRespondMessage;
            setIsStreamFinished(false);
            console.log(streamRespondMessage);
            console.log(conversation);
        }
    }, [isStreamFinished]);

    useEffect(() => {
        if (!conversation) {
            return; // loading
        }
        let tempElements = [];
        for (let i = 0; i < conversation.questionArray.length - 1; i++) {
            tempElements.push(
                <>
                    <h2 key={`${conversationIndex}prompt${i}`}>
                        {conversation.questionArray[i]}
                    </h2>

                    <h2 key={`${conversationIndex}response${i}`}>
                        {conversation.responseArray[i]}
                    </h2>
                </>
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
                <h2>{conversation.currentQuestion}</h2>
                <h2>{streamRespondMessage}</h2>

            </div>
            <ChatInput
                behaviour='conversation'
                conversationSession={conversation}
                className={styles.input}
                setNewQuestion={setNewQuestion}
            />
        </div>
    );
}