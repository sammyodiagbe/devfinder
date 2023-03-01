import { useState } from "react";
import IconSearch from "./components/iconsearch";
import IconMoon from "./components/iconmoon";
import IconLocation from "./components/iconlocation";
import IconWebsite from "./components/iconwebsite";
import IcontTwitter from "./components/icontwitter";
import IconSun from "./components/iconsun";
import IconCompany from "./components/iconcompany";

import { githubApiUrl } from "./helper";
import IconTwitter from "./components/icontwitter";

function App() {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const {
    avatar_url,
    bio,
    blog,
    public_repos,
    followers,
    following,
    twitter_username,
    location,
    login,
    name,
    company,
  } = user ?? {};

  const searchUser = async () => {
    if (username.trim() === "") return;
    try {
      const response = await fetch(githubApiUrl(username));
      const githubUser = await response.json();
      const login = githubUser?.login;
      if (login) {
        // then we do have a user
        setUser(githubUser);
        return;
      }
      // we do not have a user
      setError("No result.");
    } catch (err) {}
  };
  return (
    <div className={`github-app ${darkMode ? "dark" : ""}`}>
      <div className="container">
        <nav className="nav">
          <h2>Devfinder</h2>

          <button
            className="toggle-theme"
            onClick={() => setDarkMode(!darkMode)}
          >
            <span>{darkMode ? "Light" : "Dark"}</span>
            {darkMode ? <IconSun /> : <IconMoon />}
          </button>
        </nav>
        <main className="main-container">
          <div className="search-container">
            <IconSearch />
            <input
              type="text"
              placeholder="search github username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
            <button className="btn" onClick={searchUser}>
              Search
            </button>
          </div>
          <section className="search-content">
            {/* <aside className="user-container"></aside> */}
            <div className="img-head-container">
              <div className="img-container">
                <img src={avatar_url} alt="Github user profile" />
              </div>
              <header className="head">
                <div className="head-left">
                  <h3>{name}</h3>
                  <p className="username">@{login}</p>
                </div>

                <p>Joined at Mar 14</p>
              </header>
            </div>
            <section className="user-details">
              <p className="bio">{bio}</p>
              <div className="repo-details">
                <div className="r-details">
                  <p>Repos</p>
                  <b>{public_repos}</b>
                </div>
                <div className="r-details">
                  <p>Followers</p>
                  <b>{followers}</b>
                </div>
                <div className="r-details">
                  <p>Following</p>
                  <b>{following}</b>
                </div>
              </div>
              <div className="socials">
                <span className="social">
                  <IconLocation />
                  {location ? location : "Not available"}
                </span>
                <span className="social">
                  <IconWebsite />
                  {blog ? <a href={blog}>{blog}</a> : "Not available"}
                </span>
                <span className="social">
                  <IconTwitter />
                  {twitter_username ? "Twitter" : "Not available"}
                </span>
                <span className="social">
                  <IconCompany />
                  {company ? company : "Not available"}
                </span>
              </div>
            </section>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
