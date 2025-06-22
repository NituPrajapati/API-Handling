import { useQuery } from "@tanstack/react-query";
import { NavLink, useParams } from "react-router-dom";
import { fetchInvPost } from "../../../API/Api";

export const RqIndividual = () => {
    const {id} = useParams();
    const {data, isPending, isError, error} = useQuery({
        queryKey: ["posts"],
        queryFn:  ()=> fetchInvPost(id),
    })

    
        if (isPending) return <p>Loading...</p>;
        if (isError) return <p>Error: {error.message || "Something went wrong!"}</p>;
    return(
        <>
        <div>
        <div>
            <p>{data.id}</p>
            <p>{data.title}</p>
            <p>{data.body}</p>   
        </div>
            <NavLink to={"/rq"}><button className="w-28 h-12 m-10 bg-[#444444] text-white rounded-2xl">Back</button></NavLink>
        </div>
        </>
    )
};