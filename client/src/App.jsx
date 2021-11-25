import React, { useState } from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { SidebarChatListContainer, ChatPanelContainer, AuthLogin, AsteroidWatcher } from './components/ComponentRouter';
import 'stream-chat-react/dist/css/index.css';
import './App.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, fab);

const cookies = new Cookies();
const apiKey = 'rxxczvms685d';
const authToken = cookies.get("token");
const client = StreamChat.getInstance(apiKey);

if(authToken) {
    client.connectUser({
        id: cookies.get('userId'),
        name: cookies.get('username'),
        fullName: cookies.get('fullName'),
        image: cookies.get('avatarURL'),
        hashedPassword: cookies.get('hashedPassword'),
        phoneNumber: cookies.get('phoneNumber'),
    }, authToken)
}


const App = () => {
    const [createChatOption, setCreateChatOption] = useState(''); //makes distinction between chat channel and direct messages
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isChat, setIsChat] = useState(true);

    const logout = () => {
        cookies.remove("token");
        cookies.remove('userId');
        cookies.remove('username');
        cookies.remove('fullName');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');
        cookies.remove('phoneNumber');

        window.location.reload();
    }

    const SideBar = ({ logout }) => (
        <div className="channel-list__sidebar">
            <div className="channel-list__sidebar__icon2">
                <div className="icon1__inner" onClick={() => window.location.reload()} id='refresh_btn'>
                    <FontAwesomeIcon icon="sync-alt" />
                </div>
            </div>
            <div className="channel-list__sidebar__icon2">
                <div className="icon1__inner" onClick={() => setIsChat(true)} id='home_btn'>
                    <FontAwesomeIcon icon="home" />
                </div>
            </div>
            <div className="channel-list__sidebar__icon2">
                <div className="icon1__inner" onClick={() => setIsChat(false)} style={{ color: 'black' }} id='asteroid_btn'>
                    <FontAwesomeIcon icon="meteor" />
                </div>
            </div>
            <div className="channel-list__sidebar__icon2" style={{ marginTop: '80px' }}>
                <div className="icon1__inner" onClick={logout} style={{ color: 'black' }} id='logout_btn'>
                    <FontAwesomeIcon icon="sign-out-alt" />
                </div>
            </div>
        </div>
    );

    if(!authToken) return <AuthLogin />

    return (
        <div className="app__wrapper">
            <SideBar logout={logout} /> 
            {isChat && (
                <Chat client={client} theme="team light">
                <SidebarChatListContainer 
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setCreateChatOption={setCreateChatOption}
                    setIsEditing={setIsEditing}
                />
                <ChatPanelContainer 
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    createChatOption={createChatOption}
                />
            </Chat>
            )}
            {!isChat && (
                <AsteroidWatcher />
            )}
        </div>
    );
}

export default App;
