import io from "socket.io-client";
import useSWRSubscription from "swr/subscription";
import React from "react";

const baseUrl = 'http://localhost:4000/'

export const App = ()=> {
    const subscribe = (key,{next}) => {
        const socket = io(key, { query: 'userId=2023' });

        socket.on('message:get-all', (event)=>next(null,event.message));

        return () => socket.close()
    };

    const {data:xxx} = useSWRSubscription(baseUrl, subscribe);


    const handleSendMessage = () => {
        const socket = io(baseUrl);
        socket.emit('message:create');
    };

    return (
        <div className={'client'}>
            <h1>Client</h1>
            <button onClick={handleSendMessage}>Increment</button>
            <p>{xxx}</p>
        </div>
    );
}

export default App