"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";

const columns = [
  {
    accessorKey: "country",
    header: "Country",
  },
  {
    accessorKey: "finalPrice",
    header: "Local Price",
  },
  {
    accessorKey: "currency",
    header: "Currency",
  },
  {
    accessorKey: "inverseRate",
    header: "Exchange Rate",
  },
  {
    accessorKey: "eurPrice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="p-bold-20"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Price EUR
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "url",
    header: "URL",
  },
];

const IkeaTable = ({ items }) => {
  const [sorting, setSorting] = useState([]);
  const table = useReactTable({
    data: items,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div>
      <Table>
        <TableCaption>Price comparision from every ikea store</TableCaption>
        <TableCaption>Exchange rates are daily updated</TableCaption>
        {/* <TableHeader>
          <TableRow className="p-bold-20">
            <TableHead>Country</TableHead>
            <TableHead>Local Price</TableHead>
            <TableHead>Currency</TableHead>
            <TableHead>Exchange Rate</TableHead>
            <TableHead>Price EUR</TableHead>
            <TableHead>URL</TableHead>
          </TableRow>
        </TableHeader> */}
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="p-bold-20">
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        {/* <TableBody>
          {items.map((ikea) => (
            <TableRow
              key={ikea.country}
              className={
                ikea.eurPrice === 0 ? "bg-red-100/50" : "bg-green-100/50"
              }>
              <TableCell>{ikea.country}</TableCell>
              <TableCell>{ikea.finalPrice}</TableCell>
              <TableCell>{ikea.currency}</TableCell>
              <TableCell>{ikea.inverseRate}</TableCell>
              <TableCell>{ikea.eurPrice}</TableCell>
              <TableCell>
                <Link href={ikea.url} rel="noopener noreferrer" target="_blank">
                  {ikea.url}
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody> */}
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow
              key={row.id}
              data-state={row.getIsSelected() && "selected"}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default IkeaTable;
