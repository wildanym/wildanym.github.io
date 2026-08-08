import { createBrowserRouter } from "react-router";
import { MainLayout } from "@/layouts/MainLayout";
import { HomePage } from "@/pages/Home";

export const router = createBrowserRouter(
  [
    {
      element: <MainLayout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/detail", lazy: async () => ({ Component: (await import("@/pages/Detail")).DetailPage }) },
        { path: "*", lazy: async () => ({ Component: (await import("@/pages/NotFound")).NotFoundPage }) },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);