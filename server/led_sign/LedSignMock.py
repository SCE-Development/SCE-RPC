import curses
import argparse 

parser = argparse.ArgumentParser(description="Prints mock output.")
parser.add_argument('--mock-output', help = "Displays Mock Output", )
args = parser.parse_args()

class LedSignMock():
    sign_data = {
        "text": 'beans',
        "brightness": '',
        "scroll-speed": '',
        "background-color": '',
        "font-color": '',
        "border-color":''
    }

    menu = ['   ','SCE LED Sign Visualization ', ' ','Current Text: ', 'Current Brightness: ',' ',
    'Current Scroll Speed:', 'Current Background Color: ', 'Current Font Color:',
    'Current Border Color: ' ]
    ESCKEY = 27

    def update_sign_visual(self, request):
        self.sign_data["text"] = request.text
        self.sign_data["brightness"] = request.brightness
        self.sign_data["scroll-speed"] = request.scroll_speed
        self.sign_data["background-color"] = request.background_color
        self.sign_data["font-color"] = request.text_color
        self.sign_data["border-color"] = request.border_color

    def print_menu(self, selected_row_idx):
        screen = curses.initscr()
        screen.clear()
        screen.border(0)
        height, width = screen.getmaxyx()
        print('wooooo')
        for idx, row in enumerate(self.menu): #iterates over different menu options and aligns it
            x = width//3 - len(self.menu) 
            #calculates the location of the words (division changed by # of things in self.menu)
            y = height//3 - len(self.menu)//3 + idx
            screen.addstr(y, x, row)
            if idx == 3:
                screen.addstr(y ,x,self.sign_data["text"])
            elif idx == 4:
                screen.addstr(y + 5,x,self.sign_data["brightness"])
            elif idx == 6:
                screen.addstr(y +5 ,x,self.sign_data["scroll-speed"])
            elif idx == 7:
                screen.addstr(y +5,x,self.sign_data["background-color"])
            elif idx == 8:
                screen.addstr(y,x,self.sign_data["font-color"])
            elif idx == 9:
                screen.addstr(y,x,self.sign_data["border-color"])
        screen.refresh()

    def creates_display(self):
        screen = curses.initscr()
        curses.curs_set(0)
        current_row = 0
        self.print_menu(current_row)
        checkKey = screen.getch()
        while checkKey != self.ESCKEY:
            checkKey = screen.getch()
        curses.endwin()
        exit()
        self.print_menu(current_row)

