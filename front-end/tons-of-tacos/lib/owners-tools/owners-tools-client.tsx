export function calcPrice(unitPrice: number, size: string, quantity: number) {
  let sizeSurcharge: number = 0.0;
  // let adjPrice: number;

  switch (size) {
    case "M":
      sizeSurcharge = 0.5;
      break;
    case "L":
      sizeSurcharge = 1.0;
  }
  const adjPrice = (unitPrice + sizeSurcharge) * quantity;
  return adjPrice;
}
