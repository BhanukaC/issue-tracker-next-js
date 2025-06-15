"use client";
import { Card } from "@radix-ui/themes";
import React from "react";
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from "recharts";

interface Props {
  open: number;
  closed: number;
  inProgress: number;
}

const IssueChart = (props: Props) => {
  const { open, closed, inProgress } = props;
  const data = [
    { name: "Open", count: open },
    { name: "Closed", count: closed },
    { name: "In Progress", count: inProgress },
  ];
  return (
    <Card>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Bar
            dataKey="count"
            barSize={60}
            style={{ fill: "var(--accent-9)" }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default IssueChart;
