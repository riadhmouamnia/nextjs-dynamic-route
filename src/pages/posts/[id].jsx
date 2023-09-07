import React from "react";

import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Post({ post, comments }) {
  return (
    <div
      className={`flex min-h-screen flex-col items-center  p-24 ${inter.className}`}
    >
      <div>
        <h2>Post Details:</h2>
        <h3 className="mb-4">Title: {post.title}</h3>
        <p> Description: {post.body}</p>
      </div>
      <div className="mt-10">
        <h2>Comments:</h2>
        <ul>
          {comments.map((comment) => (
            <li
              className="my-4 p-3 border-slate-600 border-2 rounded-xl"
              key={comment.id}
            >
              {comment.body}
            </li>
          ))}
        </ul>
      </div>
      <Link href="/posts">👈 back to posts</Link>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/posts/" + params.id
  );
  const post = await res.json();

  const res2 = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}/comments/`
  );
  const comments = await res2.json();

  return {
    props: {
      post,
      comments,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}

export async function getStaticPaths() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post) => ({
    //[{ id: "1" }, { id: "2"  }...]
    params: { id: post.id.toString() },
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: 'blocking' } will server-render pages
  // on-demand if the path doesn't exist.
  return { paths, fallback: "blocking" };
}
