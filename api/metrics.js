export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  res.status(200).json({
    success: true,
    metrics: [
      { label: 'Production FinTech Platforms', value: '3 Active', change: '+100% YoY' },
      { label: 'Quantitative Data Points Processed', value: '75M+', change: 'Real-time streaming' },
      { label: 'Algorithmic Accuracy / Precision', value: '99.4%', change: 'Backtested & Audited' },
      { label: 'Decision Latency', value: '< 65ms', change: 'Ultra-low latency' },
      { label: 'Regulatory Compliance Standard', value: 'Basel III/IV', change: 'Strict IRB' }
    ]
  });
}
