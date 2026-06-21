import { getAdminCategories } from "@/app/actions/admin";
import CategoriesClient from "./client";

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.query as string | undefined;
  
  const categories = await getAdminCategories(query);
  
  return <CategoriesClient initialCategories={categories} />;
}
