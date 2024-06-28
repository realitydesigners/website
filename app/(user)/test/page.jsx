import Navbar from "@/components/navigation/Navbar";
import Spline from "@splinetool/react-spline/next";

export default function Home() {
	return (
		<main className="w-screen h-screen">
            <Navbar />
			<Spline scene="https://prod.spline.design/qrjFc6dwPfLWbNs6/scene.splinecode" />
		</main>
	);
}


