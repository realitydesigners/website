import 'server-only';
import { draftMode } from 'next/headers';
import { client } from '@/sanity/lib/client';
import { homePageQuery, pagesBySlugQuery, projectBySlugQuery, settingsQuery, postsQuery, postsBySlugQuery, categoryQuery } from '@/sanity/lib/queries';
import { token } from '@/sanity/lib/token';
import { HomePagePayload, PagePayload, ProjectPayload, SettingsPayload, PostsPayload, CategoryPayload } from '@/types';
import { queryStore } from './createQueryStore';

// Initialize the client with the given configuration.
const serverClient = client.withConfig({
   token,
   useCdn: process.env.VERCEL_ENV === 'production',
});

// Set the server client for the query store to ensure server-side data fetching.
queryStore.setServerClient(serverClient);

// A utility function to handle common logic for load queries.
function loadSanityQuery<T>(query: string, params: Record<string, unknown> = {}, tags: string[]): Promise<T> {
   const perspective = draftMode().isEnabled ? 'previewDrafts' : 'published';
   const cache: RequestCache = serverClient.config().useCdn ? 'no-store' : 'force-cache';

   return queryStore
      .loadQuery<T>(query, params, {
         cache,
         next: { tags },
         perspective,
      })
      .then(response => response.data);
}

// Exported functions to load different types of data.
export const loadSettings = () => loadSanityQuery<SettingsPayload>(settingsQuery, {}, ['settings', 'home', 'page', 'project']);
export const loadHomePage = () => loadSanityQuery<HomePagePayload | null>(homePageQuery, {}, ['home', 'project']);
export const loadProject = (slug: string) => loadSanityQuery<ProjectPayload | null>(projectBySlugQuery, { slug }, [`project:${slug}`]);
export const loadPage = (slug: string) => loadSanityQuery<PagePayload | null>(pagesBySlugQuery, { slug }, [`page:${slug}`]);
export const loadPosts = () => loadSanityQuery<PostsPayload[]>(postsQuery, {}, ['posts']);
export const loadPostsPage = (slug: string) => loadSanityQuery<PostsPayload | null>(postsBySlugQuery, { slug }, [`posts:${slug}`]);
export const loadCategories = () => loadSanityQuery<CategoryPayload[]>(categoryQuery, {}, ['category']);

// Exporting types for external use (if needed).
