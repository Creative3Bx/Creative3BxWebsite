import Base from "@layouts/Baseof";
import { getSinglePage } from "@lib/contentParser";
import { markdownify, slugify } from "@lib/utils/textConverter";
import Post from "@partials/Post";
import { useSearchContext } from "context/state";
import { useRouter } from "next/router";

const SearchPage = () => {
  const router = useRouter();
  const { query } = router;
  const keyword = slugify(query.key || "");
  const { posts } = useSearchContext();

  const searchResults = posts.filter((post) => {
    // Always check for frontmatter existence
    if (!post.frontmatter || post.frontmatter.draft) {
      return false;
    }

    const { title, categories } = post.frontmatter;
    const { content } = post;

    // 1. Search in Title (if it exists)
    if (title && slugify(title).includes(keyword)) {
      return true;
    }

    // 2. Search in Categories (if they exist)
    if (
      categories &&
      categories.find(
        (category) => category && slugify(category).includes(keyword)
      )
    ) {
      return true;
    }

    // 3. Search in Content (if it exists)
    if (content && slugify(content).includes(keyword)) {
      return true;
    }

    return false;
  });

  return (
    <Base title={`Search results for ${query.key}`}>
      <div className="section">
        <div className="container">
          <h1 className="h2 mb-8 text-center">
            Search results for <span className="text-red-700">{query.key}</span>
          </h1>
          {searchResults.length > 0 ? (
            <div className="row">
              {searchResults.map((post, i) => (
                <div key={`key-${i}`} className="col-12 mb-8 sm:col-6">
                  <Post post={post} />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-24 text-center text-h3 shadow">
              No Search Found
            </div>
          )}
        </div>
      </div>
    </Base>
  );
};

export default SearchPage;
