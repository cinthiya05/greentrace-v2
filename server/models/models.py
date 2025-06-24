from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

class ActivityInput(db.Model):
    __tablename__ = 'activity_inputs'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    date = db.Column(db.Date, nullable=False)
    travel_km = db.Column(db.Float, default=0)
    public_transit = db.Column(db.Float, default=0)
    electricity_kwh = db.Column(db.Float, default=0)
    gas_kg = db.Column(db.Float, default=0)
    meat_grams = db.Column(db.Float, default=0)
    dairy_grams = db.Column(db.Float, default=0)
    shopping_amount = db.Column(db.Float, default=0)
    notes = db.Column(db.Text)

class CarbonResult(db.Model):
    __tablename__ = 'carbon_results'
    id = db.Column(db.Integer, primary_key=True)
    input_id = db.Column(db.Integer, db.ForeignKey('activity_inputs.id', ondelete='CASCADE'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    total_emission = db.Column(db.Float, default=0)
    travel_emission = db.Column(db.Float, default=0)
    electricity_emission = db.Column(db.Float, default=0)
    food_emission = db.Column(db.Float, default=0)
    shopping_emission = db.Column(db.Float, default=0)
    calculated_at = db.Column(db.DateTime, default=db.func.current_timestamp())

class AISuggestion(db.Model):
    __tablename__ = 'ai_suggestions'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    input_id = db.Column(db.Integer, db.ForeignKey('activity_inputs.id', ondelete='SET NULL'))
    suggestion = db.Column(db.Text, nullable=False)
    category = db.Column(db.String(50))
    generated_at = db.Column(db.DateTime, default=db.func.current_timestamp())

class ChatHistory(db.Model):
    __tablename__ = 'chat_history'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    prompt = db.Column(db.Text, nullable=False)
    response = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=db.func.current_timestamp())

class AdminLog(db.Model):
    __tablename__ = 'admin_logs'
    id = db.Column(db.Integer, primary_key=True)
    action = db.Column(db.String(255))
    timestamp = db.Column(db.DateTime, default=db.func.current_timestamp())
