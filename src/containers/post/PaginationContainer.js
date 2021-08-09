import Pagination from "../../components/post/Pagination";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import qs from "qs";

const PaginationContainer = () => {
  const { username } = useParams();
  const { search } = useLocation();
  const { lastPage, posts, loading } = useSelector(({ posts, loading }) => ({
    lastPage: posts.lastPage,
    posts: posts.posts,
    loading: loading["posts/LIST_POSTS"],
  }));

  if (!posts || loading) return null;
  const { tag, page = 1 } = qs.parse(search, { ignoreQueryPrefix: true });

  return <Pagination tag={tag} username={username} page={parseInt(page, 10)} lastPage={lastPage} />;
};

export default PaginationContainer;
