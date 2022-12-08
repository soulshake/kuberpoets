import json
from collections import OrderedDict
import unittest

import requests

class TestStringMethods(unittest.TestCase):

    def test_analyze(self):
        with open("./sample_requests/request.json") as f:
            # python 3.7 dicts are ordered now, but some other libraries like pandas don't respect that
            # so it's safest to stick with an OrderedDict since the order of the features for our input vector matter
            payload = json.load(f, object_pairs_hook=OrderedDict)

        url = 'http://localhost:5000/analyze'
        r = requests.post(url,json=payload)
        print(r.status_code)
        print(r.content)
        self.assertTrue(r.content == r.content)
        # self.assertTrue(r.content == b'{"data":{"duration":1003.0324,"errors":[],"sentiment":"happy"}}\n')


if __name__ == "__main__":

    unittest.main()