const Post = ({ title, author, summary, cover, createdAt, _id, index = 0 }) => {
  const isEven = index % 2 === 0;

  return (
    <div
      className={`card card-side bg-base-100 shadow-sm ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <figure className="md:w-[220px]">
        <img
          src={cover}
          alt={title}
          className="h-full w-full object-cover"
        />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p className="text-sm text-gray-500">
          {author?.username} | {createdAt}
        </p>
        <p>{summary}</p>

        <div className="card-actions justify-end">
          <a href={`/post/${_id}`} className="btn btn-primary">
            More
          </a>
        </div>
      </div>
    </div>
  );
};

export default Post;
