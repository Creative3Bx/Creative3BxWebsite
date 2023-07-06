import React, { useEffect, useState } from "react";
// import { ChatEngineWrapper, Socket, ChatFeed } from "react-chat-engine";
import { styles } from "../styles";
import { IsTyping } from 'react-chat-engine';

import dynamic from "next/dynamic";

const ChatEngine = (props) => {
  /**
   * So react chat engine need Dynamic importing because react chat engine use quill and that powered by salesfoce , 
   * So its not supporting NxetJs nativily so we need to do dynamic import so we dont break the website
   */ 
  const ChatEngineWrapper = dynamic(() =>
    import("react-chat-engine").then((module) => module.ChatEngineWrapper)
  );
  const Socket = dynamic(() =>
    import("react-chat-engine").then((module) => module.Socket)
  );
  const ChatFeed = dynamic(() =>
    import("react-chat-engine").then((module) => module.ChatFeed)
  );
  const MessageFormSocial = dynamic(() =>
    import("react-chat-engine").then((module) => module.MessageFormSocial)
  );

  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    if (props.visible) {
      setTimeout(() => {
        setShowChat(true);
      }, 500);
    }
  }, [props.visible]);

  return (
    <div
      className="transition-5"
      style={{
        ...styles.supportWindow,
        ...{
          height: props.visible ? "530px" : "0px",
          width: props.visible ? "420px" : "0px",
          zIndex: props.visible ? "100" : "0",
        },
      }}
    >
      {showChat && (
        <ChatEngineWrapper style={styles.supportWindow}>
          <Socket
            projectID={process.env.NEXT_PUBLIC_CE_PROJECT_ID}
            userName={props.user.email}
            userSecret={props.user.email}
          />
          <IsTyping />
          
          <ChatFeed activeChat={props.chat.id}/>
          <MessageFormSocial> </MessageFormSocial>
        </ChatEngineWrapper>
      )}
    </div>
  );
};

export default ChatEngine;
