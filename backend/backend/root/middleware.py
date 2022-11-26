class UserSubMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if request.user.is_authenticated:
            response['X-USER-ID'] = request.user.id
            response['X-USER-EMAIL'] = request.user.email
            response['X-USER-NAME'] = request.user.first_name
        return response
