import { exec } from 'child_process';
import jwt from 'jsonwebtoken';

// Command Injection (Node):
export function runCommand(userInput: string) {
  // Do not call this in production!
  exec('echo ' + userInput, (err, stdout, stderr) => {
    // Output for demo
    // eslint-disable-next-line no-console
    console.log(stdout);
  });
}

// Hardcoded secret
export const HARDCODED_SECRET = 'super-insecure-hardcoded-secret';

// Insecure JWT (none algorithm)
export function makeInsecureJWT(payload: object) {
  // @ts-ignore
  return jwt.sign(payload, null, { algorithm: 'none' });
}

// Open Redirect (Express-style, not used in app)
export function openRedirectDemo(res: any, userUrl: string) {
  res.redirect(userUrl); // Do not use user input directly!
} 