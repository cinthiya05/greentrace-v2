def calculate_emissions(data):
    travel = data['travel_km'] * 0.21
    public_transit = data['public_transit'] * 0.05
    electricity = data['electricity_kwh'] * 0.9
    gas = data['gas_kg'] * 2.75
    food = (data['meat_grams'] * 0.027 + data['dairy_grams'] * 0.013)
    shopping = data['shopping_amount'] * 0.0025
    total = travel + public_transit + electricity + gas + food + shopping
    return {
        "total": round(total, 2),
        "travel": round(travel + public_transit, 2),
        "electricity": round(electricity + gas, 2),
        "food": round(food, 2),
        "shopping": round(shopping, 2)
    }
