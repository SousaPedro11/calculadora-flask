from flask import Flask

from app.calculadora import calculadora_bp


def create_app(config_name: str = None) -> Flask:
    app = Flask(__name__)

    app.register_blueprint(calculadora_bp)

    return app
