import {useEffect, useState} from "react";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query" ;
import {deletePOst, fetchPosts} from "./api.js" ;
import PostDetail from "./PostDetail.tsx";

export function Posts() {
    const maxPostpage = 10 ;
    const queryCleint = useQueryClient();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedPost, setSelectedPost] = useState(null);
    const {data, isLoading, isError, error} = useQuery(
        {
            queryKey: ["posts", currentPage],
            queryFn: () => fetchPosts(currentPage),

        }
    );
    const deleteMutation = useMutation({
        mutationFn : (postId)=>deletePOst(postId)
    });
    useEffect(()=>{
        if(currentPage < maxPostpage){
            const nextPage = currentPage+1 ;
            queryCleint.prefetchQuery(
                {
                    queryKey : ["posts",nextPage ],
                    queryFn : ()=>fetchPosts(nextPage),
                }
            );
        }

    },[currentPage,queryCleint])
    if (isLoading) {
        return <h1>Loading ...</h1>
    }
    if (isError) {
        return <h1>Erreur ... {error.toString()}</h1>
    }
    if (!data) {
        return <div/>
    }
    return (

        <>
            liste des Posts:
            <ul>
                {data.map((post) => (
                    <li
                        key={post.id}
                        onClick={() => {
                            deleteMutation.reset();
                            setSelectedPost(post);
                        }
                    }
                    >{post.title}</li>
                ))}
            </ul>
            <div>
                <button disabled={currentPage <= 1 }
                        onClick={() => {
                    setCurrentPage((prevValue ) => prevValue-1)
                }}>-
                </button>
                <span> page {currentPage} </span>
                <button disabled={currentPage >= maxPostpage}
                        onClick={() => {
                setCurrentPage((prevValue ) => prevValue+1)
                }}>+
                </button>
            </div>
            {selectedPost && <PostDetail deleteMutation = {deleteMutation} post={selectedPost}/>}
        </>
    )
}