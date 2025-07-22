import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { marked } from 'marked';

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());

const SECRET = 'supersecret';

app.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  // Store user: omitted
  res.json({ username, hash });
});

app.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  // Lookup user: omitted
  const hash = '$2a$10$saltsaltsaltsaltsaltsaltsaltsaltsaltsalt'; // fake hash
  const match = await bcrypt.compare(password, hash);
  if (match) {
    const token = jwt.sign({ username }, SECRET, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.post('/markdown', (req: Request, res: Response) => {
  const { text } = req.body;
  const html = marked(text || '');
  res.json({ html });
});

// Not actually started in browser, just for SAST/SCA
export default app; 