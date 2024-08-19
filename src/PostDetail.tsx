import {useQuery} from "@tanstack/react-query";
import {fetchComments} from "./api.js";

export default function PostDetail({post,deleteMutation}){
    const {data , isError , isFetching , error , isLoading} = useQuery({
        queryKey : ["comments",post.id],
        queryFn : ()=>fetchComments(post.id),
        staleTime : 3000 ,
    });
    if(isLoading) return <h1>Loading for data ... pleas wait</h1>
    if(isError)return <h1>Erreur during fetching {error.toString()}</h1>
    return (
        <>
            <h1>Post Detail  </h1>
            <div>
                <button onClick={()=>deleteMutation.mutate(post.id)}>delete</button>
                {deleteMutation.isPending && (
                    <p className = "loading">
                        Deleting the post
                    </p>
                )}
                {deleteMutation.isError && <p className = "error">Error deleting the post  : {deleteMutation.error.toString()}</p>}
                {deleteMutation.isSuccess && <p className={"success"}>Post was deleted</p>}
            </div>
            <button>update</button>
            <h3>title : {post.title}</h3>
            <p><b><u><em>content</em> </u></b>: {post.body}</p>
            <hr/>
            <h3>Comments</h3>
            <p>
                <ul>
                    {data.map((comment)=>(
                        <>
                            <li key={comment.id}>
                               <b> {comment.email}</b>:{comment.body}
                            </li>
                            <hr/>
                        </>
                    ))}
                </ul>

            </p>
        </>
    )
}