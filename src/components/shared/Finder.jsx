"use client";

import { useFormState } from "react-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { findProduct } from "@/lib/action";
import Image from "next/image";
import Comparator from "./Comparator";

const Finder = () => {
  const [state, formAction] = useFormState(findProduct, undefined);

  return (
    <div className="ml-10">
      <form action={formAction}>
        <div className="flex flex-row gap-5">
          <div className="w-1/4">
            <Input
              type="number"
              placeholder="Insert ikea product number"
              name="product"
            />
          </div>
          <div>
            <Button>Find product</Button>
          </div>
        </div>
      </form>
      {state && (
        <>
          <div className="bg-red-300 max-w-max mt-10"> {state?.error}</div>
          <div className=" w-full mt-10 flex flex-row gap-10 min-h-80">
            <div className="flex flex-1 relative">
              <Image
                src={state.imageUrl}
                alt="ikea picture"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-5 flex-1">
              <h1>Name from SK web: {state.name}</h1>
              <h2>Description from SK web: {state.nameDesc}</h2>
              <h1>
                Price in SK: {state.price} {state.priceCur}
              </h1>
            </div>
          </div>
          <div className="flex mt-10">
            <Comparator item={state.product} />
          </div>
        </>
      )}
    </div>
  );
};

export default Finder;
