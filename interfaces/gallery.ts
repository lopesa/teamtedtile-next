export interface IGalleryItemsResponse {
  data: IGalleryItem[];
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
}
export interface IGalleryItem {
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
