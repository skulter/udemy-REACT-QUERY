import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchComments } from "./api";
import "./PostDetail.css";

export function PostDetail({ post, deleteMutation, updateMutation }) {
  // replace with useQuery
  // const data = [];
  const { data, isLoading, isError } = useQuery({
    queryKey: ["post", "comment", post.id],
    queryFn: () => fetchComments(post.id),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <div>
        <button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
      </div>
      {deleteMutation.isPending && <div className="loading">삭제중이다.</div>}
      {deleteMutation.isSuccess && <div className="success">삭제됬다.</div>}
      <div>
        <button onClick={() => updateMutation.mutate(post.id)}>
          Update title
        </button>
        {updateMutation.isPending && <div className="loading">업데이트중.</div>}
        {updateMutation.isSuccess && (
          <div className="success">업데이트됬다.</div>
        )}
      </div>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
