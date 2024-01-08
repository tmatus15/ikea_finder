"use server";
import { JSDOM } from "jsdom";
import { ikeaShops } from "@/lib/constants";

export const findProduct = async (prevState, formData) => {
  const { product } = Object.fromEntries(formData);

  const response = await fetch(`https://www.ikea.com/sk/sk/p/-${product}`);

  const html = await response.text();

  const dom = new JSDOM(html);

  const document = dom.window.document;
  try {
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

    return { name, nameDesc, price, priceCur, imageUrl, product };
  } catch (e) {
    return { error: "Can't find product by ID" };
  }
};

export const comaparePrice = async (prevState, formData) => {
  const { product } = Object.fromEntries(formData);

  const resultArray = [];

  // fetch exchange rates

  const ratesResponse = await fetch(
    "https://www.floatrates.com/daily/eur.json"
  );

  const rates = await ratesResponse.json();

  // hack to prevent error logging
  const jsdom = require("jsdom");
  const { JSDOM } = jsdom;
  const virtualConsole = new jsdom.VirtualConsole();
  virtualConsole.on("error", () => {
    // No-op to skip console errors.
  });

  // Loop through all the ikea stores in configuration
  for (let i = 0; i < ikeaShops.length; i++) {
    const response = await fetch(`${ikeaShops[i].url}${product}`);

    const html = await response.text();

    const dom = new JSDOM(html, { virtualConsole });

    const document = dom.window.document;

    let price;

    // Parse price
    try {
      if (ikeaShops[i].price === "data-price") {
        price = document.querySelector("span[data-price]").textContent;

        // remove EUR
        price = price.replace(" €", "");
      } else {
        price = document.querySelectorAll(ikeaShops[i].price)[0].innerHTML;

        // remove . and space from price
        price = price.replace(".", "");
        price = price.replace(" ", "");
      }
    } catch {
      price = 0;
    }

    let priceDecimal;

    // Parse price decimal
    try {
      priceDecimal = document.querySelectorAll(ikeaShops[i].priceDecimal)[0]
        .innerHTML;

      // remove separator <span> element
      priceDecimal = priceDecimal.slice(-2);

      if (isNaN(priceDecimal)) {
        priceDecimal = 0;
      }
    } catch {
      priceDecimal = 0;
    }

    const finalPrice = price + "." + priceDecimal;

    // get exchange rate against EURO
    let rate = 1;
    let eurPrice = Math.ceil(parseFloat(finalPrice) * 100) / 100;
    if (ikeaShops[i].currency !== "EUR" && finalPrice !== 0) {
      const value = ikeaShops[i].currency.toLowerCase();
      rate = rates[value].inverseRate;
      eurPrice = parseFloat(rate) * parseFloat(finalPrice);

      // round 2 decimal point
      eurPrice = Math.ceil(eurPrice * 100) / 100;
    }

    // make JSON object
    resultArray.push({
      country: ikeaShops[i].country,
      url: eurPrice === 0 ? "Not Available" : ikeaShops[i].url + product,
      finalPrice:
        eurPrice === 0
          ? "Not Available"
          : Math.ceil(parseFloat(finalPrice) * 100) / 100,
      currency: ikeaShops[i].currency,
      inverseRate: Math.ceil(rate * 1000) / 1000,
      eurPrice: eurPrice === 0 ? "Not Available" : eurPrice,
    });

    console.log(resultArray);
  }
  return resultArray;
};
