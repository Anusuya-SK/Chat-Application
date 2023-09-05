import React, { useState, useEffect } from 'react';
import './SidebarChat.css';
import { Avatar } from '@mui/material';
import { onSnapshot, collection, query, orderBy, addDoc } from 'firebase/firestore';
import db from './firebase';
import { Link } from 'react-router-dom';

function SidebarChat({ id, name, addNewChat }) {
    const[seed, setSeed] = useState("");
    const[messages, setMessages] = useState("");
    
    useEffect(() => {
        if(id) {
            const messageRef = query(collection(db, 'rooms', id, "messages"), orderBy('timestamp', 'desc'));
            onSnapshot(messageRef, (snapshot) => {
                setMessages(snapshot.docs.map((doc) => doc.data()));
            })
        }
    }, [id]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const createChat = () => {
        const roomName = prompt("Please enter name for chat room");

        if(roomName) {
            addDoc(collection(db, 'rooms'), {
                name: roomName
            }); 
        }
    }

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className='sidebarChat'>
                <Avatar src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`} />
                <div className='sidebarChat__info'>
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
        </Link>
    ) : (
        <div onClick={createChat} className='sidebarChat'>
            <h2>Add new Chat</h2>
        </div> 
    );
}

export default SidebarChat