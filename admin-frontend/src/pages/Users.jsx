import { useEffect, useState } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        "http://localhost:5000/api/users",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch users"
        );
      }

      setUsers(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("adminUser")
    );

    setCurrentUser(user);
    fetchUsers();
  }, []);

  const updateRole = async (id, newRole) => {
    try {
      const token = localStorage.getItem("adminToken");

      const response = await fetch(
        `http://localhost:5000/api/users/${id}/role`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            role: newRole,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message || "Failed to update role"
        );
        return;
      }

      setUsers(
        users.map((user) =>
          user.id === id
            ? {
                ...user,
                role: newRole,
              }
            : user
        )
      );
    } catch (error) {
      alert("Unable to connect to the server");
    }
  };

  if (loading) {
    return (
      <div className="users-page">

        <div className="dashboard-brand">
          <div className="dashboard-brand-name">
            <span>Tech</span>Hub
          </div>

          <div className="dashboard-brand-tagline">
            TECH • STORE
          </div>
        </div>

        <h1>User Management</h1>

        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className="users-page">

      {/* TechHub Branding */}
      <div className="dashboard-brand">
        <div className="dashboard-brand-name">
          <span>Tech</span>Hub
        </div>

        <div className="dashboard-brand-tagline">
          TECH • STORE
        </div>
      </div>

      <h1>User Management</h1>

      {error && (
        <p className="admin-error">
          {error}
        </p>
      )}

      <div className="users-table-container">

        <table className="users-table">

          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Registered Date</th>
              <th>Update Role</th>
            </tr>
          </thead>

          <tbody>

            {users.map((user) => {

              const canUpdateRole =
                currentUser?.role === "superadmin" &&
                user.role !== "superadmin";

              return (
                <tr key={user.id}>

                  <td>{user.id}</td>

                  <td>{user.name}</td>

                  <td>{user.email}</td>

                  <td>{user.role}</td>

                  <td>
                    {new Date(
                      user.createdAt
                    ).toLocaleDateString()}
                  </td>

                  <td>

                    {canUpdateRole ? (
                      <select
                        value={user.role}
                        onChange={(e) =>
                          updateRole(
                            user.id,
                            e.target.value
                          )
                        }
                      >
                        <option value="customer">
                          Customer
                        </option>

                        <option value="admin">
                          Admin
                        </option>
                      </select>
                    ) : (
                      <span>Protected</span>
                    )}

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default Users;