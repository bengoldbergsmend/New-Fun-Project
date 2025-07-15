import React, { useState } from 'react';

// Lazy-load transformers.js to avoid slowing initial bundle
const loadTransformers = async () => {
  const { pipeline } = await import('@xenova/transformers');
  return pipeline;
};

const CuteLLM: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAnswer('');
    try {
      const pipeline = await loadTransformers();
      // Use a small conversational model (distilbert is for QA, but for demo, it's fast)
      const qa = await pipeline('question-answering');
      // Provide a cute context for the model to answer from
      const context =
        "You are a cute, friendly assistant who loves to answer questions in a sweet and playful way. Always keep your answers short and adorable.";
      // Pass question and context as separate arguments
      const result = await qa(question, context);
      // Result can be an object or array
      const answerText = Array.isArray(result) ? result[0]?.answer : result.answer;
      setAnswer(answerText || 'No answer found.');
    } catch (err: any) {
      setError('Sorry, something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: '2px dashed pink', borderRadius: 12, padding: 24, maxWidth: 400, margin: '2rem auto', background: '#fff0fa' }}>
      <h2 style={{ color: '#e75480' }}>Ask the Cute LLM!</h2>
      <form onSubmit={handleAsk} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Ask me anything cute..."
          style={{ padding: 8, borderRadius: 6, border: '1px solid #e75480' }}
          required
        />
        <button type="submit" disabled={loading} style={{ background: '#e75480', color: 'white', border: 'none', borderRadius: 6, padding: '8px 0', fontWeight: 'bold' }}>
          {loading ? 'Thinking...' : 'Ask!'}
        </button>
      </form>
      {answer && (
        <div style={{ marginTop: 16, color: '#e75480', fontWeight: 'bold', fontSize: '1.1em' }}>💡 {answer}</div>
      )}
      {error && (
        <div style={{ marginTop: 16, color: 'red' }}>{error}</div>
      )}
    </div>
  );
};

export default CuteLLM; 