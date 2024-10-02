import { useState, useEffect } from 'react';
import UserForm from './UserForm';

interface User {
  id: string;
  name: string;
  email: string;
  age: number;
}

const UserDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const response = await fetch('/api/users/:userId');
    const data = await response.json();
    setUsers(data);
    setLoading(false);
  };

  const addUser = async (user: { name: string; email: string; age: number }) => {
    await fetch('/api/users/:userId', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    fetchUsers();
  };

  const deleteUser = async (userId: string) => {
    await fetch(`/api/users/${userId}`, { method: 'DELETE' });
    fetchUsers();
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      <UserForm onSubmit={addUser} />
      {loading ? <p>Loading...</p> : (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.name} ({user.age}) - {user.email}
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDashboard;
