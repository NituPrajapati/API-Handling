import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPosts } from "../../../API/Api";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { deletePost } from "../../../API/Api";
import { updatePost } from "../../../API/Api";

export const ReactQuery = () =>{
  const [pageNumber, setPageNumber] = useState(0);
  const { data, isLoading, isError, error } = useQuery({
  queryKey: ['post', pageNumber],
  queryFn: () => fetchPosts(pageNumber),
  placeholderData: keepPreviousData,
  //gcTime: 100,
  //staleTime: 10000,
  //refetchInterval: 1000,
  //refetchIntervalInBackground: true    //refetch data even if another tab is open
});

const queryclient = useQueryClient();

  const deleted = useMutation({
    mutationFn: (id)=>deletePost(id),
    onSuccess: (data,id) =>{                                         //to delete specific data
        queryclient.setQueryData(['post', pageNumber],(curElem)=>{   //to update the cache data for specific query 
          return curElem?.filter((post) => post.id !== id);
        }); 
    },
  })

  const updated = useMutation({
    mutationFn: (id)=>updatePost(id),
    onSuccess: (apiData,postId) =>{                                          //to delete specific data
        queryclient.setQueryData(['post', pageNumber],(postsData)=>{
          return postsData?.map((curPost)=>{
            return curPost.id === postId ? {...curPost,title: apiData.data.title}: curPost
          })
        });
    },
  })


  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message || "Something went wrong!"}</p>;

  return (
    <div>
      <ul>
        {data.map((curElem) => {
          const { id, title, body } = curElem;
          return (
          <div className="text-center w-40% h-40 bg-gray-200 rounded-2xl m-10 flex-grow border-l-5 sm:w-70% md:w-70%">
            <li key={id}>
              <NavLink to={`/rq/${id}`}>
              <p>{id}</p>
              <p>{title}</p>
              <p>{body}</p>
              </NavLink>
            </li>
            <button onClick={() => deleted.mutate(id)} className="btn m-2 p-4 rounded-2xl bg-red-400">Delete</button>
            <button onClick={() => updated.mutate(id)} className="btn m-2 p-4 rounded-2xl bg-emerald-400">update</button>
          </div>
          );
        })}
      </ul>
      <div className="left-0 flex gap-3 m-4">
        <button 
        onClick={()=>setPageNumber((prev)=>prev-3)} 
        disabled={pageNumber === 0 ? true:false}
        className="btn m-2 p-4 rounded-2xl bg-[444444]">Prev</button>
        <p className="m-2">{(pageNumber/3) +1}</p>
        <button onClick={()=>setPageNumber((prev)=>prev+3)} className="btn m-2 p-4 rounded-2xl bg-[444444]">Next</button>
      </div>
    </div>
  );

}