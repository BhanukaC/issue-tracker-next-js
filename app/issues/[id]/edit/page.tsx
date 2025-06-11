'use client';
import { Issue } from '@/app/generated/prisma';
import axios from 'axios';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';
import IssueFormSkeleton from './loading';


interface Props{
    params: Promise<{
        id: string;
    }>;
}

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
    ssr: false,
  loading: () => <IssueFormSkeleton />,
});


const EditIssuePage = ({ params }: Props) => {
    const [issue, setIssue] = useState<Issue | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchIssue = async () => {
        try {
            const response = await axios.get(`/api/issues/${(await params).id}`);
            if (!response.data) {
                notFound();
                return;
            }
            setIssue(response.data);
        } catch (error) {
            notFound();
        } finally {
            setLoading(false);
            if( !issue) {
                notFound();
            }
        }
    };

    useEffect(() => {
        fetchIssue();
    }, []);

    if (loading) {
        return <IssueFormSkeleton />;
    }
    if(!issue) notFound();

    return (
        <IssueForm issue={issue!} />
    );
}

export default EditIssuePage