import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FtePlayer } from "./Fte";

const rootEl = document.getElementById("root");

if (rootEl && !rootEl.innerHTML) {
  const root = createRoot(rootEl);
  root.render(
    <StrictMode>
      <FtePlayer />
    </StrictMode>,
  );
}
