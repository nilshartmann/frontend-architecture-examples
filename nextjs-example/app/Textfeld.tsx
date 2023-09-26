"use client";

import { useState } from "react";

export default function TextFeld() {
  const [state, setState] = useState("");

  return (
    <div>
      <input
        type={"text"}
        value={state}
        onChange={(e) => setState(e.target.value)}
      />
      {state}
    </div>
  );
}
