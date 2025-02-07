import { AspectRatio } from "./ui/aspect-ratio";
import { Card, CardContent } from "./ui/card";

interface ImageItem {
  id: string;
  imageUrl: string;
  prompt: string;
  settings?: string;
  model?: string;
}

interface ImageGalleryProps {
  images?: ImageItem[];
}

export default function ImageGallery({
  images = defaultImages,
}: ImageGalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {images.map((image) => (
        <Card key={image.id} className="overflow-hidden bg-white">
          <AspectRatio ratio={1}>
            <img
              src={image.imageUrl}
              alt={image.prompt}
              className="object-cover w-full h-full"
            />
          </AspectRatio>
          <CardContent className="p-4">
            <p className="font-medium mb-2 line-clamp-2">{image.prompt}</p>
            {image.model && (
              <p className="text-sm text-muted-foreground">
                Model: {image.model}
              </p>
            )}
            {image.settings && (
              <p className="text-sm text-muted-foreground mt-1">
                Settings: {image.settings}
              </p>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

const defaultImages: ImageItem[] = [
  {
    id: "1",
    imageUrl: "https://images.unsplash.com/photo-1699894695287-01951e7ad3b4",
    prompt: "A serene mountain landscape at sunset",
    model: "Stable Diffusion XL",
    settings: "Steps: 50, CFG: 7.5",
  },
  {
    id: "2",
    imageUrl: "https://images.unsplash.com/photo-1699839198177-9c9b1551b2c3",
    prompt: "Futuristic cityscape with flying vehicles",
    model: "Midjourney V5",
    settings: "Steps: 45, CFG: 8.0",
  },
  {
    id: "3",
    imageUrl: "https://images.unsplash.com/photo-1699803968858-2068c88275e2",
    prompt: "Abstract digital art with vibrant colors",
    model: "DALL-E 3",
    settings: "High resolution, Vivid style",
  },
];
