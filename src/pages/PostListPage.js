import HeaderContainer from "../containers/common/HeaderContainer";
import PostListContainer from "../containers/post/PostListCotainer";
import PaginationContainer from "../containers/post/PaginationContainer";
import { Helmet } from "react-helmet-async";

const PostListPage = () => {
  return (
    <>
      <Helmet>
        <title>글 리스트 - REACTERS</title>
      </Helmet>
      <HeaderContainer />
      <PostListContainer />
      <PaginationContainer />
    </>
  );
};

export default PostListPage;
