import { useState, useEffect } from "react";
import axios from "./API/axios";
import UseRefreshToken from "./hooks/UseRefreshToken";
const Users = () => {
  const [users, setUsers] = useState();
  const refresh = UseRefreshToken();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axios.get("/users", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        console.err(err);
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort;
    };
  }, []);
  return (
    <article>
      <h2>Users List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => (
            <li key={i}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No users to display </p>
      )}
      <button onClick={() => refresh()}>Refresh</button>
      <br />
    </article>
  );
};

export default Users;
