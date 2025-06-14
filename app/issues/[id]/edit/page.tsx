"use client";
import { Issue } from "@/app/generated/prisma";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";
import IssueFormSkeleton from "./loading";
import { useEffect, useState } from "react";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const EditIssuePage = ({ params }: Props) => {
  const [id, setId] = useState<string | null>(null);

  useEffect(() => {
    params.then((p) => {
      setId(p.id);
    });
  }, [params]);

  const {
    data: issue,
    error,
    isLoading,
  } = useQuery<Issue>({
    queryKey: ["issue", id],
    queryFn: () => axios.get(`/api/issues/${id}`).then((res) => res.data),
    enabled: !!id, // wait until id is set
    staleTime: 1000 * 60, // 60s
    retry: 3,
  });

  if (isLoading) {
    return <IssueFormSkeleton />;
  }
  if (error) notFound();

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
