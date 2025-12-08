import * as React from "react";
import { useParams } from "react-router";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditPostPage = () => {
  const { id } = useParams();

  const [post, setPost] = React.useState({
    id: id,
    title: "Getting Started with React and Tailwind CSS",
    content: `
      <p>This is a guide to setting up a new React project with Tailwind CSS and DaisyUI. We will cover the initial setup, configuration, and some best practices.</p>
    `,
  });

  const [coverImage, setCoverImage] = React.useState(null);

  const handleContentChange = (content) => {
    setPost((prev) => ({ ...prev, content }));
  };

  const handleDelete = () => {
    // TODO: replace with real confirm modal (SweetAlert, DaisyUI modal, etc.)
    if (confirm("Are you sure you want to delete this post?")) {
      console.log("Deleting post...");
    }
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files?.[0];
    setCoverImage(file || null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: call API / mutation
    console.log("Saving post...", { post, coverImage });
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  return (
    <div className="min-h-screen bg-base-200/60 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Page header */}
        <div className="flex flex-col gap-4 mb-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Edit Post
              </h1>
              <p className="text-base-content/70 mt-1">
                Update your article content, title, and cover image.
              </p>
            </div>

            {id && (
              <div className="flex flex-col items-end gap-1 text-sm">
                <span className="badge badge-outline badge-sm">
                  Post ID: <span className="ml-1 font-mono">{id}</span>
                </span>
                <span className="text-xs text-base-content/60">
                  Last edited just now
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Main card */}
        <div className="card bg-base-100 shadow-xl border border-base-300/60">
          <div className="card-body p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Cover image */}
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <label className="label p-0">
                    <span className="label-text text-base font-semibold">
                      Cover image
                    </span>
                  </label>
                  <span className="text-xs text-base-content/60">
                    Recommended: 1200 × 630px
                  </span>
                </div>

                <div className="flex flex-col md:flex-row gap-4 md:items-center">
                  <input
                    type="file"
                    accept="image/*"
                    className="file-input file-input-bordered w-full md:max-w-xs"
                    onChange={handleCoverImageChange}
                  />

                  {coverImage ? (
                    <div className="flex items-center gap-3 text-sm">
                      <div className="avatar">
                        <div className="w-12 rounded-md ring ring-base-300 ring-offset-base-100 ring-offset-2">
                          {/* preview ทำจริงอาจใช้ URL.createObjectURL */}
                          <span className="flex h-full w-full items-center justify-center text-xs">
                            img
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium truncate max-w-[180px]">
                          {coverImage.name}
                        </span>
                        <span className="text-xs text-base-content/60">
                          {(coverImage.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-base-content/60">
                      No image selected.
                    </p>
                  )}
                </div>
              </div>

              {/* Title */}
              <div className="space-y-2">
                <label className="label p-0">
                  <span className="label-text text-base font-semibold">
                    Title
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="Post title"
                  className="input input-bordered input-lg w-full text-xl md:text-2xl font-semibold"
                  value={post.title}
                  onChange={(e) =>
                    setPost((prev) => ({ ...prev, title: e.target.value }))
                  }
                />
                <p className="text-xs text-base-content/60 mt-1">
                  Make it concise and descriptive. This will appear in listings
                  and SEO.
                </p>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <label className="label p-0">
                  <span className="label-text text-base font-semibold">
                    Content
                  </span>
                </label>

                <div className="rounded-xl border border-base-300 overflow-hidden bg-base-200/60">
                  {/* Quill toolbar + editor */}
                  <ReactQuill
                    theme="snow"
                    value={post.content}
                    onChange={handleContentChange}
                    modules={modules}
                  />
                </div>

                <p className="text-xs text-base-content/60 mt-1">
                  Use headings, lists, and code blocks to keep your article easy
                  to read.
                </p>
              </div>

              {/* Actions */}
              <div className="divider my-4" />

              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                <button
                  type="button"
                  className="btn btn-ghost btn-outline btn-error md:w-auto w-full"
                  onClick={handleDelete}
                >
                  Delete post
                </button>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                  <button
                    type="button"
                    className="btn btn-ghost w-full sm:w-auto"
                  >
                    Save as draft
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary w-full sm:w-auto"
                  >
                    Save &amp; publish
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPostPage;
