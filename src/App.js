import { useState } from "react";
import IconSearch from "./components/iconsearch";

function App() {
  const [username, setUsername] = useState("");
  return (
    <div className="github-app">
      <nav className="nav"></nav>
      <main className="main-container">
        <div className="search-container">
          <IconSearch />
          <input
            type="text"
            placeholder="@username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <button className="btn">Search</button>
        </div>
        <section className="search-content"></section>
      </main>
    </div>
  );
}

export default App;
