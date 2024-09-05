import { Injectable } from "@nestjs/common";
import { User } from "./user.interface";
import { Userdto } from "./dtos/user.dto";

@Injectable()
export class UsersRepository {
    private users = [{
        id: 1,
        email: "john.doe@example.com",
        name: "John Doe",
        password: "password123",
        address: "123 Main St, Apt 4B",
        phone: "+1-202-555-0143",
        country: "USA",
        city: "New York"
    },
    {
        id: 2,
        email: "jane.smith@example.com",
        name: "Jane Smith",
        password: "securePass456",
        address: "456 Oak Dr, Suite 300",
        phone: "+44-20-7946-0958",
        country: "UK",
        city: "London"
    },
    {
        id: 3,
        email: "peter.parker@example.com",
        name: "Peter Parker",
        password: "sp1derM@n",
        address: "789 Broadway, Unit 8A",
        phone: "+1-212-555-0192",
        country: "USA",
        city: "New York"
    },
    {
        id: 4,
        email: "maria.garcia@example.com",
        name: "Maria Garcia",
        password: "passw0rd789",
        address: "101 Maple St, Floor 2",
        phone: "+34-91-555-8392",
        country: "Spain",
        city: "Madrid"
    },
    {
        id: 5,
        email: "li.wang@example.com",
        name: "Li Wang",
        password: "P@ssword321",
        address: "202 Elm St, Apt 12",
        phone: "+86-10-5558-3294",
        country: "China",
        city: "Beijing"
    }]
    
    async getUsers(page: number = 1, limit: number = 5): Promise<Omit<Userdto, 'password'>[]> {
        const offset = (page - 1) * limit;
        const paginatedUsers = this.users.slice(offset, offset + limit).map(({ password, ...rest }) => rest);
        return paginatedUsers;
    }

    async getUserById(id: number){
        return this.users.find((user) => user.id === id)
    }

    async createUser(user: Omit< Userdto, 'id'>){
        const id = this.users.length + 1;
        this.users = [...this.users, { id, ...user }];
        return { id }
    }

    async updateUserById(id: number, user: Userdto): Promise<number> {
        const index = this.users.findIndex((u) => u.id === id);
        if (index === -1) {
          throw new Error(`User with ID ${id} not found`);
        }
        this.users[index] = { ...this.users[index], ...user };
        return id;
      }
      
      async deleteUser(id: number): Promise<number> {
        const index = this.users.findIndex((u) => u.id === id);
        if (index === -1) {
          throw new Error(`User with ID ${id} not found`);
        }
        this.users.splice(index, 1);
        return id;
      }

      async getUserByEmail(email: string): Promise<User | undefined> {
        return this.users.find((user) => user.email === email);
    }
}