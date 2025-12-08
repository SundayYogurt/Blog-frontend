import * as React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreatePostPage = () => {
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [coverImage, setCoverImage] = React.useState(null);

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files?.[0];
    setCoverImage(file || null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: แทนที่ด้วยการยิง API / mutation จริง
    console.log("Creating post...", { title, content, coverImage });
  };

  const handleReset = () => {
    setTitle("");
    setContent("");
    setCoverImage(null);
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
        <div className="flex flex-col gap-3 mb-8 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
            Create a new post
          </h1>
          <p className="text-base-content/70 max-w-2xl">
            Start a new article by adding a catchy title, an eye-catching cover image,
            and your content below.
          </p>
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
                    Recommended: 1200 × 630px • JPG / PNG
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
                          {/* ถ้าจะทำ preview จริง ๆ: ใช้ URL.createObjectURL(coverImage) กับ <img /> */}
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
                      No image selected yet.
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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <p className="text-xs text-base-content/60 mt-1">
                  Keep it short and descriptive. This will be shown in lists and SEO.
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
                  <ReactQuill
                    theme="snow"
                    value={content}
                    onChange={handleContentChange}
                    modules={modules}
                  />
                </div>

                <p className="text-xs text-base-content/60 mt-1">
                  Use headings, lists, and code blocks to structure your article.
                </p>
              </div>

              {/* Actions */}
              <div className="divider my-4" />

              <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
                <button
                  type="button"
                  className="btn btn-ghost md:w-auto w-full"
                  onClick={handleReset}
                >
                  Clear form
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
                    disabled={!title.trim() || !content.trim()}
                  >
                    Create post
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

export default CreatePostPage;
