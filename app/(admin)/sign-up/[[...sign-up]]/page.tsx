import "@/app/global.css";
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
	return (
		<div className=" relative flex h-screen w-full flex-wrap items-center justify-center">
			<div className=" relative flex hidden h-full items-center justify-center bg-black lg:flex lg:w-3/5" />
			<div className="flex h-full w-[95vw] items-center justify-center bg-black pt-12 lg:w-2/5">
				<div className=" relative flex  w-full overflow-hidden bg-black p-0 lg:p-[32px]">
					<div className=" absolute  top-0 flex h-8 w-full bg-black " />
					<div className=" absolute bottom-0 z-[999]  -mb-[5px] flex h-[40px] w-[100vw] bg-black lg:mb-[29px]   " />
					<div className=" xs:w-[30px] absolute left-0 z-[999] ml-0 flex h-full w-0 bg-black lg:ml-8 " />
					<div className=" z-[1] flex w-full bg-black">
						<SignUp />
					</div>
				</div>
			</div>
		</div>
	);
}
