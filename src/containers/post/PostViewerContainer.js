import { useEffect } from "react";
import PostViewer from "../../components/post/PostViewer";
import { useSelector, useDispatch } from "react-redux";
import { readPost, unloadPost } from "../../modules/post";
import { useHistory, useParams } from "react-router-dom";
import PostActionButtons from "../../components/post/PostActionButtons";
import { setOriginalPost } from "../../modules/write";
import { removePost } from "../../lib/api/post";

const PostViewerContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { postId } = useParams();
  const { post, error, loading, user } = useSelector(({ post, loading, user }) => ({
    post: post.post,
    error: post.error,
    loading: loading["post/READ_POST"],
    user: user.user,
  }));

  useEffect(() => {
    dispatch(readPost(postId));
    return () => {
      dispatch(unloadPost());
    };
  }, [dispatch, postId]);

  const onEdit = () => {
    dispatch(setOriginalPost(post));
    history.push("/write");
  };

  const onRemove = async () => {
    try {
      await removePost(postId);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const ownPost = (user && user._id) === (post && post.user._id);

  return (
    <PostViewer post={post} title={loading} error={error} actionButtons={ownPost && <PostActionButtons onEdit={onEdit} onRemove={onRemove} />} />
  );
};

export default PostViewerContainer;
