const TAX_BRACKETS = [
  { lower: 0, upper: 800000, rate: 0.0 },
  { lower: 800000, upper: 3000000, rate: 0.15 },
  { lower: 3000000, upper: 12000000, rate: 0.18 },
  { lower: 12000000, upper: 25000000, rate: 0.21 },
  { lower: 25000000, upper: 50000000, rate: 0.23 },
  { lower: 50000000, upper: Infinity, rate: 0.25 },
];

const PERSONAL_RELIEF_EXAMPLE = 480000;
const MAX_RENT_RELIEF = 500000;

export function calculateNigerianTax(incomeDetails) {
  const {
    grossAnnualIncome = 0,
    rentPaid = 0,
    otherDeductions = 0,
  } = incomeDetails;

  const rentRelief = Math.min(rentPaid * 0.2, MAX_RENT_RELIEF);
  const totalDeductions =
    rentRelief + PERSONAL_RELIEF_EXAMPLE + otherDeductions;
  const taxableIncome = Math.max(0, grossAnnualIncome - totalDeductions);

  let totalTax = 0;
  let remainingIncome = taxableIncome;
  const breakdown = [];

  for (const bracket of TAX_BRACKETS) {
    if (remainingIncome <= 0) break;

    const bandWidth = bracket.upper - bracket.lower;
    const taxableInThisBracket = Math.min(remainingIncome, bandWidth);
    const taxInThisBracket = taxableInThisBracket * bracket.rate;
    totalTax += taxInThisBracket;

    if (taxableInThisBracket > 0) {
      breakdown.push({
        band: `On the amount between ₦${bracket.lower.toLocaleString()} and ₦${bracket.upper.toLocaleString()}`,
        rate: `${bracket.rate * 100}%`,
        taxableAmount: taxableInThisBracket,
        taxPayable: taxInThisBracket,
      });
    }

    remainingIncome -= taxableInThisBracket;
  }

  return {
    grossAnnualIncome,
    totalDeductions,
    taxableIncome,
    totalTax,
    breakdown,
  };
}
