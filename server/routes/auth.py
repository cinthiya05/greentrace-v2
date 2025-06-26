from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from models.models import db, User

bp = Blueprint('auth', __name__)

@bp.route('/api/register', methods=['POST'])
def register():
    data = request.json

    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already registered'}), 409

    new_user = User(
        name=data['name'],
        email=data['email'],
        password_hash=generate_password_hash(data['password'])
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        'message': 'User registered successfully',
        'user_id': new_user.id,
        'name': new_user.name
    }), 200


@bp.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if user and check_password_hash(user.password_hash, data['password']):
        return jsonify({'user_id': user.id, 'name': user.name})
    return jsonify({'error': 'Invalid credentials'}), 401
