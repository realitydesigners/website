import GlossaryList from "@/components/items/GlossaryList";
import { sanityFetch } from "@/sanity/lib/client";
import { glossaryQuery } from "@/sanity/lib/queries";
import { GlossaryPayload } from "@/types";

export default async function GlossaryPage() {
	const glossary: GlossaryPayload[] = await sanityFetch({
		query: glossaryQuery,
		tags: ["glossary"],
	});

	const glossaryItems = glossary.slice(0, 10);

	return (
		<main className="w-full h-screen flex justify-center items-center text-gray-200">
			<div>
				<GlossaryList glossary={glossaryItems} />
			</div>
		</main>
	);
}
