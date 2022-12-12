export interface GalleryImagesResponse {
  data: GalleryImage[];
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
}
export interface GalleryImage {
  id: number;
  attributes: {
    title: string;
    createdAt: string;
    description: string;
    image: {
      data: {
        id: number;
        attributes: {
          name: string;
          url: string;
          width: number;
          height: number;
        };
      };
    };
  };
}
