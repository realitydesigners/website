import 'server-only';
import { draftMode } from 'next/headers';
import { client } from '@/sanity/lib/client';
import { settingsQuery, postsQuery, postsBySlugQuery, categoryQuery, categoryBySlugQuery, getVideosQuery, getVideoBySlugQuery, teamQuery, teamBySlugQuery } from '@/sanity/lib/queries';
import { token } from '@/sanity/lib/token';
import { SettingsPayload, PostsPayload, CategoryPayload, VideoPayload, TeamPayload } from '@/types';
import * as queryStore from '@sanity/react-loader';

const serverClient = client.withConfig({
   token,
   stega: {
      enabled: process.env.VERCEL_ENV === 'preview',
   },
});

queryStore.setServerClient(serverClient);

const usingCdn = serverClient.config().useCdn;

export const loadQuery = ((query, params = {}, options = {}) => {
   const { perspective = draftMode().isEnabled ? 'previewDrafts' : 'published' } = options;

   const cacheMode = process.env.NODE_ENV === 'development' ? 'no-cache' : 'force-cache';
   const revalidate = !usingCdn && options.next?.tags ? false : usingCdn ? 1 : 0;

   return queryStore.loadQuery(query, params, {
      ...options,
      next: {
         revalidate,
         ...(options.next || {}),
      },
      perspective,
      cache: cacheMode,
   });
}) satisfies typeof queryStore.loadQuery;

// Settings
export const loadSettings = () => loadQuery<SettingsPayload>(settingsQuery, {}, { next: { tags: ['settings', 'home', 'page', 'project'] } });

// Posts
export const loadPosts = () => loadQuery<PostsPayload[]>(postsQuery, {}, { next: { tags: ['posts'] } });
export const loadPostsPage = (slug: string) => loadQuery<PostsPayload | null>(postsBySlugQuery, { slug }, { next: { tags: [`posts:${slug}`] } });

// Categories
export const loadCategories = () => loadQuery<CategoryPayload[]>(categoryQuery, {}, { next: { tags: ['category'] } });
export const loadCategorySlugPage = (slug: string) => loadQuery<CategoryPayload | null>(categoryBySlugQuery, { slug }, { next: { tags: [`category:${slug}`] } });

// Videos
export const loadVideos = () => loadQuery<VideoPayload[]>(getVideosQuery, {}, { next: { tags: ['video'] } });
export const loadVideoSlugPage = (slug: string) => loadQuery<VideoPayload | null>(getVideoBySlugQuery, { slug }, { next: { tags: [`video:${slug}`] } });

// Team
export const loadTeam = () => loadQuery<TeamPayload[]>(teamQuery, {}, { next: { tags: ['team'] } });
export const loadTeamSlugPage = (slug: string) => loadQuery<TeamPayload | null>(teamBySlugQuery, { slug }, { next: { tags: [`team:${slug}`] } });
