import React, { useState, useEffect, useContext } from "react";
import { Context } from "../context";
import { useRouter } from "next/router";
import { ChatEngine,MessageFormSocial } from 'react-chat-engine'

export default function Home() {
  const { username, secret } = useContext(Context);
  const [showChat, setShowChat] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof document !== 'undefined') {
      setShowChat(true);
    }
  }, [router]);

  useEffect(() => {
    if (username === "" || secret === "") {
      router.push("/");
    }
  }, [username, secret, router]); // Add 'router' to the dependency array

  if (!showChat) return <div />;
  return (
    <div className="background">
      <div className="shadow">
        <ChatEngine
          height="calc(100vh - 212px)"
          projectID={process.env.NEXT_PUBLIC_CE_PROJECT_ID}
          userName={username}
          userSecret={secret} 
          renderNewMessageForm={() => <MessageFormSocial />}  
        />
        {/* ce-chat-title-container */}
         <style jsx global>{`
          @media (max-width: 767px) {
            .ce-chat-list-mobile-option {
              display: block !important;
            }
            .ce-chat-settings-mobile-option {
              display: block !important;
            }
            .ce-chat-title {
              margin-left: -1px !important;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
