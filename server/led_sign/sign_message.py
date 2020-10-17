
class SignMessage:
    def __init__(self, request):
        self.text = request.text
        self.brightness = request.brightness
        self.scroll_speed = request.scroll_speed
        self.background_color = request.background_color
        self.text_color = request.text_color
        self.border_color = request.border_color

    def __str__(self):
        return self.text
