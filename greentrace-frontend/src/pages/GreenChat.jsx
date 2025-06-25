import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Stack,
  Divider
} from '@mui/material';
import API from '../api/api';

const GreenChat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  const user_id = parseInt(localStorage.getItem('user_id')) || 1;

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { type: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setInput('');

    try {
      const res = await API.post('/chat', {
        user_id: user_id,
        prompt: userMsg.text
      });

      const botMsg = { type: 'bot', text: res.data.response || 'No response' };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      const errorMsg = { type: 'bot', text: 'Failed to get response' };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        GreenChat Assistant 🌱
      </Typography>

      <Paper elevation={3} sx={{ p: 2, maxHeight: '60vh', overflowY: 'auto' }} ref={chatRef}>
        <Stack spacing={2}>
          {messages.map((msg, idx) => (
            <Box
              key={idx}
              alignSelf={msg.type === 'user' ? 'flex-end' : 'flex-start'}
              bgcolor={msg.type === 'user' ? '#e0f7fa' : '#f1f8e9'}
              p={2}
              borderRadius={2}
              maxWidth="80%"
            >
              <Typography variant="body1" whiteSpace="pre-line">
                {msg.text}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Paper>

      <Divider sx={{ my: 2 }} />

      <Stack direction="row" spacing={2}>
        <TextField
          fullWidth
          label="Ask something green..."
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button variant="contained" onClick={sendMessage} disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </Button>
      </Stack>
    </Box>
  );
};

export default GreenChat;
