import Base from "@layouts/Baseof";
import { markdownify, slugify } from "@lib/utils/textConverter";
import Post from "@partials/Post";
import { useSearchContext } from "context/state";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const SearchPage = () => {
  const router = useRouter();
  const { query } = router;
  const keyword = slugify(query.key || "");
  const { posts } = useSearchContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // When the search results are calculated and the component updates,
    // the loading should be considered complete.
    setIsLoading(false);

    // If the user navigates away, ensure loading is reset.
    const handleRouteChange = () => setIsLoading(true);
    router.events.on("routeChangeStart", handleRouteChange);

    return () => router.events.off("routeChangeStart", handleRouteChange);
  }, [keyword, posts, router.events]);

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
    <Base title={`Search results for ${query.key}`} isLoading={isLoading}>
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
