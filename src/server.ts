import express, { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());

interface User {
  id: string,
  name: string,
  email: string
}

const users: User[] = [];

const userModule = {
  get: (request: Request, response: Response) => {
    return response.json(users);
  },
  post: (request: Request, response: Response) => {
    const { name, email } = request.body;

    const user = { id: uuid(), name, email }
    users.push(user);

    return response.json(users);
  },
  update: (request: Request, response: Response) => {
    const { id } = request.params;
    const { name, email } = request.body;

    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex < 0) {
      return response.status(404).json({
        error: 'User not found',
      })
    };

    const user = { id, name, email };
    users[userIndex] = user

    return response.json(user);
  },
  delete: (request: Request, response: Response) => {
    const { id } = request.params;

    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex < 0) {
      return response.status(404).json({
        error: 'User not found',
      })
    };

    users.splice(userIndex, 1);

    return response.status(204).send();
  }
};

const route = {
  users: '/users'
}

app.get(`${route.users}`, userModule.get);
app.post(`${route.users}`, userModule.post);
app.put(`${route.users}/:id`, userModule.update);
app.delete(`${route.users}/:id`, userModule.delete);

app.listen('3435',
  () => console.log('⚡️[server]: Backend is running on port 3435'),
);