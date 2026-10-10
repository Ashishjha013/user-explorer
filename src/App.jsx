import { useEffect, useState } from "react";
import "./App.css";

const API_URL =
  "https://api.freeapi.app/api/v1/public/randomusers?page=1&limit=10";

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const result = await response.json();

        console.log("API response:", result);

        const fetchedUsers = result.data.data;
        setUsers(fetchedUsers);
      } catch (err) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return <h2 className="status">Loading users...</h2>;
  }

  if (error) {
    return <h2 className="status error">Error: {error}</h2>;
  }

  return (
    <main className="page">
      <header className="page-header">
        <p className="eyebrow">REACT API PROJECT</p>
        <h1>User Explorer</h1>
        <p>Meet people fetched from FreeAPI.</p>
      </header>

      <section className="user-grid">
        {users.map((user, index) => {
          const name = `${user.name.first} ${user.name.last}`;

          return (
            <article
              className="user-card"
              key={user.login?.uuid ?? user.email ?? index}
            >
              <img
                className="avatar"
                src={user.picture.thumbnail}
                alt={`${name}'s profile`}
              />

              <h2>{name}</h2>
              <p className="email">{user.email}</p>
              <p className="city">
                {user.location.city}, {user.location.country}
              </p>
            </article>
          );
        })}
      </section>
    </main>
  );
}

export default App;
