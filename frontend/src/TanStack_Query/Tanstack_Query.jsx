import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import MainLayout from './Layout/MainLayout';
import Banner from './Pages/Banner';
import { FetchOld }from './Pages/FetchOld';
import { ReactQuery }from './Pages/ReactQuery';
import InfiniteScroll from './Pages/InfiniteScroll';
import { RqIndividual } from './Pages/RqIndividual';
// Create a router
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Banner />,
      },
      {
        path: "/fOld",
        element: <FetchOld />,
      },
      {
        path: "/rq",
        element: <ReactQuery />,
      },
      {
        path: "/rq/:id",
        element: <RqIndividual />,
      },
      {
        path: "/infinite",
        element: <InfiniteScroll />,
      },
    ],
  },
]);

function Tanstack_Query() {

  const queryClient = new QueryClient();
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
      </RouterProvider>
    </QueryClientProvider>
  
    </>
  )
}

export default Tanstack_Query