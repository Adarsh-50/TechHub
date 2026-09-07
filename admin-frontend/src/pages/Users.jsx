import { useState } from "react";

function Users() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      registeredDate: "05-09-2026",
    },
    {
      id: 2,
      name: "Priya Singh",
      email: "priya@gmail.com",
      registeredDate: "06-09-2026",
    },
    {
      id: 3,
      name: "Amit Kumar",
      email: "amit@gmail.com",
      registeredDate: "07-09-2026",
    },
  ]);

  const deleteUser = (id) => {
    const updatedUsers = users.filter(
      (user) => user.id !== id
    );

    setUsers(updatedUsers);
  };

  return (
    <div className="users-page">
      <h1>User Management</h1>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Registered Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.registeredDate}</td>

                <td>
                  <button
                    className="delete-button"
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;