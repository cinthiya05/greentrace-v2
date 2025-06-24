from flask import Blueprint, jsonify
from models.models import CarbonResult
from sqlalchemy import func
from datetime import datetime

bp = Blueprint('graph', __name__)

@bp.route('/api/get_graph_data/<int:user_id>', methods=['GET'])
def get_graph_data(user_id):
    # Fetch all carbon results for the user
    results = CarbonResult.query.filter_by(user_id=user_id).order_by(CarbonResult.calculated_at.asc()).all()

    date_labels = []
    total_emissions = []
    category_breakdown = {
        'travel': 0.0,
        'electricity': 0.0,
        'food': 0.0,
        'shopping': 0.0
    }

    for entry in results:
        # Trend chart data (date vs total_emission)
        date_labels.append(entry.calculated_at.strftime('%Y-%m-%d'))
        total_emissions.append(entry.total_emission)

        # Sum each category (for pie/bar charts)
        category_breakdown['travel'] += entry.travel_emission
        category_breakdown['electricity'] += entry.electricity_emission
        category_breakdown['food'] += entry.food_emission
        category_breakdown['shopping'] += entry.shopping_emission

    return jsonify({
        'trend': {
            'dates': date_labels,
            'totals': total_emissions
        },
        'category_summary': category_breakdown
    })
