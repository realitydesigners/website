import { loadCategories } from "@/sanity/loader/loadQuery";
import LibraryScene from "@/components/library/LibraryScene";

export default async function CategoryPage() {
	const response = await loadCategories();
	const categories = response.data;
	return (
		<div className="w-screen h-screen bg-gray-200">
			<LibraryScene category={categories} />
		</div>
	);
}
