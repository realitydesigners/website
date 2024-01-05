import type { PortableTextBlock } from "@portabletext/types";

interface BaseItem {
	_id: string;
	_type: string;
	title: string;
	slug?: {
		_type: string;
		current: string;
	};
}

export interface Image {
	image?: {
		_id: string;
		_key?: string;
		_type?: string;
		alt?: string;
		asset: {
			_key?: string;
			_type?: string;
			url: string;
		};
	};

	_key?: string;
	_id?: string;
	_type?: string;
	alt?: string;
	block?: Array<BlockItem>;
	slug?: {
		_type: string;
		current: string;
	};
}

export interface TeamMember {
	_id?: string;
	_type?: string;
	name: string;
	role: string;
	image: Image;
	shortBio: string;
}

export interface MediaRef {
	layout?: string;
	image?: Image;
}

export interface BlockItem {
	_id: string;
	_key?: string;
	_type: string;
	heading?: string;
	subheading?: string;
	image?: Image;
	tags?: string[];
	layout?: string;
	title?: string;
	publicationDate?: string;
	team?: TeamMember;
	media?: any; // Adjust based on actual media content
	videoRefData?: Array<VideoPayload>; // Simplify as per your requirement
	audioRefData?: any; // Simplify as per your requirement
	quote?: {
		_key?: string;
		_type?: string;
		quote: string;
		mediaRef?: MediaRef;
	};
	markDefs?: any; // Simplify as per your requirement
	postsRef?: any; // Simplify as per your requirement
	content?: PortableTextBlock[];
}

export interface PostsPayload extends BaseItem {
	publicationDate?: string;
	excerpt?: string;
	image?: Image;
	block?: Array<BlockItem>;
	content?: PortableTextBlock[];
	ogImage?: Image;
	_createdAt: string;
}

export interface CategoryPayload extends BaseItem {
	category?: string;
	isMain?: boolean;
	model?: {
		file?: any; // Replace 'any' with the appropriate type if known
	};
	sceneIdentifier?: string;
	subCategories?: SubCategoryPayload[];
}

export interface SubCategoryPayload extends BaseItem {
	isMain?: boolean;
	sceneIdentifier?: string;
	model?: {
		file?: any;
		l;
	};
	refPosts?: PostsPayload[];
}

export interface VideoPayload extends BaseItem {
	url: string;
	image?: {
		_key?: string;
		_type?: string;
		alt?: string;
		asset: {
			_key?: string;
			_type?: string;
			url: string;
		};
	};
	video: any;
	subcategories: Array<{
		name: string;
		title: string;
	}>;
	content?: Array<any>;
	block?: Array<BlockItem>;
	position: number;
	rotationY: number;
	_createdAt: string;
}

export interface TeamPayload extends BaseItem {
	name: string;
	role: string;
	shortBio: string;
	block?: Array<BlockItem>;
	content?: PortableTextBlock[];
	slug: {
		_type: string;
		current: string;
	};
	bio?: PortableTextBlock[];
	image?: Image;
	scene?: string;
	instagram?: string;
	twitter?: string;
	website?: string;
	tiktok?: string;
}
