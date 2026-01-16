import React, { useRef, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import PostService from "../services/post.service";
import Editor from "../components/Editor";

const CreatePost = () => {
  const navigate = useNavigate();
  const editorRef = useRef(null);

  const [postDetail, setPostDetail] = useState({
    title: "",
    summary: "",
    content: "",
    cover: null, // File
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "cover") {
      setPostDetail((prev) => ({ ...prev, cover: files?.[0] ?? null }));
      return;
    }

    setPostDetail((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentChange = (value) => {
    setPostDetail((prev) => ({ ...prev, content: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, summary, content, cover } = postDetail;

    // validate ก่อน
    if (!title.trim() || !summary.trim() || !content?.trim()) {
      Swal.fire({
        title: "Error",
        icon: "warning",
        text: "กรุณากรอกข้อมูลให้ครบ",
      });
      return;
    }

    if (!cover) {
      Swal.fire({
        title: "Error",
        icon: "warning",
        text: "กรุณาอัปโหลดรูปภาพ (cover)",
      });
      return;
    }

    try {
      const data = new FormData();
      data.append("title", title);
      data.append("summary", summary);   
      data.append("content", content);
      data.append("cover", cover);       

      const response = await PostService.createPost(data);

      if (response.status === 200 || response.status === 201) {
        await Swal.fire({
          title: "Create Post",
          text: "Create post Successfully",
          icon: "success",
        });

        setPostDetail({
          title: "",
          summary: "",
          content: "",
          cover: null,
        });

        navigate("/");
      }
    } catch (error) {
      await Swal.fire({
        title: "Create Post Failed",
        icon: "error",
        text: error?.response?.data?.message || error?.message || "Request failed",
      });
      console.error("Create post error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center from-[#8B4DFF] to-[#3A8DFF] p-4">
      <div className="w-full h-full bg-white rounded-lg shadow-xl p-8 truncate">
        <h1 className="text-2xl font-semibold text-center mb-8">
          Create New Post
        </h1>

        <form className="space-y-6 h-full" onSubmit={handleSubmit}>
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={postDetail.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Post title"
            />
          </div>

          {/* Summary */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Summary
            </label>
            <input
              type="text"
              name="summary"
              value={postDetail.summary}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Short summary"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <Editor
              name="content"
              ref={editorRef}
              value={postDetail.content}
              onChange={handleContentChange}
            />
          </div>

          {/* Upload cover */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Upload Cover (required)
            </label>
            <input
              type="file"
              name="cover"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-sm"
            />
            {postDetail.cover && (
              <p className="text-xs text-gray-500 mt-1">
                Selected: {postDetail.cover.name}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md"
          >
            Create Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
