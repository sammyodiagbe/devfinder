import { useState } from "react";
import IconSearch from "./components/iconsearch";
import IconMoon from "./components/iconmoon";
import { githubApiUrl } from "./helper";

function App() {
  const [username, setUsername] = useState("");

  const searchUser = async () => {
    if (username.trim() === "") return;
    try {
      const response = await fetch(githubApiUrl(username));
      const githubUser = await response.json();

      console.log(githubUser);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="github-app">
      <nav className="nav">
        <h2>Devfinder</h2>

        <div className="toggle-theme">
          <span>Dark</span>
          <IconMoon />
        </div>
      </nav>
      <main className="main-container">
        <div className="search-container">
          <IconSearch />
          <input
            type="text"
            placeholder="@username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <button className="btn" onClick={searchUser}>
            Search
          </button>
        </div>
        <section className="search-content">
          <aside className="user-container"></aside>
          <aside className="user-details"></aside>
        </section>
      </main>
    </div>
  );
}

export default App;
