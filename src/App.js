import React, { useState } from "react";
import "./styles.css";

import RssRead from "./components/RssRead";
import RssList from "./components/RssList";

export default function App() {
  const [url, setUrl] = useState("https://venganzasdelpasado.com.ar/posts.rss");
  return (
    <div className="App">
      <div
        style={{
          width: 400,
          height: 600,
          position: "relative"
        }}
      >
        <RssList reader={<RssRead url={url} />} />
      </div>
    </div>
  );
}
