import Link from "next/link";

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
          <TableRow className="p-bold-20">
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
            <TableRow
              key={ikea.country}
              className={
                ikea.eurPrice === "Not Available"
                  ? "bg-red-100/50"
                  : "bg-green-100/50"
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
        </TableBody>
      </Table>
    </div>
  );
};

export default IkeaTable;
