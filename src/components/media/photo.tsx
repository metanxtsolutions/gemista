import Image from "next/image";
import { cn } from "@/lib/utils";
import { Photo as PhotoData } from "@/lib/data/photos";

export function Photo({
  photo,
  className,
  imgClassName,
  priority,
  sizes = "(min-width: 1024px) 33vw, 100vw",
}: {
  photo: PhotoData;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-ivory", className)}>
      <Image
        src={photo.url}
        alt={photo.alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover", imgClassName)}
      />
    </div>
  );
}
