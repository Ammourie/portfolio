
import { User } from "@prisma/client";
import { sql } from "@vercel/postgres";

export default async function UsersPage() {
  const { rows } = await sql`SELECT * FROM "User"`;
  const users = rows.map((row) => ({
    id: row.id,
    email: row.email,
    name: row.name,
  }));

  return (
    <div>
      <h1>Users</h1>
      {users.length > 0 ? (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.email || user.name}</li>
          ))}
        </ul>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
}

