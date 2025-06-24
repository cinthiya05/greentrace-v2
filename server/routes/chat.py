import traceback
from flask import Blueprint, request, jsonify
from models.models import db, ChatHistory
from services.chatgpt_service import get_chat_response

bp = Blueprint('chat', __name__)

@bp.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        print("Incoming request data:", data)

        prompt = data.get('prompt')
        user_id = data.get('user_id')

        if not prompt or not user_id:
            print("Missing prompt or user_id")
            return jsonify({'error': 'user_id and prompt are required'}), 400

        print("Prompt received:", prompt)

        # --- Test static response first ---
        # response = "Mocked ChatGPT response for testing."
        response = get_chat_response(prompt)

        print("Response from ChatGPT:", response)

        entry = ChatHistory(
            user_id=user_id,
            prompt=prompt,
            response=response
        )
        db.session.add(entry)
        db.session.commit()

        print("Chat entry saved to DB.")

        return jsonify({'response': response})

    except Exception as e:
        print("Exception occurred:")
        traceback.print_exc()
        return jsonify({'error': 'Internal server error'}), 500