
<Route
  path="/dashboard"
  element={isAuthed ? <Dashboard /> : <Navigate to="/login" />}
/>
