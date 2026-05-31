import React, { useEffect, useState, useRef } from "react";
// import { ChatEngineWrapper, Socket, ChatFeed } from "react-chat-engine";
import { styles } from "../styles";
import { IsTyping } from "react-chat-engine";

import dynamic from "next/dynamic";

const ChatEngineWrapper = dynamic(
  () => import("react-chat-engine").then((module) => module.ChatEngineWrapper),
  { ssr: false }
);
const Socket = dynamic(
  () => import("react-chat-engine").then((module) => module.Socket),
  { ssr: false }
);
const ChatFeed = dynamic(
  () => import("react-chat-engine").then((module) => module.ChatFeed),
  { ssr: false }
);
const NewMessageForm = dynamic(
  () => import("react-chat-engine").then((module) => module.NewMessageForm),
  { ssr: false }
);

const ChatEngine = (props) => {
  const [showChat, setShowChat] = useState(false);

  function saveSelection(containerEl) {
    let range = window.getSelection().getRangeAt(0);
    let preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(containerEl);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    let start = preSelectionRange.toString().length;

    return {
      start: start,
      end: start + range.toString().length,
    };
  }

  function restoreSelection(containerEl, savedSel) {
    let charIndex = 0,
      range = document.createRange();
    range.setStart(containerEl, 0);
    range.collapse(true);
    let nodeStack = [containerEl],
      node,
      foundStart = false,
      stop = false;

    while (!stop && (node = nodeStack.pop())) {
      if (node.nodeType === 3) {
        let nextCharIndex = charIndex + node.length;
        if (
          !foundStart &&
          savedSel.start >= charIndex &&
          savedSel.start <= nextCharIndex
        ) {
          range.setStart(node, savedSel.start - charIndex);
          foundStart = true;
        }
        if (
          foundStart &&
          savedSel.end >= charIndex &&
          savedSel.end <= nextCharIndex
        ) {
          range.setEnd(node, savedSel.end - charIndex);
          stop = true;
        }
        charIndex = nextCharIndex;
      } else {
        let i = node.childNodes.length;
        while (i--) {
          nodeStack.push(node.childNodes[i]);
        }
      }
    }

    let sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
  useEffect(() => {
    const handleChaningSendBtnBGColor = () => {
      const buttonElement = document.getElementById("ce-send-message-button");
      const spanBtn = document.getElementsByClassName("anticon-arrow-up")[0];
      const pElement = document.querySelector(".ql-editor p");
      if (buttonElement && pElement) {
        // If there is no text inside the pElement, change the button color back to white
        if (pElement.textContent.trim() === "") {
          buttonElement.style.backgroundColor = "#7f1d1d";
          spanBtn.style.color = "#edf2ec";
          spanBtn.style.fontWeight = "bold";
        } else {
          // If there is text inside the pElement, change the button color to '#fde9ef'
          buttonElement.style.setProperty(
            "background-color",
            "#7f1d1d",
            "important"
          );
          spanBtn.style.fontWeight = "bold";
        }
      }
    };

    const handleSpaceBarPress = (event) => {
      if (event.key === " ") {
        const pElement = document.querySelector(".ql-editor p");

        if (pElement) {
          const savedSel = saveSelection(pElement);
          pElement.textContent += " ";
          restoreSelection(pElement, savedSel);
        }
      }
    };

    // Only listen for global inputs if the chat is actually active and visible
    if (props.visible && showChat) {
      window.addEventListener("input", handleSpaceBarPress);
      window.addEventListener("keydown", handleSpaceBarPress);
      window.addEventListener("keydown", handleChaningSendBtnBGColor);
    }

    // Cleanup: remove event listener when the component unmounts
    return () => {
      window.removeEventListener("input", handleSpaceBarPress);
      window.removeEventListener("keydown", handleSpaceBarPress);
      window.removeEventListener("keydown", handleChaningSendBtnBGColor);
    };
  }, [props.visible, showChat]);
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
        height: props.visible ? "100%" : "0px",
        width: "100%",
        backgroundColor: "white",
      }}
    >
      {showChat && (
        <ChatEngineWrapper>
          <Socket
            projectID={process.env.NEXT_PUBLIC_CE_PROJECT_ID}
            userName={props.user.email}
            userSecret={props.user.email}
          />
          <ChatFeed
            activeChat={props.chat.id}
            renderNewMessageForm={() => <NewMessageForm />}
          />
        </ChatEngineWrapper>
      )}
    </div>
  );
};

export default ChatEngine;
