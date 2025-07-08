const handleLogin = async () => {
  const res = await axios.post('/token/', { username, password });
  useAuthStore.getState().setToken(res.data.access);
};
