import {prisma} from "@/lib/prisma";

import { User } from "@prisma/client";

export default async function UsersPage() {
  const users: User[] = await prisma.user.findMany();

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

