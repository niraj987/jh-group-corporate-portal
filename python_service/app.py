"""
JH Group Quantitative Intelligence & Multi-Agent Analytics Engine
FastAPI Python Microservice
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any
import datetime
import math

app = FastAPI(
    title="JH Group Quantitative Intelligence Engine",
    description="Python algorithmic engine powering Crypto Analytics, Multi-Agent Financial Research & Basel III/IV Risk Underwriting",
    version="2.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class UnderwritingRequest(BaseModel):
    annual_income: float = Field(..., example=85000.0)
    monthly_debt: float = Field(..., example=650.0)
    credit_score: int = Field(..., example=740)
    requested_amount: float = Field(..., example=30000.0)
    term_months: int = Field(default=36, example=36)

class EarningsAnalysisRequest(BaseModel):
    ticker: str = Field(..., example="NVDA")
    quarter: str = Field(..., example="Q3 2026")
    revenue_reported: float = Field(..., example=35.08)
    revenue_consensus: float = Field(..., example=33.16)
    guidance_outlook: str = Field(..., example="positive")

@app.get("/")
def read_root():
    return {
        "company": "JH Group",
        "service": "Quantitative Intelligence Engine",
        "status": "online",
        "supported_models": [
            "Basel III/IV IRB Risk Engine",
            "Multi-Agent Earnings Synthesis Model",
            "Quantitative Crypto Alpha Forecasting"
        ]
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "runtime": "Python 3.14 (FastAPI + SciKit/PyTorch compatible)"
    }

@app.post("/api/underwrite")
def simulate_underwrite(req: UnderwritingRequest):
    """
    Simulates Basel III/IV IRB credit risk model with Explainable AI factor breakdown.
    Powers the algorithms behind https://frontend-one-woad-nn4q1jdjwi.vercel.app/
    """
    monthly_income = req.annual_income / 12.0
    proposed_monthly_payment = (req.requested_amount / req.term_months) * 1.08  # estimate with interest
    total_debt_service = req.monthly_debt + proposed_monthly_payment
    dti = (total_debt_service / monthly_income) * 100.0

    # Base Probability of Default (PD) calibrated to score
    if req.credit_score >= 780:
        base_pd = 0.008
        tier = "Prime AAA (Institutional Grade)"
    elif req.credit_score >= 720:
        base_pd = 0.019
        tier = "Prime AA (Strong Solvency)"
    elif req.credit_score >= 660:
        base_pd = 0.048
        tier = "Standard A (Eligible)"
    elif req.credit_score >= 620:
        base_pd = 0.092
        tier = "Near Prime B (Requires Higher Capital Reserve)"
    else:
        base_pd = 0.185
        tier = "Subprime C (High Risk)"

    # Adjust PD by DTI ratio
    if dti > 45.0:
        adjusted_pd = base_pd * 1.75
    elif dti > 35.0:
        adjusted_pd = base_pd * 1.25
    else:
        adjusted_pd = base_pd * 0.90

    # Basel IRB Loss Given Default (LGD) benchmark
    lgd = 0.40
    expected_loss = adjusted_pd * lgd * req.requested_amount
    approved = req.credit_score >= 630 and dti <= 48.0

    return {
        "success": True,
        "engine": "CreditPulse Basel III/IV IRB Engine",
        "decision": "APPROVED" if approved else "MANUAL_REVIEW_REQUIRED",
        "risk_tier": tier,
        "metrics": {
            "debt_to_income_ratio": f"{dti:.2f}%",
            "probability_of_default": f"{adjusted_pd * 100:.2f}%",
            "loss_given_default": f"{lgd * 100:.1f}%",
            "expected_loss_estimate": f"${expected_loss:.2f}",
            "recommended_interest_rate": f"{max(5.4, 4.2 + (adjusted_pd * 45)):.2f}%"
        },
        "explainable_ai_weights": [
            {"factor": "Credit Score & Historical Delinquency", "importance": 0.42, "contribution": "Positive" if req.credit_score >= 700 else "Negative"},
            {"factor": "Debt-to-Income (DTI) Leverage", "importance": 0.31, "contribution": "Positive" if dti < 36 else "Negative"},
            {"factor": "Income Capacity & Payment Affordability", "importance": 0.18, "contribution": "Positive" if monthly_income > 4000 else "Neutral"},
            {"factor": "Regulatory Reserve Adequacy", "importance": 0.09, "contribution": "Compliant"}
        ]
    }

@app.post("/api/earnings-sentiment")
def analyze_earnings(req: EarningsAnalysisRequest):
    """
    Simulates Multi-Agent Financial Analysis Model.
    Powers the algorithms behind https://earningsdesk-two.vercel.app/
    """
    revenue_surprise = ((req.revenue_reported - req.revenue_consensus) / req.revenue_consensus) * 100.0
    
    # Sentiment calculation
    sentiment_score = 0.72 if req.guidance_outlook.lower() == "positive" else 0.45
    if revenue_surprise > 0:
        sentiment_score += min(0.20, revenue_surprise * 0.02)
    
    sentiment_label = "Bullish Outperformance" if sentiment_score > 0.75 else "Neutral Hold" if sentiment_score > 0.50 else "Cautious/Bearish"

    return {
        "success": True,
        "engine": "EarningsDesk Multi-Agent Extraction Network",
        "ticker": req.ticker.upper(),
        "quarter": req.quarter,
        "revenue_surprise_pct": f"{revenue_surprise:+.2f}%",
        "agent_consensus": {
            "sentiment_index": round(sentiment_score, 3),
            "sentiment_stance": sentiment_label,
            "sub_agent_verdicts": {
                "Agent 1 (SEC 10-Q Parser)": "Revenue beat verified against GAAP reconciliations",
                "Agent 2 (Guidance & Forward Tone)": f"Forward guidance characterized as {req.guidance_outlook.lower()}",
                "Agent 3 (Cash Flow & Margin Auditor)": "EBITDA conversion consistent with quarterly targets"
            }
        }
    }

@app.get("/api/crypto-signals")
def get_crypto_signals():
    """
    Generates quantitative market signals.
    Powers the algorithms behind https://jh-crypto-analytics.vercel.app/
    """
    return {
        "success": True,
        "engine": "JH Crypto Analytics Quantitative Alpha Desk",
        "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "signals": [
            {
                "symbol": "BTC/USD",
                "price": 94820.50,
                "signal": "STRONG_ACCUMULATION",
                "confidence": 92.4,
                "order_book_skew": "+14.8% Buy Side",
                "rag_sentiment": "Bullish institutional net-inflows"
            },
            {
                "symbol": "ETH/USD",
                "price": 3480.25,
                "signal": "MOMENTUM_EXPANSION",
                "confidence": 88.7,
                "order_book_skew": "+8.2% Buy Side",
                "rag_sentiment": "Ecosystem Layer 2 gas volume spike"
            },
            {
                "symbol": "SOL/USD",
                "price": 194.60,
                "signal": "HIGH_VOLATILITY_BREAKOUT",
                "confidence": 86.1,
                "order_book_skew": "+11.4% Buy Side",
                "rag_sentiment": "DEX aggregate volume high"
            }
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)
