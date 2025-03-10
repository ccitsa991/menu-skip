import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import createApolloClient from "./libs/apolloClient"; // Use a function to create a new client
import "./index.css";
import App from "./App.jsx";
import "./i18n"; 
import i18n from "./i18n";

// Main App Wrapper
const Main = () => {
  const [client, setClient] = useState(createApolloClient(localStorage.getItem("locale") || "ar"));

  useEffect(() => {
 
    const handleLanguageChange = (lng) => {
      setClient(createApolloClient(lng)); 
    };

    i18n.on("languageChanged", handleLanguageChange);
    return () => {
      i18n.off("languageChanged", handleLanguageChange);
    };
  }, []);

  return (
    <StrictMode>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </BrowserRouter>
    </StrictMode>
  );
};

// Render the app
createRoot(document.getElementById("root")).render(<Main />);
