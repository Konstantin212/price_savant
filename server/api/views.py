from django.http import JsonResponse
import json

def api_home(req, *args, **kwargs):
    body = req.body
    data  = {}

    try:
        data = json.loads(body)
    except:
        pass

    data['params'] = dict(req.GET)
    data['headers'] = dict(req.headers)
    data['Content-Type'] = "application/json"

    print('----data')
    print(data)

    return JsonResponse(data)