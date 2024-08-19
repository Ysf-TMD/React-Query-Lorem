export async function fetchPosts(pageNume=1){


    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNume}`
    );
    return response.json();
}
export async  function fetchComments(postId){
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    console.log("posty id is ",postId);
    return response.json();
}
export async function deletePOst(postId){
    const response = await fetch(
        `http://jsonplaceholder.typicode.com/posts/${postId}`,
        {method:"DELETE"}
    );
    return response.json();
}
