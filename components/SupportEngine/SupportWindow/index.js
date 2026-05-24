import React, { useState } from "react";
import { styles } from "../styles";
import EmailForm from "./EmailForm";

const SupportWindow = (props) => {
  const [hoveredClose, setHoveredClose] = useState(false);

  return (
    <div
      className="transition-5"
      style={{
        ...styles.supportWindow,
        ...{ opacity: props.visible ? "1" : "0" },
        ...{ zIndex: props.visible ? "1" : "-1" },
      }}
    >
      {/* Window Close Button */}
      <button
        onMouseEnter={() => setHoveredClose(true)}
        onMouseLeave={() => setHoveredClose(false)}
        onClick={() => props.onClose && props.onClose()}
        className="ce-close-window-button"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          top: "12px",
          right: "12px",
          zIndex: "101",
          background: hoveredClose ? "#be232f" : "#7f1d1d",
          borderRadius: "50%",
          width: "32px",
          height: "32px",
          border: "none",
          cursor: "pointer",
          transition: "background 0.2s ease",
        }}
      >
        <span className="text-lg text-white">×</span>
      </button>

      <EmailForm
        visible={props.visible}
        onComplete={() => props.onClose && props.onClose()}
        avatar={props.avatar}
      />
    </div>
  );
};

export default SupportWindow;
