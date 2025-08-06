import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRouter from './router'
import './App.css'

const queryClient = new QueryClient();

function App() {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    </>
    )
}

export default App
