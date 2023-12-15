import "@/app/global.css";
import { SignIn, RedirectToSignIn } from "@clerk/nextjs";

export default function SignInPage() {
	return (
		<div className="w-full flex lg:flex-row flex-col h-screen">
			<div className="hidden bg-gray-400 p-2 h-auto justify-center items-center  lg:flex lg:w-1/2">
				<p className="hidden">Animation Goes Here</p>
			</div>
			<div className="w-full flex justify-center items-center h-screen lg:h-auto  lg:pr-6 bg-gray-300 lg:w-1/2">
				<RedirectToSignIn redirectUrl="https://realitydesigners.tv/sign-in" />
				<SignIn />
			</div>
		</div>
	);
}
