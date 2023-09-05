import React, { useState, useEffect } from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@mui/material';
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined } from '@mui/icons-material';
import { useParams } from 'react-router';
import { onSnapshot, doc, collection, query, orderBy, addDoc } from 'firebase/firestore';
import db from './firebase';
import { serverStamp } from './firebase';
import { useStateValue } from './StateProvider';

function Chat() {
    const[input, setInput] = useState("");
    const[seed, setSeed] = useState("");
    const { roomId } = useParams();
    const[roomName, setRoomName] = useState("");
    const[messages, setMessages] = useState([]);
    const[{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if(roomId) {
            // Getting a particular document ID
            const roomRef = doc(db, 'rooms', roomId);
            onSnapshot(roomRef, (snapshot) => {
                setRoomName(snapshot.data().name);
            });

            const messageRef = query(collection(db, 'rooms', roomId, "messages"), orderBy('timestamp', 'asc'));
            onSnapshot(messageRef, (snapshot) => {
                setMessages(snapshot.docs.map((doc) => doc.data()));
            })
        }
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);   

    const sendMessage = (e) => {
        e.preventDefault();
        //console.log("you typed >>", input);

        addDoc(collection(db, 'rooms', roomId, "messages"), {
            message: input,
            name: user.displayName,
            timestamp: serverStamp.now()
        });
        setInput("");
    }

    return (
        <div className='chat'>
            <div className='chat__header'>
                <Avatar src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`} />

                <div className='chat__headerInfo'>
                    <h3>{roomName}</h3>
                    <p>
                        Last seen {""}
                        {new Date(
                            messages[messages.length - 1]?.timestamp?.toDate()
                        ).toUTCString()}
                    </p>
                </div> 

                <div className='chat__headerRight'>
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton> 
                </div>
            </div>

            <div className='chat__body'>
                {messages.map((message) => (
                    <p className={`chat__message ${message.name === user.displayName && "chat__receiver"}`}>
                        <span className='chat__name'>{message.name}</span>
                        {message.message}
                        <span className='chat__timestamp'>
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}
            </div>
            
            <div className='chat__footer'>
                <IconButton>
                    <InsertEmoticon />
                </IconButton>
                <form>
                    <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message" 
                    type='text' />
                    <button onClick={sendMessage}>Send a message</button>
                </form>
                <IconButton>
                    <Mic />
                </IconButton>
            </div>
        </div>
    )
}

export default Chat