from flask import Blueprint, request, jsonify
from models.models import db, ActivityInput
from datetime import datetime

bp = Blueprint('activity', __name__)

@bp.route('/api/submit_activity', methods=['POST'])
def submit_activity():
    try:
        data = request.json

        # Parse and validate required fields
        user_id = data.get('user_id')
        date_str = data.get('date')
        if not user_id or not date_str:
            return jsonify({'error': 'user_id and date are required'}), 400

        try:
            date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()
        except ValueError:
            return jsonify({'error': 'Invalid date format. Use YYYY-MM-DD'}), 400

        # Create ActivityInput instance
        activity = ActivityInput(
            user_id=user_id,
            date=date_obj,
            travel_km=data.get('travel_km', 0),
            public_transit=data.get('public_transit', 0),
            electricity_kwh=data.get('electricity_kwh', 0),
            gas_kg=data.get('gas_kg', 0),
            meat_grams=data.get('meat_grams', 0),
            dairy_grams=data.get('dairy_grams', 0),
            shopping_amount=data.get('shopping_amount', 0),
            notes=data.get('notes', '')
        )

        db.session.add(activity)
        db.session.commit()

        return jsonify({'message': 'Activity saved', 'input_id': activity.id})

    except Exception as e:
        print(f"[ERROR] submit_activity failed: {e}")
        return jsonify({'error': 'Internal server error'}), 500
