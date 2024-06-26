import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { fetchPosts, deletePost, updatePost } from "./api";
import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

export function Posts() {
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedPost, setSelectedPost] = useState(null);
  const queryClient = useQueryClient();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["posts", currentPage],
    queryFn: () => fetchPosts(currentPage),
  });

  const deleteMutation = useMutation({
    mutationFn: deletePost,
  });

  const updateMutation = useMutation({
    mutationFn: updatePost,
  });

  useEffect(() => {
    if (currentPage < maxPostPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery({
        queryKey: ["posts", nextPage],
        queryFn: () => fetchPosts(nextPage),
      });
    }
  }, [currentPage]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>에러발생!!</div>;
  }
  return (
    <>
      <ul>
        {data?.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => {
              deleteMutation.reset();
              updateMutation.reset();
              setSelectedPost(post);
            }}
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button
          disabled={currentPage === 0}
          onClick={() => {
            setCurrentPage((prev) => prev - 1);
          }}
        >
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button
          disabled={maxPostPage === currentPage}
          onClick={() => {
            setCurrentPage((prev) => prev + 1);
          }}
        >
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && (
        <PostDetail
          post={selectedPost}
          deleteMutation={deleteMutation}
          updateMutation={updateMutation}
        />
      )}
    </>
  );
}
