"use client";
import { Select } from "@radix-ui/themes";
import React from "react";

import { Status } from "../generated/prisma";
import { useRouter, useSearchParams } from "next/navigation";

const statuses: { value?: Status | "none"; label: string }[] = [
  { label: "All", value: "none" },
  { value: "OPEN", label: "Open" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "CLOSED", label: "Closed" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <Select.Root
      onValueChange={(status) => {
        const params = new URLSearchParams();
        if (status !== "none" && status) {
          params.append("status", status);
        }
        if (searchParams.get("orderBy")) {
          params.append("orderBy", searchParams.get("orderBy")!);
        }
        const query = params.size ? `?${params.toString()}` : "";
        router.push(`/issues${query}`);
      }}
      value={
        searchParams && searchParams.get("status")
          ? searchParams.get("status")!
          : "none"
      }
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((status) => (
          <Select.Item key={status.label} value={status.value || "none"}>
            {status.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
};

export default IssueStatusFilter;
