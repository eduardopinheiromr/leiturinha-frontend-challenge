import { Categories, Product, CreditCard } from "../stores/types";

export const filterByCategory = (products: Product[], category: Categories) =>
  products.filter(product => product.category === category);

export const transformNumberIntoBRL = (number: number) =>
  number.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const checkFields = (creditCard: CreditCard) => {
  const { name, cardNumber, goodThru, cvv } = creditCard;

  return (
    name.length > 2 &&
    Number(cardNumber.replaceAll(" ", "")) &&
    Number(goodThru.replace("/", "")) &&
    cvv.length === 3
  );
};

const flag = {
  visa: "VISA",
  master: "MASTER",
  def: "DEFAULT",
};

const visaRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
const mastercardRegex = /^(?:5[1-5][0-9]{14})$/;

export const creditCardFlag = (value: string) => {
  if (!value) return;
  const formattedValue = value.replace(/[^0-9]/g, "");
  if (visaRegex.test(formattedValue)) {
    return flag.visa;
  } else if (mastercardRegex.test(formattedValue)) {
    return flag.master;
  } else if (Number.isInteger(Number(value.split(" ").join("")))) {
    return "INVALID";
  }
  return flag.def;
};
