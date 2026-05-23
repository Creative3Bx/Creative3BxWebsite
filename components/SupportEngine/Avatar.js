import React, { useMemo, useState, useEffect } from "react";
import { styles } from "./styles";
import ChatNotificationIcon from "./SupportWindow/ChatNotificationIcon";
import Image from "next/image";
import {
  FaLinkedin,
  FaWhatsapp,
  FaFacebookMessenger,
  FaComments,
} from "react-icons/fa";

const SELF_IMAGES = [
  "/images/chatEngineImgs/Rami.jpg",
  "/images/chatEngineImgs/self2Jassica.png",
  "/images/chatEngineImgs/self3Kai.png",
  "/images/chatEngineImgs/self4Sarah.png",
];

export const getRandomFace = () =>
  SELF_IMAGES[Math.floor(Math.random() * SELF_IMAGES.length)];

const Avatar = (props) => {
  const [hovered, setHovered] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [showSocialMenu, setShowSocialMenu] = useState(false);
  const [closeButtonHovered, setCloseButtonHovered] = useState(false);

  // Initialize with a random face as fallback
  const [randomImage, setRandomImage] = useState(getRandomFace());

  useEffect(() => {
    const timer = setTimeout(() => {
      // Only trigger notification if the user hasn't opened the menu or window yet
      setShowNotification((current) => {
        return !(showSocialMenu || props.isWindowVisible) ? true : false;
      });
    }, 30000);

    return () => clearTimeout(timer); // This will clear the timeout if the component unmounts
  }, [showSocialMenu, props.isWindowVisible]);

  const handleClick = () => {
    // Only allow interaction if an onClick handler is passed (prevents the header image in EmailForm from being clickable)
    if (!props.onClick) return;

    if (showSocialMenu) {
      // Closing: Close chat window if open and reset avatar
      if (props.isWindowVisible) props.onClick?.();
      setShowSocialMenu(false);
      setShowNotification(true);
    } else {
      // Opening: Show social menu, hide notification, show close icon
      setShowSocialMenu(true);
      setShowNotification(false);
    }
  };

  return (
    <div style={props.style}>
      <ChatNotificationIcon visible={props.visibleNotification} />

      {/* Floating Action Menu Icons */}
      <div
        style={{
          position: "absolute",
          bottom: "100%",
          right: "0",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          paddingBottom: "20px",
          transition: "opacity 0.3s ease-in-out",
          opacity: showSocialMenu && props.onClick ? 1 : 0,
          pointerEvents: showSocialMenu && props.onClick ? "auto" : "none",
        }}
      >
        {/* WhatsApp */}
        <a
          href="https://wa.me/61494743131"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...styles.subActionButton,
            backgroundColor: "#25D366",
            transform:
              (showSocialMenu
                ? "translateY(0) scale(1) rotate(0deg)"
                : "translateY(40px) scale(0) rotate(15deg)") +
              (hovered === "whatsapp" ? " scale(1.1) translateY(-2px)" : ""),
            transitionDelay: showSocialMenu ? "0.3s" : "0.0s",
            opacity: showSocialMenu ? 1 : 0,
          }}
          title="Message us on WhatsApp"
        >
          <FaWhatsapp size={25} color="white" />
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/company/creative3bx"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...styles.subActionButton,
            backgroundColor: "#0077b5",
            transform:
              (showSocialMenu
                ? "translateY(0) scale(1) rotate(0deg)"
                : "translateY(30px) scale(0) rotate(-15deg)") +
              (hovered === "linkedin" ? " scale(1.1) translateY(-2px)" : ""),
            transitionDelay: showSocialMenu ? "0.2s" : "0.1s",
            opacity: showSocialMenu ? 1 : 0,
          }}
          onMouseEnter={() => setHovered("linkedin")}
          onMouseLeave={() => setHovered(false)}
          title="Message us on LinkedIn"
        >
          <FaLinkedin size={25} color="white" />
        </a>

        {/* Messenger */}
        <a
          href="https://m.me/Creative3Bx"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...styles.subActionButton,
            backgroundColor: "#0084ff",
            transform:
              (showSocialMenu
                ? "translateY(0) scale(1) rotate(0deg)"
                : "translateY(20px) scale(0) rotate(10deg)") +
              (hovered === "messenger" ? " scale(1.1) translateY(-2px)" : ""),
            transitionDelay: showSocialMenu ? "0.1s" : "0.2s",
            opacity: showSocialMenu ? 1 : 0,
          }}
          onMouseEnter={() => setHovered("messenger")}
          onMouseLeave={() => setHovered(false)}
          title="Message us on Messenger"
        >
          <FaFacebookMessenger size={25} color="white" />
        </a>

        {/* Internal Chat Engine Toggle */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            props.onClick && props.onClick();
          }}
          style={{
            ...styles.subActionButton,
            backgroundColor: "#7f1d1d",
            transform:
              (showSocialMenu
                ? "translateY(0) scale(1) rotate(0deg)"
                : "translateY(10px) scale(0) rotate(-10deg)") +
              (hovered === "chat" ? " scale(1.1) translateY(-2px)" : ""),
            transitionDelay: showSocialMenu ? "0.0s" : "0.3s",
            opacity: showSocialMenu ? 1 : 0,
          }}
          onMouseEnter={() => setHovered("chat")}
          onMouseLeave={() => setHovered(false)}
          title="Live Chat Support"
        >
          <FaComments size={25} color="white" />
        </button>
      </div>

      {showNotification && !showSocialMenu && !props.isWindowVisible && (
        <div className="transition-5" style={styles.avatarNotifyMessage}>
          <button
            onMouseEnter={() => setCloseButtonHovered(true)}
            onMouseLeave={() => setCloseButtonHovered(false)}
            onClick={(e) => {
              e.stopPropagation(); // This will prevent the click event from bubbling up to the parent div
              setShowNotification(false); // This button will hide the message when clicked
            }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              left: "-25px",
              top: "0",
              background: closeButtonHovered ? "#be232f" : "#7f1d1d",
              borderRadius: "50%",
              width: "32px",
              height: "32px",
              border: "none",
            }}
          >
            <span className="text-lg text-white">🗙</span>
          </button>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
            }}
          >
            <div
              style={{
                fontWeight: "700",
                fontSize: "15px",
                marginBottom: "4px",
                color: "#7f1d1d",
              }}
            >
              Creative3Bx Support
            </div>
            <div
              style={{ fontSize: "14px", color: "#4b5563", lineHeight: "1.4" }}
            >
              Hi there! 👋 Need some help? Drop us a message and we&apos;ll get
              back to you as soon as possible.
            </div>
          </div>
          {/* Speech Bubble Arrow (Tail) */}
          <div
            style={{
              position: "absolute",
              bottom: "-10px",
              right: "25px",
              width: "0",
              height: "0",
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderTop: "10px solid white",
            }}
          />
        </div>
      )}
      <div
        className="transition-3"
        onClick={handleClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          ...styles.chatWithMeButton,
          ...{ border: hovered ? "2px solid #eeb42b" : "3px solid #7f1d1d" },
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <Image
            style={styles.chatWithMeButtonImage}
            src={
              showSocialMenu
                ? "/images/closeButton1.png"
                : props.avatar || randomImage
            }
            alt="Avatar Image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Avatar;
