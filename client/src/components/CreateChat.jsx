import React, { useState } from 'react';
import { useChatContext } from 'stream-chat-react';
import { UserList } from './ComponentRouter';
import { CloseChat } from '../assets/assetRouter';

const ChannelNameInput = ({ channelName = '', setChannelName }) => {
    const inputChangeHandler = (event) => {
        event.preventDefault();

        setChannelName(event.target.value.split(' ').join('-'));
    }

    return (
        <div className="channel-name-input__wrapper">
            <p>Name</p>
            <input value={channelName} onChange={inputChangeHandler} placeholder="specify channel name" />
            <p>Add Members</p>
        </div>
    )
}

const CreateChat = ({ createChatOption, setIsCreating }) => {
    const { client, setActiveChannel } = useChatContext();
    const [selectedUsers, setSelectedUsers] = useState([client.userID || ''])
    const [channelName, setChannelName] = useState('');

    const createChannel = async (e) => {
        e.preventDefault();

        try {
            const newChannel = await client.channel(createChatOption, channelName, {
                name: channelName, 
                members: selectedUsers
            });

            //after the channel is created, the channel is watched for new incoming messages
            await newChannel.watch();

            setChannelName('');                 //reseting channel name input
            setIsCreating(false);               //reseting the isCreating state
            setSelectedUsers([client.userID]);  //reset the selected users so that they will contain only me (the user), until the invited users join in
            setActiveChannel(newChannel);       //the new channel is set as the active one
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="create-channel__container">
            <div className="create-channel__header">
                <p>{createChatOption === 'team' ? 'Create a New Chat' : 'Send a Message'}</p>
                <CloseChat setIsCreating={setIsCreating} />
            </div>
            {createChatOption === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/>}
            <UserList setSelectedUsers={setSelectedUsers} />
            <div className="create-channel__button-wrapper" onClick={createChannel}>
                <p>{createChatOption === 'team' ? 'Create Chat' : 'Create Message Group'}</p>
            </div>
        </div>
    )
}

export default CreateChat;
