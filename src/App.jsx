import CookieConsent from "react-cookie-consent";
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import StartPage from './pages/StartPage';
import GamePage from './pages/GamePage';
import LeaderboardPage from './pages/LeaderboardPage'; // Імпорт

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/leaderboard" element={<LeaderboardPage />} /> {/* Маршрут */}
      </Routes>

      {/* GDPR Банер */}
      <CookieConsent
        location="bottom"
        buttonText="Зрозуміло, погоджуюсь"
        declineButtonText="Відмовитись"
        enableDeclineButton
        cookieName="memoryCardsGDPRConsent"
        style={{ background: "#2B373B", alignItems: "center" }}
        buttonStyle={{ background: "#4e503b", color: "white", fontSize: "14px", borderRadius: "5px", padding: "8px 15px" }}
        declineButtonStyle={{ fontSize: "14px", borderRadius: "5px", padding: "8px 15px", background: "transparent", border: "1px solid white", color: "white" }}
        expires={150}
      >
        Цей веб-сайт використовує файли cookie для покращення користувацького досвіду та збору базової аналітики відповідно до GDPR.{" "}
        <span style={{ fontSize: "12px", display: "block", marginTop: "5px" }}>Продовжуючи гру, ви погоджуєтеся з нашою політикою.</span>
      </CookieConsent>
    </div>
  );
}

export default App;