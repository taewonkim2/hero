# To run this API server:
# 1. Install FastAPI and Uvicorn:
#    pip install "fastapi[all]"
# 2. Run the server from your terminal in the 'ISA' directory:
#    uvicorn api:app --reload

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Literal

app = FastAPI()

# Allow CORS for local development to allow the HTML file to fetch data
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class Transaction(BaseModel):
    date: str
    name: str
    type: Literal["sell", "buy", "deposit", "withdraw"]
    quantity: Optional[int] = None
    price_per_unit: Optional[int] = None
    total_amount: int
    profit: Optional[int] = None
    profit_rate: Optional[float] = None
    product_type: str # '주식', '입출금', '국내채권', '해외채권', 'ELS', '펀드', 'RP', '발행어음'

# Sample data mimicking a database table, based on the original HTML file
db_transactions: List[Transaction] = [
    {
        "date": "2025-12-02", "name": "NAVER", "type": "sell", "quantity": 50,
        "price_per_unit": 230000, "total_amount": 11500000, "profit": 500000, "profit_rate": 4.55,
        "product_type": "주식"
    },
    {
        "date": "2025-12-02", "name": "카카오", "type": "buy", "quantity": 30,
        "price_per_unit": 54000, "total_amount": 1620000, "product_type": "주식"
    },
    {
        "date": "2025-11-20", "name": "현금", "type": "deposit", "total_amount": 5000000,
        "product_type": "입출금"
    },
    {
        "date": "2025-10-25", "name": "SK하이닉스", "type": "buy", "quantity": 20,
        "price_per_unit": 160000, "total_amount": 3200000, "product_type": "주식"
    },
    {
        "date": "2025-10-25", "name": "KODEX 200", "type": "sell", "quantity": 100,
        "price_per_unit": 40000, "total_amount": 4000000, "profit": 200000, "profit_rate": 5.26,
        "product_type": "펀드"
    },
    {
        "date": "2025-10-03", "name": "삼성전자", "type": "sell", "quantity": 100,
        "price_per_unit": 12000, "total_amount": 12000000, "profit": 300000, "profit_rate": 20.00,
        "product_type": "주식"
    },
    {
        "date": "2025-10-03", "name": "LG에너지솔루션", "type": "buy", "quantity": 5,
        "price_per_unit": 400000, "total_amount": 2000000, "product_type": "주식"
    },
    {
        "date": "2025-09-15", "name": "현대차", "type": "sell", "quantity": 30,
        "price_per_unit": 230000, "total_amount": 6900000, "profit": -150000, "profit_rate": -2.13,
        "product_type": "주식"
    },
    {
        "date": "2025-09-15", "name": "현금", "type": "withdraw", "total_amount": 2000000,
        "product_type": "입출금"
    },
    {
        "date": "2025-09-02", "name": "삼성전자", "type": "buy", "quantity": 150,
        "price_per_unit": 10000, "total_amount": 15000000, "product_type": "주식"
    },
    {
        "date": "2025-09-02", "name": "NAVER", "type": "buy", "quantity": 80,
        "price_per_unit": 220000, "total_amount": 17600000, "product_type": "주식"
    },
    {
        "date": "2025-09-02", "name": "현금", "type": "deposit", "total_amount": 40000000,
        "product_type": "입출금"
    },
]

@app.get("/api/history", response_model=List[Transaction])
async def get_history():
    """
    Returns a list of all transactions, sorted by date descending.
    """
    # Sort data by date in descending order before returning
    sorted_transactions = sorted(db_transactions, key=lambda x: x['date'], reverse=True)
    return sorted_transactions
