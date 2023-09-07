import Link from "next/link";
import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Posts({ posts }) {
  return (
    <div
      className={`flex min-h-screen flex-col items-center  p-24 ${inter.className}`}
    >
      <h1>All posts</h1>
      <Link href="/">Back to home</Link>
      <ul className="mt-10">
        {posts.map((post) => (
          <Link key={post.id} href={"posts/" + post.id}>
            <li className="my-4 p-3 border-slate-600 border-2 rounded-xl">
              {post.title}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();

  return {
    props: {
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, // In seconds
  };
}
