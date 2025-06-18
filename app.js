import React from "react";
import { createRoot } from "react-dom/client";
import { SourceRenderer } from "./components/SourceRenderer";

const App = () => {
  return (
    <div style={{ padding: "2rem", background: "#fff", marginTop: "2rem" }}>
      <h2>🧪 Live Sefaria Test</h2>
      <p>Now showing: <strong>Vayikra 1:1</strong></p>
      <SourceRenderer refText="Vayikra 1:1" />
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);
