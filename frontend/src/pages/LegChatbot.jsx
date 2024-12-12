import React, { useEffect } from "react";
import "../styles/LegChatbot.css";

const LegChatbot = () => {
  useEffect(() => {
    // Check if the script is already loaded using a global flag
    if (!window.__DFMessengerScriptLoaded) {
      // Mark the script as loaded
      window.__DFMessengerScriptLoaded = true;

      // Dynamically add the stylesheet
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css";
      document.head.appendChild(link);

      // Load the Dialogflow Messenger script
      const script = document.createElement("script");
      script.src = "https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js";
      script.async = true;
      document.body.appendChild(script);

      // Clean up the script and stylesheet when the component is unmounted
      return () => {
        document.body.removeChild(script);
        document.head.removeChild(link);
        // Optional: Reset the global flag if you want the script to load again on reload
        // window.__DFMessengerScriptLoaded = false;
      };
    }
  }, []);

  return (
    <div className="legchatbot">
      <df-messenger
      intent="WELCOME"
      project-id="firm-lacing-444514-j8"
      agent-id="19179af1-baed-4997-a829-1463c636cb32"
      language-code="en"
      max-query-length="-1"
    >
      <df-messenger-chat-bubble chat-title="legalbot" />
    </df-messenger>
    </div>
  );
};

export default LegChatbot;