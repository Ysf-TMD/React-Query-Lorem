
import { QueryClient , QueryClientProvider } from '@tanstack/react-query';
import {Posts} from "./Posts.tsx";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

import "./assets/PostDetail.css"
function App() {
  
 const queryClient = new QueryClient();
  return (

    <QueryClientProvider client = {queryClient}>

        <div className="App">
            <h1>Blog Posts</h1>
            <Posts/>
        </div>
        <ReactQueryDevtools/>
    </QueryClientProvider>
  )
}

export default App
