import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, fab);

export const CloseChat = ({ setIsCreating, setIsEditing }) => (
  <div
    style={{ color: 'grey',  fontSize: 22 }}
    onClick={() => {
      if (setIsCreating) setIsCreating(false);
      if (setIsEditing) setIsEditing(false);
    }}
  >
    <FontAwesomeIcon icon="window-close" />
  </div>
);

