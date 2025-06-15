import prisma from "@/prisma/client";
import { Status } from "../generated/prisma";
import IssueActions from "./IssueActions";

import Pagination from "../components/Pagination";
import IssueTable, { columnNames, IssueQuery } from "./IssueTable";
import { Flex } from "@radix-ui/themes";
import { Metadata } from "next";

interface Props {
  searchParams: Promise<IssueQuery>;
}

const IssuesPage = async (props: Props) => {
  const searchParams = await props.searchParams;
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const where = status ? { status } : undefined;
  const orderBy = searchParams.orderBy
    ? columnNames.includes(searchParams.orderBy)
    : false;
  const orderByValue = orderBy ? { [searchParams.orderBy!]: "asc" } : undefined;

  const page = parseInt(searchParams.page || "1");
  const pageSize = 10; // Define your page size

  const issues = await prisma.issue.findMany({
    where,
    orderBy: orderByValue,
    skip: (page - 1) * pageSize, // Skip items for pagination
    take: pageSize, // Limit the number of items per page
  });

  const issueCount = await prisma.issue.count({
    where,
  });

  return (
    <Flex direction="column" gap="4">
      <IssueActions />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </Flex>
  );
};
export const dynamic = "force-dynamic"; // Force dynamic rendering for this page
// export const revalidate = 0; // Disable revalidation for this page
export default IssuesPage;

export const metadata: Metadata = {
  title: "Issue Tracker - Issue List",
  description: "View all issues and their statuses",
};
