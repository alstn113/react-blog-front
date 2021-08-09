import HeaderContainer from "../containers/common/HeaderContainer";
import PostViewerContainer from "../containers/post/PostViewerContainer";
import { Helmet } from "react-helmet-async";
const PostPage = () => {
  return (
    <>
      <Helmet>
        <title>포스트 - REACTERS</title>
      </Helmet>
      <HeaderContainer />
      <PostViewerContainer />
    </>
  );
};

export default PostPage;
