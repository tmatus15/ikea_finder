import { JSDOM } from "jsdom";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const body = await req.json();

  const { product } = body;

  const response = await fetch(`https://www.ikea.com/sk/sk/p/-${product}`);

  const html = await response.text();

  const dom = new JSDOM(html);

  const document = dom.window.document;

  const name = document.querySelectorAll(
    ".pip-header-section__title--big.notranslate"
  )[0].innerHTML;

  const nameDesc = document.querySelectorAll(
    ".pip-header-section__description-text"
  )[0].innerHTML;

  const price = document.querySelectorAll(".pip-temp-price__integer")[0]
    .innerHTML;

  const priceCur = document.querySelectorAll(".pip-temp-price__currency")[0]
    .innerHTML;

  const imageUrl = document.querySelector(".pip-image")?.getAttribute("src");

  // console.log(name);
  // console.log(nameDesc);
  // console.log(price);
  // console.log(priceCur);
  // console.log(imageUrl);

  return NextResponse.json({ name, nameDesc, price, priceCur, imageUrl });
};
