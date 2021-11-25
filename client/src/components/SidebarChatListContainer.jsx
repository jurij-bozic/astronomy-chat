import React, { useState } from 'react';
import { ChannelList, useChatContext, Avatar } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { SidebarChatList } from './ComponentRouter';


const cookies = new Cookies();

const SidebarChatListContainer = ({ setCreateChatOption, setIsCreating, setIsEditing }) => {
    //toggling the container based on the width of the screen
    const [toggleContainer, setToggleContainer] = useState(false);
    // const [isChat, setIsChat] = useState(true);

    const CompanyHeader = () => (
        <div className="channel-list__header">
            <p className="channel-list__header__text">Astronomy Chat</p>
        </div>
    )

    const customChannelTeamFilter = (channels) => {
        return channels.filter((channel) => channel.type === 'team');
    }

    const customChannelMessagingFilter = (channels) => {
        return channels.filter((channel) => channel.type === 'messaging');
    }

    const ChannelListContent = ({ isCreating, setIsCreating, setCreateChatOption, setIsEditing, setToggleContainer }) => {
        const { client } = useChatContext();

        //filtering condition that will return all channels that include the logged-in user (me)
        const filters = { members: { $in: [client.userID] } };

        return (
            <>
                {/* <SideBar logout={logout} /> */}
                <div className="channel-list__list__wrapper">
                    <CompanyHeader />
                    <div style={{ 
                            padding: 20, 
                            background: 'rgba(0, 0, 0, 0.2)',
                            borderTopRightRadius: '8px',
                            borderBottomRightRadius: '8px',
                            fontWeight: 'bold',
                            color: 'white'
                        }}>
                        <p className="team-channel-list__header__title">Logged-in User</p>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                        <Avatar image={client.user.image} name={client.user.fullName} size={45} />
                        {client.user.fullName}
                        </div>
                    </div>
                    <ChannelList 
                        filters={filters}
                        channelRenderFilterFn={customChannelTeamFilter}
                        List={(listProps) => (
                            <SidebarChatList 
                                {...listProps}
                                type="team"
                                isCreating={isCreating}
                                setIsCreating={setIsCreating}
                                setCreateChatOption={setCreateChatOption} 
                                setIsEditing={setIsEditing}
                                setToggleContainer={setToggleContainer}
                            />
                        )}
                    />
                    <ChannelList 
                        filters={filters}
                        channelRenderFilterFn={customChannelMessagingFilter}
                        List={(listProps) => (
                            <SidebarChatList 
                                {...listProps}
                                type="messaging"
                                isCreating={isCreating}
                                setIsCreating={setIsCreating}
                                setCreateChatOption={setCreateChatOption} 
                                setIsEditing={setIsEditing}
                                setToggleContainer={setToggleContainer}
                            />
                        )}
                    />
                </div>
            </>
        );
    }


    return (
        <>
            {/* <SideBar logout={logout} /> */}
            <div className="channel-list__container">
            <ChannelListContent 
                setIsCreating={setIsCreating} 
                setCreateChatOption={setCreateChatOption} 
                setIsEditing={setIsEditing} 
            />
            </div>

            <div className="channel-list__container-responsive"
                style={{ left: toggleContainer ? "0%" : "-89%", backgroundColor: "#005fff"}}
            >
                <div className="channel-list__container-toggle" onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}> {/*resets state to previous boolean  */}
                </div>
                <ChannelListContent 
                    setIsCreating={setIsCreating} 
                    setCreateChatOption={setCreateChatOption} 
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer}
                />
            </div>
        </>
    )

}

export default SidebarChatListContainer;
