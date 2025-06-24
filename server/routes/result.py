from flask import Blueprint, request, jsonify
from models.models import db, CarbonResult
from services.footprint_calc import calculate_emissions

bp = Blueprint('result', __name__)

@bp.route('/api/calculate_footprint', methods=['POST'])
def calculate():
    data = request.json
    result = calculate_emissions(data)
    entry = CarbonResult(
        input_id=data['input_id'],
        user_id=data['user_id'],
        total_emission=result['total'],
        travel_emission=result['travel'],
        electricity_emission=result['electricity'],
        food_emission=result['food'],
        shopping_emission=result['shopping']
    )
    db.session.add(entry)
    db.session.commit()
    return jsonify({'result': result})
