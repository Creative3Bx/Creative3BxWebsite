import Post from "@layouts/partials/Post";

const RelatedPosts = ({ posts }) => {
  return (
    <div className="container mt-20">
      <h2 className="section-title">Related Posts</h2>
      <div className="row mt-16">
        {posts.slice(0, 3).map((post, index) => (
          <div key={post.slug} className="mb-12 lg:col-4">
            <Post post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedPosts;
