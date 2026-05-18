/***
 * SupportEngine , noting but what you see in home page as Live Chat box component
 *
 * */
import React, { useRef, useEffect, useState } from "react";
import Avatar from "./Avatar";
import SupportWindow from "./SupportWindow";
const SupportEngine = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [visibleNotification, setVisibleNotification] = useState(true);
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
    } else {
      setVisible(true);
      setVisibleNotification(false);
    }
  };
  return (
    <div ref={ref}>
      <SupportWindow visible={visible} onClose={() => setVisible(false)} />
      <Avatar
        onClick={handleShowSuportWindow}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
        }}
        visibleNotification={visibleNotification}
        isWindowVisible={visible}
      />
    </div>
  );
};

export default SupportEngine;
