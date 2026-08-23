import React from "react";
import ReactDOM from "react-dom/client";

function App() {
  return (
    <div>
      <h1>QR Menü</h1>
      <p>Kafeler için dijital menü sistemi</p>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
