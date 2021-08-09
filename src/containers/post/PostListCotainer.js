import { useSelector, useDispatch } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import qs from "qs";
import PostList from "../../components/post/PostList";
import { listPosts } from "../../modules/posts";

const PostListContainer = () => {
  const dispatch = useDispatch();
  const { posts, error, loading, user } = useSelector(({ posts, loading, user }) => ({
    posts: posts.posts,
    error: posts.error,
    loading: loading["posts/LIST_POSTS"],
    user: user.user,
  }));
  const { username } = useParams();
  const { search } = useLocation();

  useEffect(() => {
    const { tag, page } = qs.parse(search, { ignoreQueryPrefix: true });
    dispatch(listPosts({ tag, username, page }));
  }, [dispatch, search, username]);
  return <PostList loading={loading} error={error} posts={posts} showWriteButton={user} />;
};

export default PostListContainer;
