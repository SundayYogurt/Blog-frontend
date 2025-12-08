import React from 'react';
import { Link } from 'react-router';

const HomePage = () => {
  const posts = [
    {
      id: 1,
      title: 'Getting Started with React and Tailwind CSS',
      author: 'John Doe',
      date: 'Oct 28, 2025',
      readingTime: '5 min read',
      excerpt: 'A comprehensive guide to setting up a new React project with Tailwind CSS and DaisyUI...',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 2,
      title: 'The Power of Functional Components',
      author: 'Jane Smith',
      date: 'Oct 25, 2025',
      readingTime: '8 min read',
      excerpt: 'Exploring the benefits of functional components and hooks in modern React development...',
      image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    {
      id: 3,
      title: 'Mastering Dark Mode with DaisyUI',
      author: 'Sam Wilson',
      date: 'Oct 22, 2025',
      readingTime: '3 min read',
      excerpt: 'A quick tutorial on how to implement beautiful dark themes in your applications using DaisyUI...',
      image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
  ];

  return (
    <div>
      <header className="text-center py-20">
        <h1 className="text-6xl font-bold tracking-tight">Stay Curious.</h1>
        <p className="text-xl mt-4 text-neutral">Discover stories, thinking, and expertise from writers on any topic.</p>
      </header>

      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link to={`/post/${post.id}`} key={post.id} className="card bg-base-200 shadow-xl transform transition-transform duration-300 hover:-translate-y-2">
            <figure><img src={post.image} alt={post.title} /></figure>
            <div className="card-body">
              <h2 className="card-title">{post.title}</h2>
              <p className="mt-2 text-base-content-secondary">{post.excerpt}</p>
              <div className="card-actions justify-end mt-4">
                <div className="flex items-center space-x-2 text-sm">
                  <span>{post.author}</span>
                  <span className="text-gray-500">·</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <footer className="text-center py-12 mt-20">
        <p>&copy; {new Date().getFullYear()} My Awesome Blog. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;