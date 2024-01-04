import React from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const IkeaTable = ({ items }) => {
  return (
    <div>
      <Table>
        <TableCaption>Price comparision from every ikea store</TableCaption>
        <TableCaption>Exchange rates are daily updated</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Country</TableHead>
            <TableHead>Local Price</TableHead>
            <TableHead>Currency</TableHead>
            <TableHead>Exchange Rate</TableHead>
            <TableHead>Price EUR</TableHead>
            <TableHead>URL</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((ikea) => (
            <TableRow key={ikea.country}>
              <TableCell>{ikea.country}</TableCell>
              <TableCell>{ikea.finalPrice}</TableCell>
              <TableCell>{ikea.currency}</TableCell>
              <TableCell>{ikea.inverseRate}</TableCell>
              <TableCell>{ikea.eurPrice}</TableCell>
              <TableCell>{ikea.url}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default IkeaTable;
