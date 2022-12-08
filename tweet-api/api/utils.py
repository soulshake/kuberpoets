import json

import numpy as np

class _NumpyEncoder(json.JSONEncoder):
    # From https://stackoverflow.com/a/49677241/3853826
    """Special json encoder for numpy types"""

    def default(self, obj):
        if isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)