import { RouterProvider } from 'react-router'
import { ThemeProvider } from '@/hooks/ThemeProvider'
import { router } from '@/router'

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
