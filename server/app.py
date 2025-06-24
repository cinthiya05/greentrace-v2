from flask import Flask
from flask_cors import CORS
from models.models import db
from routes import auth, activity, result, ai, chat, history, graph, admin


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///green_trace.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)
db.init_app(app)

# Register Blueprints
app.register_blueprint(auth.bp)
app.register_blueprint(activity.bp)
app.register_blueprint(result.bp)
app.register_blueprint(ai.bp)
app.register_blueprint(chat.bp)
app.register_blueprint(history.bp)
app.register_blueprint(graph.bp)
app.register_blueprint(admin.bp)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
