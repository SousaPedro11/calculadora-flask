from abc import abstractmethod, ABC

from math import nan


class Calculator(ABC):
    @abstractmethod
    def calculate(self, number1, number2):
        raise NotImplementedError


class CalculatorAdd(Calculator):
    def calculate(self, number1, number2):
        return number1 + number2


class CalculatorSubtract(Calculator):
    def calculate(self, number1, number2):
        return number1 - number2


class CaluculatorMultiply(Calculator):
    def calculate(self, number1, number2):
        return number1 * number2


class CalculatorDivide(Calculator):
    def calculate(self, number1, number2):
        try:
            result = number1 / number2
        except ZeroDivisionError:
            result = nan
        return result


OPERATOR = {
    '+': CalculatorAdd,
    '-': CalculatorSubtract,
    '*': CaluculatorMultiply,
    '/': CalculatorDivide
}
