import React from "react";
import "./styles.css";

import RssRead from "./components/RssRead";
import RssList from "./components/RssList";

export default function App() {
  return (
    <div className="App">
      <RssList
        reader={<RssRead url="https://venganzasdelpasado.com.ar/posts.rss" />}
      />
    </div>
  );
}
