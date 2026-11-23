from fastapi.testclient import TestClient
from app import app

client = TestClient(app)

def test_endpoints():
    print("--- 1. Testing Root & Health ---")
    r = client.get("/")
    assert r.status_code == 200
    print("Root response:", r.json())

    r = client.get("/health")
    assert r.status_code == 200
    print("Health response:", r.json())

    print("\n--- 2. Testing Underwrite Simulation ---")
    payload = {
        "annual_income": 95000.0,
        "monthly_debt": 650.0,
        "credit_score": 750,
        "requested_amount": 28000.0,
        "term_months": 36
    }
    r = client.post("/api/underwrite", json=payload)
    assert r.status_code == 200
    data = r.json()
    print("Underwrite decision:", data["decision"], "| Tier:", data["risk_tier"])
    print("Metrics:", data["metrics"])
    print("XAI weights count:", len(data["explainable_ai_weights"]))

    print("\n--- 3. Testing Earnings Multi-Agent Analysis ---")
    earnings_payload = {
        "ticker": "NVDA",
        "quarter": "Q3 2026",
        "revenue_reported": 35.1,
        "revenue_consensus": 33.2,
        "guidance_outlook": "positive"
    }
    r = client.post("/api/earnings-sentiment", json=earnings_payload)
    assert r.status_code == 200
    e_data = r.json()
    print("Ticker:", e_data["ticker"], "| Stance:", e_data["agent_consensus"]["sentiment_stance"])

    print("\n--- 4. Testing Crypto Signals ---")
    r = client.get("/api/crypto-signals")
    assert r.status_code == 200
    c_data = r.json()
    print("Signals count:", len(c_data["signals"]))
    for s in c_data["signals"]:
        print(f" - {s['symbol']}: {s['signal']} (Confidence: {s['confidence']}%)")

    print("\n✓ ALL PYTHON MICROSERVICE TESTS PASSED!\n")

if __name__ == "__main__":
    test_endpoints()
