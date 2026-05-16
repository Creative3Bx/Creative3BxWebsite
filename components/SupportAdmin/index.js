/***
 * SupportAdmin , noting but what you see in /support rout
 *
 * */
import React from "react";
// import {ChatEngine} from 'react-chat-engine'
import dynamic from "next/dynamic";

const ChatEngine = dynamic(
  () => import("react-chat-engine").then((module) => module.ChatEngine),
  { ssr: false }
);

const SupportAdmin = () => {
  return (
    <ChatEngine
      projectID={process.env.NEXT_PUBLIC_CE_PROJECT_ID}
      userName={process.env.NEXT_PUBLIC_CE_USER_NAME}
      userSecret={process.env.NEXT_PUBLIC_CE_USER_SECRET}
      height="calc(100vh - 20px)"
    />
  );
};

export default SupportAdmin;
