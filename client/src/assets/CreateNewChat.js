import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, fab);

export const CreateNewChat = ({ setCreateChatOption, setIsCreating, setIsEditing, setToggleContainer, type }) => (
  <div
    style={{ color: 'grey', fontSize: '20px' }}
    onClick={() => {
      setCreateChatOption(type);
      setIsCreating((prevState) => !prevState);
      setIsEditing(false);
      if(setToggleContainer) setToggleContainer((prevState) => !prevState) 
    }}
  >
    <FontAwesomeIcon icon="plus-square" />
  </div>
);
