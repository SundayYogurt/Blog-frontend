import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import PostService from "../services/post.service";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState({
    title: "",
    summary: "",
    content: "",
    cover: "", // ✅ URL
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true);
        const res = await PostService.getById(id);
        if (res.status === 200) {
          const p = res.data;
          setPost({
            title: p?.title ?? "",
            summary: p?.summary ?? "",
            content: p?.content ?? "",
            cover: p?.coverUrl ?? p?.cover ?? "",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "EditPost",
          icon: "error",
          text: error?.response?.data?.message || error?.message,
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!post.title.trim() || !post.summary.trim() || !post.content.trim()) {
      Swal.fire({
        title: "EditPost",
        icon: "warning",
        text: "กรอก Title / Summary / Content ให้ครบ",
      });
      return;
    }

    try {
      setIsSubmitting(true);

      // ✅ ส่ง JSON ปกติ
      const res = await PostService.updatePost(id, post);

      if (res.status === 200) {
        Swal.fire({
          title: "Success",
          text: res?.data?.message || "Post updated successfully",
          icon: "success",
          timer: 1600,
          showConfirmButton: false,
        });

        setTimeout(() => navigate(`/post/${id}`), 1600);
      }
    } catch (error) {
      Swal.fire({
        title: "Update Failed",
        text: error?.response?.data?.message || error?.message,
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="p-8 text-white">Loading...</div>;

  const isValidUrl = (url) => {
    try {
      if (!url) return false;
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#911D1D] via-[#6B2AAE] to-[#1B1B3A]">
      <div className="mx-auto max-w-5xl px-4 py-10">
        {/* Top bar */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Edit Post</h1>
            <p className="text-white/70 text-sm">
              ปรับแก้โพสต์ของคุณให้สมบูรณ์ก่อนกดอัปเดต
            </p>
          </div>

          <button
            type="button"
            className="btn btn-ghost text-white hover:bg-white/10"
            onClick={() => navigate(-1)}
          >
            ← Back
          </button>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white/95 shadow-2xl ring-1 ring-black/5 backdrop-blur">
          <form onSubmit={handleSubmit} className="p-6 md:p-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
              {/* Left */}
              <div className="md:col-span-7 space-y-5">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-800">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="title"
                    value={post.title}
                    onChange={onChange}
                    type="text"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                    placeholder="ใส่หัวข้อโพสต์"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-800">
                    Summary <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="summary"
                    value={post.summary}
                    onChange={onChange}
                    type="text"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                    placeholder="สรุปสั้น ๆ"
                  />
                  <div className="mt-1 flex justify-between text-xs text-gray-500">
                    <span>สรุปใจความภายใน 1–2 บรรทัด</span>
                    <span>{post.summary.length}/180</span>
                  </div>
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-800">
                    Content <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="content"
                    value={post.content}
                    onChange={onChange}
                    className="min-h-[220px] w-full resize-y rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                    placeholder="เขียนเนื้อหาบทความของคุณ..."
                  />
                </div>
              </div>

              {/* Right */}
              <div className="md:col-span-5 space-y-5">
                {/* Cover URL */}
                <div className="rounded-2xl border border-gray-200 bg-white p-4">
                  <h3 className="text-sm font-semibold text-gray-800 mb-2">
                    Cover Image URL
                  </h3>

                  <input
                    name="cover"
                    value={post.cover}
                    onChange={onChange}
                    type="text"
                    placeholder="https://.../image.jpg"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
                  />

                  <div className="mt-3 overflow-hidden rounded-xl border border-dashed border-gray-300 bg-gray-50">
                    {isValidUrl(post.cover) ? (
                      <img
                        src={post.cover}
                        alt="cover preview"
                        className="h-[220px] w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="flex h-[220px] items-center justify-center text-xs text-gray-500 px-4 text-center">
                        ใส่ URL ที่ถูกต้องเพื่อแสดงตัวอย่างรูป
                      </div>
                    )}
                  </div>

                  <p className="mt-2 text-xs text-gray-500">
                    แนะนำ: ใช้ลิงก์ตรงของรูป (ลงท้าย .jpg/.png) จะขึ้น preview ง่ายสุด
                  </p>
                </div>

                {/* Actions */}
                <div className="rounded-2xl border border-gray-200 bg-white p-4">
                  <div className="space-y-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Updating..." : "Update"}
                    </button>

                    <button
                      type="button"
                      className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                      onClick={() => navigate(-1)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>

                {/* Mini info */}
                <div className="rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 p-4 ring-1 ring-indigo-100">
                  <div className="text-sm font-semibold text-gray-800">
                    Checklist ก่อนอัปเดต
                  </div>
                  <ul className="mt-2 list-disc pl-5 text-xs text-gray-600 space-y-1">
                    <li>หัวข้อสื่อความหมายชัดเจน</li>
                    <li>Summary กระชับ อ่านแล้วอยากกด</li>
                    <li>เนื้อหาแบ่งย่อหน้า อ่านง่าย</li>
                    <li>Cover URL เป็นลิงก์รูปจริง</li>
                  </ul>
                </div>
              </div>
            </div>
          </form>
        </div>

        <div className="mt-6 text-center text-xs text-white/60">
          SE NPRU BLOG • Edit post page
        </div>
      </div>
    </div>
  );
};

export default EditPost;
