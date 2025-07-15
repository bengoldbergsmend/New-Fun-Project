import React, { useState } from 'react';

const loadTransformers = async () => {
  const { pipeline } = await import('@xenova/transformers');
  return pipeline;
};

const SummarizeLLM: React.FC = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSummarize = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSummary('');
    try {
      const pipeline = await loadTransformers();
      // Use a small, open-source summarization model (e.g., t5-small)
      const summarizer = await pipeline('summarization', 'Xenova/t5-small');
      const result = await summarizer(text, { max_new_tokens: 40 });
      const summaryText = Array.isArray(result) ? result[0]?.summary_text : result.summary_text;
      setSummary(summaryText || 'No summary.');
    } catch (err: any) {
      setError('Sorry, something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: '2px solid #059669', borderRadius: 12, padding: 24, maxWidth: 400, margin: '2rem auto', background: '#f0fff4' }}>
      <h2 style={{ color: '#059669' }}>Summarization LLM</h2>
      <form onSubmit={handleSummarize} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Paste text to summarize..."
          style={{ padding: 8, borderRadius: 6, border: '1px solid #059669', minHeight: 60 }}
          required
        />
        <button type="submit" disabled={loading} style={{ background: '#059669', color: 'white', border: 'none', borderRadius: 6, padding: '8px 0', fontWeight: 'bold' }}>
          {loading ? 'Summarizing...' : 'Summarize'}
        </button>
      </form>
      {summary && (
        <div style={{ marginTop: 16, color: '#059669', fontWeight: 'bold', fontSize: '1.1em' }}>{summary}</div>
      )}
      {error && (
        <div style={{ marginTop: 16, color: 'red' }}>{error}</div>
      )}
    </div>
  );
};

export default SummarizeLLM; 