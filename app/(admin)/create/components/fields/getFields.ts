import {
  TextField,
  TextAreaField,
  ImageField,
  AudioField,
  ReferenceField,
} from ".";
import type { ImageDocument } from "@/sanity/schemas/img";
import type { AudioDocument } from "@/sanity/schemas/audio";

export interface Field {
  name: keyof SchemaType;
  type: string;
  title: string;
  description?: string;
  component: any;
  options?: any;
}

const fieldComponents: Record<string, any> = {
  string: TextField,
  text: TextAreaField,
  image: ImageField,
  file: AudioField,
  reference: ReferenceField,
};

type SchemaType = ImageDocument | AudioDocument;
type SchemaTypes = {
  img: ImageDocument;
  audio: AudioDocument;
};

// Map schema types to their field configurations
const schemaFieldConfigs: Record<
  keyof SchemaTypes,
  Record<string, Partial<Field>>
> = {
  img: {
    title: {
      type: "string",
      title: "Title",
      component: fieldComponents.string,
    },
    image: {
      type: "image",
      title: "Image",
      component: fieldComponents.image,
    },
    alt: {
      type: "string",
      title: "Alt Text",
      description: "Alternative text for accessibility",
      component: fieldComponents.string,
    },
    team: {
      type: "reference",
      title: "Team Member",
      description: "Credit the team member who created this",
      component: fieldComponents.reference,
    },
  },
  audio: {
    title: {
      type: "string",
      title: "Title",
      description: "Title of the audio track",
      component: fieldComponents.string,
    },
    description: {
      type: "text",
      title: "Description",
      description: "A short description of this audio file",
      component: fieldComponents.text,
    },
    audioFile: {
      type: "file",
      title: "Audio File",
      description: "Upload the audio file",
      component: fieldComponents.file,
      options: { accept: "audio/*" },
    },
    team: {
      type: "reference",
      title: "Team Member",
      description: "Credit the team member who created this",
      component: fieldComponents.reference,
    },
  },
};

export function getFields(type: keyof SchemaTypes): Field[] {
  const config = schemaFieldConfigs[type];
  if (!config) return [];

  // Convert the config into an array of fields
  return Object.entries(config).map(([name, field]) => ({
    name: name as keyof SchemaType,
    ...field,
  })) as Field[];
}
