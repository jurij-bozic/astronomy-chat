import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, fab);

export const InviteUserIcon = () => (
  <div
    style={{ color: 'grey', fontSize: '25px' }}
  >
    <FontAwesomeIcon icon="check-circle" />
  </div>
);
