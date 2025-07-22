import React from 'react';
import serialize from 'serialize-javascript';

// XSS Vulnerability (React):
export const XSSDemo: React.FC<{ userInput: string }> = ({ userInput }) => (
  // eslint-disable-next-line react/no-danger
  <div dangerouslySetInnerHTML={{ __html: userInput }} />
);

// Insecure eval usage (browser-safe for demo)
export function evalDemo(userInput: string) {
  // eslint-disable-next-line no-eval
  return eval(userInput); // Dangerous!
}

// Insecure serialization
export function serializeDemo(obj: any) {
  return serialize(obj, { unsafe: true });
} 