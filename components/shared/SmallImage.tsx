import Image from 'next/image';

import { urlForImage } from '@/sanity/lib/utils';

interface ImageBoxProps {
   image?: { asset?: any };
   alt?: string;
   width?: number;
   height?: number;
   size?: string;
   classesWrapper?: string;
   'data-sanity'?: string;
}

export default function SmallImage({ image, alt = 'Cover image', width = 600, height = 450, size = '100vw', classesWrapper, ...props }: ImageBoxProps) {
   const imageUrl = image && urlForImage(image)?.height(height).width(width).fit('crop').url();

   return (
      <div className={`w-full overflow-hidden ${classesWrapper}`} data-sanity={props['data-sanity']}>
         {imageUrl && <Image priority={true} className="object-cover cover h-full w-full" alt={alt} width={width} height={height} sizes={size} src={imageUrl} />}
      </div>
   );
}
