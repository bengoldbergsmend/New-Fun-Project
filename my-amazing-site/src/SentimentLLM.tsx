import React, { useState } from 'react';

const loadTransformers = async () => {
  const { pipeline } = await import('@xenova/transformers');
  return pipeline;
};

const SentimentLLM: React.FC = () => {
  const [text, setText] = useState('');
  const [sentiment, setSentiment] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSentiment('');
    try {
      const pipeline = await loadTransformers();
      // Use a small, open-source sentiment analysis model
      const classifier = await pipeline('sentiment-analysis', 'Xenova/distilbert-base-uncased-finetuned-sst-2-english');
      const result = await classifier(text);
      // Explicitly cast result as array of objects with label and score
      const arr = result as Array<{ label: string; score: number }>;
      const label = arr[0]?.label;
      const score = arr[0]?.score;
      setSentiment(label ? `${label} (${(score * 100).toFixed(1)}%)` : 'No result.');
    } catch (err: any) {
      setError('Sorry, something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: '2px solid #e11d48', borderRadius: 12, padding: 24, maxWidth: 400, margin: '2rem auto', background: '#fff0f3' }}>
      <h2 style={{ color: '#e11d48' }}>Sentiment Analysis LLM</h2>
      <form onSubmit={handleAnalyze} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Enter text to analyze..."
          style={{ padding: 8, borderRadius: 6, border: '1px solid #e11d48' }}
          required
        />
        <button type="submit" disabled={loading} style={{ background: '#e11d48', color: 'white', border: 'none', borderRadius: 6, padding: '8px 0', fontWeight: 'bold' }}>
          {loading ? 'Analyzing...' : 'Analyze'}
        </button>
      </form>
      {sentiment && (
        <div style={{ marginTop: 16, color: '#e11d48', fontWeight: 'bold', fontSize: '1.1em' }}>{sentiment}</div>
      )}
      {error && (
        <div style={{ marginTop: 16, color: 'red' }}>{error}</div>
      )}
    </div>
  );
};

export default SentimentLLM; 