import re

from flask import jsonify, render_template, request

from app.calculadora import calculadora_bp
from .models import OPERATOR


@calculadora_bp.route('/calculadora/', methods=['GET', 'POST'])
@calculadora_bp.route('/', methods=['GET', 'POST'])
def calculadora():
    return render_template('calculadora.html')


@calculadora_bp.route('/_calculate/', methods=['GET', 'POST'])
def calculate():
    number1 = request.args.get('number1', '0')
    operator = request.args.get('operator', '+')
    number2 = request.args.get('number2', '0')
    m = validate(number1)
    if m:
        number1 = convert(number1)
    n = validate(number2)
    if n:
        number2 = convert(number2)

    if m is None or n is None or operator not in '+-*/':
        return jsonify(result='Error!')

    result = OPERATOR[operator]().calculate(number1, number2)

    return jsonify(result=str(result))


def validate(number):
    return re.match(r'^-?\d*[.]?\d*$', number)


def convert(number):
    try:
        if '.' in number:
            return float(number)
        else:
            return int(number)
    except ValueError:
        return None
