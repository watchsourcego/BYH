import { getAllProductDetails } from "@/data/productDetails";

export function productSlugStaticPaths() {
  return getAllProductDetails().map((product) => ({
    params: { slug: product.slug },
  }));
}
