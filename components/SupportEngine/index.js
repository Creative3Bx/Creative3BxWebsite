/***
 * SupportEngine , noting but what you see in home page as Live Chat box component
 *
 * */
import React, { useRef, useEffect, useState } from "react";
import Avatar, { getRandomFace } from "./Avatar";
import SupportWindow from "./SupportWindow";

const SupportEngine = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [visibleNotification, setVisibleNotification] = useState(true);
  const [agentImage, setAgentImage] = useState(null); // Start with null

  useEffect(() => {
    setAgentImage(getRandomFace()); // Set random image only on the client
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setVisible(false);
        setVisibleNotification(true);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const handleShowSuportWindow = () => {
    if (visible) {
      setVisible(false);
      setVisibleNotification(true);
      // Pick a new face for the next session when closing
      setAgentImage(getRandomFace());
    } else {
      setVisible(true);
      setVisibleNotification(false);
    }
  };

  return (
    <div ref={ref}>
      <SupportWindow
        visible={visible}
        onClose={handleShowSuportWindow}
        avatar={agentImage}
      />
      <Avatar
        onClick={handleShowSuportWindow}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
        }}
        visibleNotification={visibleNotification}
        isWindowVisible={visible}
        avatar={agentImage}
      />
    </div>
  );
};

export default SupportEngine;
