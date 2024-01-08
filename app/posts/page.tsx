import MainPost from "@/components/global/MainPost";
import PostsList from "@/components/global/PostsList";
import RightSideBar from "@/components/global/RightSideBar";
import SideBar from "@/components/global/SideBar";
import { PostsPayload } from "@/types";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
const PostPage: React.FC<any> = ({
	mainPostData,
	sidePostData,
	rightPostData,
	postsListData,
}) => {
	return (
		<>
			<div className="w-full pt-[80px] h-auto flex flex-cols px-2 lg:px-6 flex-wrap">
				<SideBar post={sidePostData} />
				<MainPost post={mainPostData} />
				<RightSideBar post={rightPostData} />
			</div>

			<div className="w-full flex h-auto flex-cols px-2 lg:px-6">
				<PostsList post={postsListData} />
			</div>
		</>
	);
};

export default PostPage;
