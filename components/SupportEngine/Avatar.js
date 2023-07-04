import React, { useMemo, useState, useEffect } from "react";
import { styles } from "./styles";
import ChatNotificationIcon from "./SupportWindow/ChatNotificationIcon";
import Image from "next/image";

const Avatar = (props) => {
  const [hovered, setHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false); // to show and hide the chat messsage 
  const [isVisibleXImg, setisVisibleXImg] = useState(false); // to show and hide the chat messsage
  const [closeButtonHovered, setCloseButtonHovered] = useState(false);
  const selfImages = useMemo(
    () => [
      "/images/chatEngineImgs/Rami.jpg",
      "/images/chatEngineImgs/self2Jassica.png",
      "/images/chatEngineImgs/self3Kai.png",
      "/images/chatEngineImgs/self4Sarah.png",
    ],
    []
  );

  const [randomImage, setRandomImage] = useState("");
  // Move the random image selection into a useEffect hook so that it only runs on the client side
  useEffect(() => {
    setRandomImage(selfImages[Math.floor(Math.random() * selfImages.length)]);
  }, [selfImages]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 30000); // Show message after 30 seconds

    return () => clearTimeout(timer); // This will clear the timeout if the component unmounts
  }, []);

  const handleClick = () => {
    if (isVisibleXImg) {
      // If the chat window is currently closed
      props.onClick && props.onClick();
      setRandomImage(selfImages[Math.floor(Math.random() * selfImages.length)]);
      setisVisibleXImg(false);
      setIsVisible(true);
    } else {
      // If the chat window is currently open
      props.onClick && props.onClick();
      setisVisibleXImg(true);
      setIsVisible(false);
      setRandomImage("/images/closeButton1.png");
    }
  };

  return (
    <div style={props.style} onClick={handleClick}>
      <ChatNotificationIcon visible={props.visibleNotification} />

      {isVisible && (
        <div className="transition-5" style={styles.avatarNotifyMessage}>
          <button
            onMouseEnter={() => setCloseButtonHovered(true)}
            onMouseLeave={() => setCloseButtonHovered(false)}
            onClick={(e) => {
              e.stopPropagation(); // This will prevent the click event from bubbling up to the parent div
              setIsVisible(false); // This button will hide the message when clicked
            }}
            style={{
              position: "absolute",
              left: "-25px",
              top: "0",
              background: closeButtonHovered ? "#be232f" : "#7f1d1d",
              borderRadius: "50%",
              padding: "10px",
              border: "none",
            }}
          >
            <span className="text-lg text-white">🗙</span>
          </button>

          <span className="rounded-lg text-sm shadow-md">
            Hello! Need help? Drop us a message and we&apos;ll get back to you
            as soon as possible. We&apos;re always here for you 😃!!!
          </span>
        </div>
      )}
      <div
        className="transition-3"
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
            src={randomImage}
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
