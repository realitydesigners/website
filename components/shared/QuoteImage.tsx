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

export default function QuoteImage({ image, alt = 'Cover image', width = 1500, height = 1500, classesWrapper, ...props }: ImageBoxProps) {
   const imageUrl = image && urlForImage(image)?.height(height).width(width).fit('crop').url();

   return (
      <div className={`w-full h-full  ${classesWrapper}`} data-sanity={props['data-sanity']}>
         {imageUrl && <Image priority={true} className="object-cover cover bg-white  h-full w-full" alt={alt} width={width} height={height} src={imageUrl} />}
      </div>
   );
}
