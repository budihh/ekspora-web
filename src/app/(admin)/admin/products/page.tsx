import { getAdminProducts, getAdminCategories } from "@/app/actions/admin";
import ProductsClient from "./client";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.query as string | undefined;
  const category = resolvedSearchParams.category as string | undefined;

  const products = await getAdminProducts(query, category);
  const categories = await getAdminCategories();
  
  return <ProductsClient initialProducts={products} categories={categories} />;
}
