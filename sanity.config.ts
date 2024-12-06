"use client";
import { theme } from "https://themer.sanity.build/api/hues?default=darkest:000000&primary=59595f;600;lightest:e3e3e3&transparent=7d838c";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import {
  contentBlock,
  headingBlock,
  headingSplineBlock,
  imageCanvasBlock,
  teamBlock,
} from "@/sanity/blocks/index";
import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/lib/api";
import {
  audio,
  category,
  glossary,
  img,
  library,
  model,
  posts,
  quote,
  team,
  video,
} from "@/sanity/schemas";
import { myTheme } from "@/sanity/ui/theme";

import { CustomItem } from "@/sanity/ui/CustomItem";
import { CustomField } from "@/sanity/ui/CustomField";

import { vercelDeployTool } from "sanity-plugin-vercel-deploy";

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE || "Reality Designers";

export default defineConfig({
  basePath: studioUrl,
  projectId: projectId || "",
  dataset: dataset || "",
  title,
  schema: {
    types: [
      posts,
      img,
      audio,
      video,
      quote,
      team,
      category,
      library,
      model,
      glossary,
      headingBlock,
      headingSplineBlock,
      contentBlock,
      teamBlock,
      imageCanvasBlock,
    ],
  },
  form: {
    components: {
      item: CustomItem,
      field: CustomField,
    },
  },
  theme: myTheme,
  plugins: [
    structureTool({}),

    visionTool({ defaultApiVersion: apiVersion }),
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    vercelDeployTool() as any,
  ],
});
