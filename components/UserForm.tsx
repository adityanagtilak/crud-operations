import { useState, useEffect } from 'react';

interface UserFormProps {
  onSubmit: (user: { name: string; email: string; age: number }) => void;
  initialUser?: { name: string; email: string; age: number };
}

async function fetchUserData() {
  try {
    const response = await fetch('/api/getUserData'); // Replace with your actual endpoint
    if (!response.ok) throw new Error('Failed to fetch user data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, initialUser }) => {
  const [user, setUser] = useState(initialUser || { name: '', email: '', age: 0 });

  useEffect(() => {
    if (!initialUser) {
      fetchUserData().then((fetchedData) => {
        if (fetchedData) {
          setUser(fetchedData); 
        }
      });
    }
  }, [initialUser]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(user);
    setUser({ name: '', email: '', age: 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded">
      <input
        type="text"
        value={user.name}
        onChange={(e) => setUser({ ...user, name: e.target.value })}
        required
        placeholder="Name"
        className="input-field"
      />
      <input
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        required
        placeholder="Email"
        className="input-field"
      />
      <input
        type="number"
        value={user.age}
        onChange={(e) => setUser({ ...user, age: +e.target.value })}
        required
        placeholder="Age"
        className="input-field"
      />
      <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
        Submit
      </button>
    </form>
  );
};

export default UserForm;

// import { useState } from 'react';

// const UserForm = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [age, setAge] = useState(0);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const user = { name, email, age };

//     // Send the submitted user data to an API or backend
//     const response = await fetch('/api/users', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(user),
//     });

//     if (response.ok) {
//       console.log('User data submitted successfully');
//     } else {
//       console.error('Failed to submit user data');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={name}
//         onChange={(e) => setName(e.target.value)}
//         placeholder="Name"
//         required
//       />
//       <input
//         type="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Email"
//         required
//       />
//       <input
//         type="number"
//         value={age}
//         onChange={(e) => setAge(+e.target.value)}
//         placeholder="Age"
//         required
//       />
//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default UserForm;


