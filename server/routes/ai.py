from flask import Blueprint, request, jsonify
from models.models import db, AISuggestion
from services.chatgpt_service import get_chat_response

bp = Blueprint('ai', __name__)

@bp.route('/api/get_suggestions', methods=['POST'])
def get_suggestions():
    try:
        data = request.json

        # Validate input
        if not data.get('user_id') or not data.get('summary'):
            return jsonify({'error': 'user_id and summary are required'}), 400

        prompt = f"Suggest how this user can reduce carbon: {data['summary']}"
        suggestion = get_chat_response(prompt)

        entry = AISuggestion(
            user_id=data['user_id'],
            input_id=data.get('input_id'),   # Optional
            suggestion=suggestion,
            category=data.get('category')    # Optional
        )

        db.session.add(entry)
        db.session.commit()

        return jsonify({'suggestion': suggestion})

    except Exception as e:
        print(f"[ERROR] get_suggestions: {e}")
        return jsonify({'error': 'Internal server error'}), 500
