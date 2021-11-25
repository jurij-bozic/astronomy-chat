import React from 'react';
import { Channel, MessageTeam } from 'stream-chat-react';
import { ChatPanel, CreateChat } from './ComponentRouter';

const ChatPanelContainer = ({ isCreating, setIsCreating, setIsEditing, createChatOption }) => {
    if(isCreating) {
        return (
            <div className="channel__container">
                <CreateChat createChatOption={createChatOption} setIsCreating={setIsCreating} />
            </div>
        )
    }

    const EmptyState = () => (
        <div className="channel-empty__container">
            <p className="channel-empty__first">Here, your chat history starts.</p>
            {/* <p className="channel-empty__second">Send messages, attachments, links, emojis, and more!</p> */}
        </div>
    )

    return (
        <div className=" channel__container">
            <Channel
                EmptyStateIndicator={EmptyState}
                Message={(messageProps, i) => <MessageTeam key={i} {...messageProps} />}
            >
                <ChatPanel setIsEditing={setIsEditing} />
            </Channel>
        </div>
    );
}

export default ChatPanelContainer;
