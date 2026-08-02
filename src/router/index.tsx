import { createBrowserRouter } from 'react-router'
import { MainLayout } from '@/layouts/MainLayout'
import { DetailPage } from '@/pages/Detail'
import { HomePage } from '@/pages/Home'
import { NotFoundPage } from '@/pages/NotFound'

export const router = createBrowserRouter(
  [
    {
      element: <MainLayout />,
      children: [
        { path: '/', element: <HomePage /> },
        { path: '/detail', element: <DetailPage /> },
        { path: '*', element: <NotFoundPage /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
)
