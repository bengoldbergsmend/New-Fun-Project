import React, { useState } from 'react';

const loadTransformers = async () => {
  const { pipeline } = await import('@xenova/transformers');
  return pipeline;
};

const TextGenLLM: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOutput('');
    try {
      const pipeline = await loadTransformers();
      // Use a small, open-source text-generation model (e.g., GPT-2)
      const generator = await pipeline('text-generation', 'Xenova/gpt2');
      const result = await generator(prompt, { max_new_tokens: 40 });
      const text = Array.isArray(result) ? result[0]?.generated_text : result.generated_text;
      setOutput(text || 'No output.');
    } catch (err: any) {
      setError('Sorry, something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: '2px solid #4f46e5', borderRadius: 12, padding: 24, maxWidth: 400, margin: '2rem auto', background: '#f0f4ff' }}>
      <h2 style={{ color: '#4f46e5' }}>Text Generation LLM</h2>
      <form onSubmit={handleGenerate} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          type="text"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          placeholder="Enter a prompt..."
          style={{ padding: 8, borderRadius: 6, border: '1px solid #4f46e5' }}
          required
        />
        <button type="submit" disabled={loading} style={{ background: '#4f46e5', color: 'white', border: 'none', borderRadius: 6, padding: '8px 0', fontWeight: 'bold' }}>
          {loading ? 'Generating...' : 'Generate'}
        </button>
      </form>
      {output && (
        <div style={{ marginTop: 16, color: '#4f46e5', fontWeight: 'bold', fontSize: '1.1em' }}>{output}</div>
      )}
      {error && (
        <div style={{ marginTop: 16, color: 'red' }}>{error}</div>
      )}
    </div>
  );
};

export default TextGenLLM; 