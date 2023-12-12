import 'server-only';
import { draftMode } from 'next/headers';
import { client } from '@/sanity/lib/client';
import { homePageQuery, pagesBySlugQuery, projectBySlugQuery, settingsQuery, postsQuery, postsBySlugQuery, categoryQuery, categoryBySlugQuery, getVideosQuery, getVideoBySlugQuery, teamQuery, teamBySlugQuery } from '@/sanity/lib/queries';
import { token } from '@/sanity/lib/token';
import { PagePayload, SettingsPayload, PostsPayload, CategoryPayload, VideoPayload, TeamPayload } from '@/types';
import { queryStore } from './createQueryStore';

const serverClient = client.withConfig({
   token,
   useCdn: process.env.VERCEL_ENV === 'production',
});

// Set the server client for the query store to ensure server-side data fetching.
queryStore.setServerClient(serverClient);

// A utility function to handle common logic for load queries.
// Assuming that the loadQuery function only accepts an object with a perspective property.
function loadSanityQuery<T>(query: string, params: Record<string, unknown>, tags: string[]): Promise<T> {
   const perspective = draftMode().isEnabled ? 'previewDrafts' : 'published';

   return queryStore
      .loadQuery<T>(query, params, {
         perspective,
      })
      .then(response => response.data);
}

export const loadSettings = () => loadSanityQuery<SettingsPayload>(settingsQuery, {}, ['settings', 'home', 'page', 'project']);
export const loadPage = (slug: string) => loadSanityQuery<PagePayload | null>(pagesBySlugQuery, { slug }, [`page:${slug}`]);

// Postsxs
export const loadPosts = () => loadSanityQuery<PostsPayload[]>(postsQuery, {}, ['posts']);
export const loadPostsPage = (slug: string) => loadSanityQuery<PostsPayload | null>(postsBySlugQuery, { slug }, [`posts:${slug}`]);

// Categories
export const loadCategories = () => loadSanityQuery<CategoryPayload[]>(categoryQuery, {}, ['category']);
export const loadCategorySlugPage = (slug: string) => loadSanityQuery<CategoryPayload | null>(categoryBySlugQuery, { slug }, [`category:${slug}`]);

// Videos
export const loadVideos = () => loadSanityQuery<VideoPayload[]>(getVideosQuery, {}, ['video']);
export const loadVideoSlugPage = (slug: string) => loadSanityQuery<VideoPayload | null>(getVideoBySlugQuery, { slug }, [`video:${slug}`]);

// Team
export const loadTeam = () => loadSanityQuery<TeamPayload[]>(teamQuery, {}, ['team']);
export const loadTeamSlugPage = (slug: string) => loadSanityQuery<TeamPayload | null>(teamBySlugQuery, { slug }, [`team:${slug}`]);
