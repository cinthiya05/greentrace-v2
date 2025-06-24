from flask import Blueprint, jsonify
from models.models import db, ActivityInput, CarbonResult

bp = Blueprint('history', __name__)

@bp.route('/api/get_history/<int:user_id>', methods=['GET'])
def get_history(user_id):
    # Get all activity inputs for the user
    activities = ActivityInput.query.filter_by(user_id=user_id).all()
    history = []

    for activity in activities:
        # Get the matching carbon result for this input (if any)
        result = CarbonResult.query.filter_by(input_id=activity.id).first()
        
        history.append({
            'activity_id': activity.id,
            'date': activity.date.strftime('%Y-%m-%d'),
            'travel_km': activity.travel_km,
            'public_transit': activity.public_transit,
            'electricity_kwh': activity.electricity_kwh,
            'gas_kg': activity.gas_kg,
            'meat_grams': activity.meat_grams,
            'dairy_grams': activity.dairy_grams,
            'shopping_amount': activity.shopping_amount,
            'notes': activity.notes,
            'result': {
                'total_emission': result.total_emission if result else None,
                'travel_emission': result.travel_emission if result else None,
                'electricity_emission': result.electricity_emission if result else None,
                'food_emission': result.food_emission if result else None,
                'shopping_emission': result.shopping_emission if result else None,
                'calculated_at': result.calculated_at.strftime('%Y-%m-%d %H:%M:%S') if result else None
            }
        })

    return jsonify({'user_id': user_id, 'history': history})
