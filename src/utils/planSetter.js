export const planSetter = (amount) => {
  console.log("amount", amount);
  if (amount === "100") return "Basic";
  else if (amount === "200") return "Professional";
  else if (amount === "300") return "Premium";
  else return "Free";
};
