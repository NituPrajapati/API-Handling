import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../../API/Api";
import { NavLink } from "react-router-dom";

export const ReactQuery = () =>{
 
  const { data, isLoading, isError, error } = useQuery({
  queryKey: ['post'],
  queryFn: fetchPosts,
  //gcTime: 100,
  //staleTime: 10000,
  //refetchInterval: 1000,
  //refetchIntervalInBackground: true    //refetch data even if another tab is open
});

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message || "Something went wrong!"}</p>;

  return (
    <div>
      <ul>
        {data.map((curElem) => {
          const { id, title, body } = curElem;
          return (
          <div className="text-center w-40% h-25 bg-gray-200 rounded-2xl m-10 flex-grow border-l-5 sm:w-70% md:w-70%">
            <li key={id}>
              <NavLink to={`/rq/${id}`}>
              <p>{id}</p>
              <p>{title}</p>
              <p>{body}</p>
              </NavLink>
            </li>
          </div>
          );
        })}
      </ul>
    </div>
  );

}