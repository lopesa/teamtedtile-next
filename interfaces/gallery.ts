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
  // id: number;
  attributes: {
    title: string;
    image: {
      data: {
        id: number;
        attributes: {
          name: string;
          url: string;
          width: number;
          height: number;
          alternativeText: string;
        };
      };
    };
    copyright?: string;
    tedHeadTextRich?: string;
    /**
     * @TODO
     * previous and next are just a hack to keep moving
     * I somehow need to pass the previous and next additions
     * on the backends through strapi's transformResponse
     * which I thinks adds the layer of id/attributes obj wrapper
     */
    previous: {
      copyright?: string;
      tedHeadTextRich?: string;
      title: string;
      image: {
        name: string;
        url: string;
        width: number;
        height: number;
        alternativeText: string;
      };
    } | null;
    next: {
      copyright?: string;
      tedHeadTextRich?: string;
      title: string;
      image: {
        name: string;
        url: string;
        width: number;
        height: number;
        alternativeText: string;
      };
    } | null;
  };
}
