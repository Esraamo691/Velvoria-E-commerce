import ProductsList from "./productList";

export default async function Products({
  searchParams,
}: {
  searchParams?: Promise<{ category?: string; brand?: string }> | { category?: string; brand?: string };
}) {
  const resolvedParams = searchParams ? await Promise.resolve(searchParams) : {};
  const categoryId = resolvedParams?.category;
  const brandId = resolvedParams?.brand;

  let apiUrl = `https://ecommerce.routemisr.com/api/v1/products`;
  if (categoryId) {
    apiUrl = `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`;
  } else if (brandId) {
    apiUrl = `https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`;
  }

  const response = await fetch(apiUrl, {
    next: { revalidate: 10 * 60 },
  });

  const { data: products } = await response.json();

  return <ProductsList products={products} />;
}
