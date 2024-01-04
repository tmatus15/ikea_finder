"use client";
import React from "react";
import { Button } from "../ui/button";
import { comaparePrice } from "@/lib/action";
import { useFormState, useFormStatus } from "react-dom";
import IkeaTable from "./IkeaTable";

const Comparator = ({ item }) => {
  const [state, formAction] = useFormState(comaparePrice, undefined);

  return (
    <div className="flex flex-col">
      <div className="mt-10 flex">
        <form action={formAction}>
          <input hidden value={item} name="product" readOnly></input>
          {/* <Button>Compare price in other countries</Button> */}
          <Submit />
        </form>
      </div>
      {state && (
        <div className="flex mt-5">
          <IkeaTable items={state} />
        </div>
      )}
    </div>
  );
};

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>
      {pending
        ? "Checking prices, please wait.."
        : "Compare price in other countries"}
    </Button>
  );
}
export default Comparator;
