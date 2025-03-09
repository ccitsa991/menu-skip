import { useEffect } from "react";
import "./App.css";
import Home from "./pages/home";
import { Routes, Route } from "react-router";
import { useTranslation } from "react-i18next";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    let currentLocale = localStorage.getItem("locale");
    const locale = currentLocale === "en" ? "en" : "ar";
 
    i18n.changeLanguage(locale);
    document.querySelector("html").dir = i18n.dir();
    document.querySelector("html").lang = locale;
  }, []);

  return (
    <>
      <Routes>
        <Route path="/:merchantId" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
