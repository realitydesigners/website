import React from "react";

// Section Blocks
export const HeadingBlock = React.lazy(
	() => import("@/components/blocks/section/HeadingBlock"),
);
export const HeadingSplineBlock = React.lazy(
	() => import("@/components/blocks/section/HeadingSplineBlock"),
);
export const TeamBlock = React.lazy(
	() => import("@/components/blocks/section/TeamBlock"),
);
export const ContentBlock = React.lazy(
	() => import("@/components/blocks/section/ContentBlock"),
);

// Nested Blocks
export const AudioRefBlock = React.lazy(
	() => import("@/components/blocks/nested/AudioRefBlock"),
);
export const ImageRefBlock = React.lazy(
	() => import("@/components/blocks/nested/ImageRefBlock"),
);
export const PostsRefBlock = React.lazy(
	() => import("@/components/blocks/nested/PostsRefBlock"),
);
export const QuoteRefBlock = React.lazy(
	() => import("@/components/blocks/nested/QuoteRefBlock"),
);
export const SplineRefBlock = React.lazy(
	() => import("@/components/blocks/nested/SplineRefBlock"),
);
export const VideoRefBlock = React.lazy(
	() => import("@/components/blocks/nested/VideoRefBlock"),
);
export const InternalLink = React.lazy(
	() => import("@/components/blocks/nested/InternalLink"),
);
