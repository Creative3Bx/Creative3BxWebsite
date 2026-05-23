export const styles = {
  chatWithMeButton: {
    cursor: "pointer",
    boxShadow: "0px 0px 16px 6px rgba(0, 0, 0, 0.33)",
    // Border
    borderRadius: "50%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "84px",
    // Size
    width: "84px",
    height: "84px",
  },
  chatWithMeButtonImage: {
    cursor: "pointer",
    boxShadow: "0px 0px 16px 6px rgba(0, 0, 0, 0.33)",
    // Border
    borderRadius: "50%",
    // Background
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "84px",
    width: "100%",
    height: "100%",
  },
  avatarHello: {
    position: "absolute",
    left: "calc(-100% - 44px - 28px)",
    top: "calc(50% - 24px)",
    // Layering
    zIndex: "10000",
    boxShadow: "0px 0px 16px 6px rgba(0, 0, 0, 0.33)",
    // Border
    padding: "12px 12px 12px 16px",
    borderRadius: "24px",
    // Color
    backgroundColor: "#f9f0ff",
    color: "black",
  },
  avatarNotifyMessage: {
    // Position
    position: "absolute",
    display: "inline-block",
    borderBottom: "1px dotted black",
    top: "-150px", // position it above the circle
    left: "calc(-100% - 44px - 28px)", // position it to the left of the circle
    right: "30px",
    // Layering
    zIndex: "10000",
    boxShadow: "0px 0px 16px 6px rgba(0, 0, 0, 0.33)",
    // Border
    padding: "12px 12px 12px 16px",
    borderRadius: "24px",
    // Color
    backgroundColor: "#dcdee2",
    color: "black",
  },
  tooltiptext: {},
  supportWindow: {
    position: "fixed",
    bottom: "116px",
    right: "24px",
    width: "420px",
    height: "530px",
    maxWidth: "calc(100% - 48px)",
    maxHeight: "calc(100% - 48px)",
    backgroundColor: "white",
    borderRadius: "12px",
    border: "2px solid #7f1d1d",
    overflow: "hidden",
    boxShadow: "0px 0px 16px 6px rgba(0, 0, 0, 0.33)",
  },

  chatContent: {
    flex: "1",
    overflow: "auto",
    padding: "20px",
    height: "100%", // Adjust the height as needed
    overflowY: "scroll",
    paddingRight: "15px",
  },
  chatFooter: {
    flex: "none",
    padding: "10px",
    backgroundColor: "#f5f5f5",
  },
  emailFormWindow: {
    width: "100%",
    overflow: "hidden",
    transition: "all 0.5s ease",
    WebkitTransition: "all 0.5s ease",
    MozTransition: "all 0.5s ease",
  },
  stripe: {
    position: "relative",
    top: "-45px",
    width: "100%",
    height: "308px",
    backgroundColor: "#7f1d1d",
    transform: "skewY(-12deg)",
  },
  topText: {
    position: "relative",
    width: "100%",
    top: "14%",
    color: "white",
    fontSize: "24px",
    fontWeight: "600",
  },
  emailInput: {
    width: "66%",
    textAlign: "center",
    outline: "none",
    padding: "12px",
    borderRadius: "12px",
    border: "2px solid #7f1d1d",
    backgroundColor: "#181818",
    color: "#fff",
  },
  bottomText: {
    position: "absolute",
    width: "100%",
    top: "112%",
    color: "#7f1d1d",
    fontSize: "18px",
    fontWeight: "600",
  },
  submitButton: {
    position: "absolute",
    bottom: "24px",
    width: "190px",
    height: "40px",
    color: "black",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    top: "140%",
    left: "28%",
  },

  loadingDiv: {
    position: "absolute",
    height: "100%",
    width: "100%",
    textAlign: "center",
    backgroundColor: "white",
  },
  loadingIcon: {
    color: "#7f1d1d",
    position: "absolute",
    top: "calc(50% - 51px)",
    left: "calc(50% - 51px)",
    fontWeight: "600",
  },
  chatEngineWindow: {
    width: "100%",
    height: "300px",
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  ChatNotificationImage: {
    cursor: "pointer",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "84px",
    // Size
    width: "40px",
    height: "40px",
    // Position
    position: "absolute",
  },
  closeWindowButton: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    color: "#eeb42b",
    fontSize: "18px",
    position: "absolute",
    // top: '230px',
    // right: '-80px',
    // zIndex: 1,
    // minWidth: '150px',
    // // Media query for mobile devices
    // '@media (max-width: 780px)': {
    //   top: '20px', // Adjust the top position for mobile devices
    //   right: '100px', // Adjust the right position for mobile devices
    //   minWidth: 'unset', // Remove the minimum width for mobile devices
    // },
  },

  errorEmailForm: {
    color: "red",
    fontWeight: "bold",
  },
  subActionButton: {
    width: "56px",
    height: "56px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.25)",
    transition:
      "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease, background-color 0.2s ease",
    border: "none",
    textDecoration: "none",
    marginLeft: "auto",
    "&:hover": {
      transform: "scale(1.1) translateY(-2px)",
    },
  },
};
