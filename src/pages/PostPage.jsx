import React from 'react';
import { Link, useParams } from 'react-router';

const PostPage = () => {
  const { id } = useParams();
  const post = {
    id: id,
    title: 'Getting Started with React and Tailwind CSS',
    author: 'John Doe',
    date: 'Oct 28, 2025',
    readingTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    content: `
      <p class="lead">This is a guide to setting up a new React project with Tailwind CSS and DaisyUI. We will cover the initial setup, configuration, and some best practices.</p>
      <br/>
      <h2>Installation</h2>
      <p>First, you need to have Node.js and npm installed on your machine. Then, you can create a new React project using Vite:</p>
      <div class="mockup-code">
        <pre data-prefix="$"><code>npm create vite@latest my-project -- --template react</code></pre>
        <pre data-prefix="$"><code>cd my-project</code></pre>
        <pre data-prefix="$"><code>npm install</code></pre>
      </div>
      <br/>
      <h2>Conclusion</h2>
      <p>By following this guide, you should have a solid foundation for your next React project with Tailwind CSS and DaisyUI.</p>
    `,
  };

  return (
    <div>
      <div className="text-center py-20">
        <h1 className="text-5xl font-extrabold tracking-tight">{post.title}</h1>
        <div className="mt-4 text-lg text-base-content-secondary">
          <span>{post.author}</span> · <span>{post.date}</span> · <span>{post.readingTime}</span>
        </div>
      </div>
      <figure className="mb-12">
        <img src={post.image} alt={post.title} className="w-full h-96 object-cover rounded-lg" />
      </figure>
      <div className="max-w-4xl mx-auto">
        <article className="prose lg:prose-xl max-w-none" dangerouslySetInnerHTML={{ __html: post.content }} />
        <div className="text-center mt-12">
          <Link to={`/post/${post.id}/edit`} className="btn btn-primary btn-lg">Edit Post</Link>
        </div>
      </div>
    </div>
  );
};

export default PostPage;
