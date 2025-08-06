import {Box,Button,Container,TextField,Typography,Link,Paper,} from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

export default function LoginPage() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    adminKey: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async () => {
  const res = await axios.post('/token/', { username: form.email, password: form.password, });
  useAuthStore.getState().setToken(res.data.access);
};

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login submitted:', form);
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ mt: 8, p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Personnel Management Login
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            margin="normal"
            fullWidth
            required
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            fullWidth
            required
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />

          <TextField
            margin="normal"
            fullWidth
            label="Admin Key (if admin)"
            name="adminKey"
            value={form.adminKey}
            onChange={handleChange}
            placeholder="Leave empty if not admin"
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>

          <Typography variant="body2" align="center">
            Don't have an account?{' '}
            <Link href="/register" underline="hover">
              Register here
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}
