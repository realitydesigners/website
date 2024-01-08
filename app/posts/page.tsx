import MainPost from "@/components/global/MainPost";
import PostsList from "@/components/global/PostsList";
import RightSideBar from "@/components/global/RightSideBar";
import SideBar from "@/components/global/SideBar";
import { PostsPayload } from "@/types";

interface PostPageProps {
	mainPostData: PostsPayload;
	sidePostData: PostsPayload[];
	rightPostData: PostsPayload[];
	postsListData: PostsPayload[];
}

const PostPage: React.FC<PostPageProps> = ({
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
