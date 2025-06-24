from flask import Blueprint, jsonify
from models.models import db, User, ActivityInput, CarbonResult
from sqlalchemy import func

bp = Blueprint('admin', __name__)

@bp.route('/api/admin/overview', methods=['GET'])
def admin_overview():
    total_users = db.session.query(func.count(User.id)).scalar()
    total_activities = db.session.query(func.count(ActivityInput.id)).scalar()
    avg_emission = db.session.query(func.avg(CarbonResult.total_emission)).scalar()

    total_travel = db.session.query(func.sum(CarbonResult.travel_emission)).scalar() or 0
    total_electricity = db.session.query(func.sum(CarbonResult.electricity_emission)).scalar() or 0
    total_food = db.session.query(func.sum(CarbonResult.food_emission)).scalar() or 0
    total_shopping = db.session.query(func.sum(CarbonResult.shopping_emission)).scalar() or 0

    latest_activity = db.session.query(func.max(CarbonResult.calculated_at)).scalar()

    return jsonify({
        'total_users': total_users,
        'total_activities': total_activities,
        'average_emission': round(avg_emission, 2) if avg_emission else 0.0,
        'emission_by_category': {
            'travel': round(total_travel, 2),
            'electricity': round(total_electricity, 2),
            'food': round(total_food, 2),
            'shopping': round(total_shopping, 2)
        },
        'last_activity_date': latest_activity.strftime('%Y-%m-%d %H:%M:%S') if latest_activity else None
    })
