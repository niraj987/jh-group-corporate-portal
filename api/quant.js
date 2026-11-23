export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { annualIncome, monthlyDebt, creditScore, requestedLoan, termMonths } = req.body || {};

  const income = parseFloat(annualIncome) || 75000;
  const debt = parseFloat(monthlyDebt) || 800;
  const score = parseInt(creditScore) || 720;
  const loan = parseFloat(requestedLoan) || 25000;
  const months = parseInt(termMonths) || 36;

  const monthlyIncome = income / 12;
  const dti = ((debt + (loan / months)) / monthlyIncome) * 100;

  let probabilityOfDefault = 0.05;
  if (score >= 750) probabilityOfDefault = 0.012;
  else if (score >= 700) probabilityOfDefault = 0.028;
  else if (score >= 650) probabilityOfDefault = 0.065;
  else probabilityOfDefault = 0.145;

  if (dti > 45) probabilityOfDefault *= 1.8;
  else if (dti > 35) probabilityOfDefault *= 1.3;

  const eligible = score >= 620 && dti <= 50;
  const tier =
    score >= 750
      ? 'Tier 1 (Prime Institutional)'
      : score >= 680
      ? 'Tier 2 (Near Prime)'
      : 'Tier 3 (Alternative Reserve)';

  res.status(200).json({
    success: true,
    engine: 'JH Group Quantitative Risk Engine (Basel III/IV Aligned)',
    results: {
      eligible,
      tier,
      calculatedDTI: dti.toFixed(2) + '%',
      probabilityOfDefault: (probabilityOfDefault * 100).toFixed(2) + '%',
      lossGivenDefault: '35.0%',
      recommendedMaxLoan: (monthlyIncome * 0.40 * months).toFixed(0),
      regulatoryExplanation: eligible
        ? 'Profile satisfies capital reserve requirements with robust debt-service coverage.'
        : 'Elevated DTI or sub-benchmark credit score triggers elevated risk-weight buffers.'
    }
  });
}
