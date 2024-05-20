import { Posts } from "./Posts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./App.css";

function App() {
  const client = new QueryClient();
  return (
    // provide React Query client to App
    <QueryClientProvider client={client}>
      <ReactQueryDevtools />
      <div className="App">
        <h1>Blog &apos;em Ipsum</h1>
        <Posts />
      </div>
    </QueryClientProvider>
  );
}

export default App;
