import { useState , useEffect, useContext} from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";
import PostService from "../services/post.service";

const PostDetail = () => {
  const {id} = useParams();
  const { userInfo } = useContext(UserContext);
  const nav = useNavigate();
  const [post, setPost] = useState(
    {
      _id: "",
      title: "",
      createdAt: "",
      content: "",
      summary: "",
      cover: "",
    }
  );
useEffect(()=> {
  const fetchPost = async () => {
    try {
      const response = await  PostService.getById(id);
      console.log(`response?.data: ${response}`)
      if (response.status === 200) {
        setPost(response?.data)
      }
    } catch (error) {
      Swal.fire({
        title: "PostDetail",
        icon: "error",
        text: error?.response?.data?.message || error?.message,
      })
    }
  }
  fetchPost();
  
},[id])

console.log(post)

  const handleDelete = async (id) => {
    try {
      const response = await PostService.deletePost(id)

      if (response?.status === 200) {
        Swal.fire({
          icon: "success",
          title: `Deleted ${post?.title}`,
          text: "This post has been deleted",
          confirmButtonText: "OK",
        }).then(() => {
          nav("/")
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาดในการเชื่อมต่อ",
        text:
          error.response?.data?.message ||
          error.message ||
          "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้",
        confirmButtonText: "ตกลง",
      });
    }
  };

  return (
    <div className="post-page min-h-full min-w-full items-center justify-center p-4 pt-20">
      <div className="bg-white p-8 rounded-b-lg shadow-lg max-4xl w-full">
        <h1 className="text-3xl font-bold mb-4 text-grey-800">{post.title}</h1>
        {post.summary}
        <div className="text-grey-600 mb-4 text-center">
          <time className="block mb-2">{post.createdAt}</time>
          <div className="author mb-2">
            <a href={`/author/${post?.author}`}>
            By <span className="text-blue-500">@{post?.author?.username}</span>
            </a>
          </div>
          {userInfo?.id === post?.author?._id && (
            <div className="edit-row mb-4 text-center flex items-center justify-center gap-2">
            <a className="btn btn-error" onClick={() => handleDelete(post._id)}>Delete </a>
            <a className="btn btn-warning" href={`/edit/${post._id}`}>edit</a>
          </div>
          )}
        </div>
        <div 
          className="content text-grey-700"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        <div className="flex justify-center w-full h-fit">
        <img src={post.cover}></img>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
