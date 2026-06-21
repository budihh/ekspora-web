import { getAdminInquiries } from "@/app/actions/admin";
import InquiriesClient from "./client";

export default async function InquiriesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.query as string | undefined;
  const status = resolvedSearchParams.status as string | undefined;

  const inquiries = await getAdminInquiries(query, status);
  
  return <InquiriesClient initialInquiries={inquiries} />;
}
