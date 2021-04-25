import unittest

from app import create_app


class TestPedro(unittest.TestCase):
    def setUp(self) -> None:
        self.app = create_app().test_client()
        self.response = self.app.get(f'/calculadora/')

    def test_get(self):
        self.assertEqual(200, self.response.status_code)

    def test_sum(self):
        params = {'number1': 1,
                  'number2': 2,
                  }
        url = make_url(params)
        self.response_calc = self.app.get(url)
        data = self.response_calc.json['result']
        self.assertEqual(200, self.response_calc.status_code)
        self.assertEqual('3', data)

    def test_sub(self):
        params = {'number1': 1,
                  'number2': 2,
                  'operator': "-",
                  }
        url = make_url(params)
        self.response_calc = self.app.get(url)
        data = self.response_calc.json['result']
        self.assertEqual(200, self.response_calc.status_code)
        self.assertEqual('-1', data)

    def test_multi(self):
        params = {'number1': 4,
                  'number2': 6,
                  'operator': "*",
                  }
        url = make_url(params)
        self.response_calc = self.app.get(url)
        data = self.response_calc.json['result']
        self.assertEqual(200, self.response_calc.status_code)
        self.assertEqual('24', data)

    def test_div(self):
        params = {'number1': 18,
                  'number2': 6,
                  'operator': "/",
                  }
        url = make_url(params)
        self.response_calc = self.app.get(url)
        data = self.response_calc.json['result']
        self.assertEqual(200, self.response_calc.status_code)
        self.assertEqual('3.0', data)


def make_url(params):
    params = '&'.join([f'{key}={value}' for key, value in params.items()])
    url = f'/_calculate/?{params}'
    return url
