import { useRouter } from "next/router";
import Link from "next/link";

export default function GalleryItem() {
  const router = useRouter();
  const galleryItem = router.query.galleryItem as string;

  return (
    <>
      <h1>gallery item: {galleryItem}</h1>
    </>
  );
}
