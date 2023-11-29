# Reality Designers

> Reality Designers is a collaborative platform aiming to create worlds from content, and stitch information together into 3D Immersive Enviroments.

## Project Structure

-  `app`: Frontend
-  `sanity`: Headless CMS schemas
-  This project uses Next.js 14 and Bun for package management. [Learn about Bun](https://bun.sh)

### Bun Commands

```shell
bun install
```

```shell
bun run build
```

```shell
bun run dev
```

# PortableTextComponent

`PortableTextComponent` is a React component designed for rendering rich text content using `@portabletext/react`, optimized for Next.js. It provides flexibility in content presentation through a variety of templates.

## Features

### Multiple Templates

-  **Diverse Style Options**: The component currently supports `light` and `team` templates, each tailored for specific content aesthetics. Plans are in place to expand this selection, catering to a broader range of design preferences and use cases.
-  **Adaptable Layouts**: Each template offers unique layouts and styling, ensuring content is presented in a way that best fits its context and purpose.

### Rich Text Rendering

-  **Versatile Content Handling**: This feature enables the rendering of a diverse array of content types, including textual content, images, hyperlinks, and referenced posts, providing a comprehensive solution for rich media displays.
-  **Dynamic Component Rendering**: Utilizes switch statements to determine the rendering style for each component. This approach allows for dynamic and context-specific presentation of content.
-  **Sanity Integration**: The rendering logic is closely integrated with Sanity's schema. Each piece of content's display attributes are derived directly from the schema definitions in Sanity, ensuring a seamless and consistent content management experience.
-  **Schema-Driven Design**: The component's behavior and appearance are dictated by the underlying Sanity schema. This design philosophy ensures that changes in the schema directly influence how content is presented, allowing for granular control over the appearance and structure of the rendered content.

### Highly Customizable

-  **Ease of Extension**: The architecture of `PortableTextComponent` is designed with extensibility in mind. It allows developers to easily add new templates or modify existing ones.
-  **Style Customization**: Developers have the flexibility to customize and apply unique styles to each template or component, enabling them to tailor the look and feel of their content to specific design requirements.
-  **Scalable Design Approach**: The component's design is scalable, supporting both small-scale modifications and significant stylistic overhauls, making it suitable for a wide range of projects from personal blogs to complex enterprise-level content systems.

## Usage

```typescript
import PortableTextComponent from '@/components/portabletext/PortableTextComponent';

// Example usage
<PortableTextComponent  content={contentBlock.content} template="light" />
```

-  `content`: An array of Portable Text blocks, required.
-  `template`: Specifies the rendering style, e.g., 'light', 'team'. Required.

## Templates

-  **Light**: Offers a minimalistic, light-themed layout.
-  **Team**: Ideal for professional-looking team pages.

## Customization and Expansion

The component is built with customization in mind, allowing for the easy addition of new templates to cater to various styling preferences and requirements.

## Requirements

-  React and Next.js environment.
-  `@portabletext/react` for Portable Text rendering.
