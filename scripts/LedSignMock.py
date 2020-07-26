import curses
import argparse 
from server import led_sign_servicer

parser = argparse.ArgumentParser(description="Prints mock output.")
parser.add_argument('--mock-output', help = "Displays Mock Output", )
args = parser.parse_args()

class LedSignMock(data):
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    sign_data = []
=======
>>>>>>> Terminal Visual for LED Sign
=======
    sign_data = []
>>>>>>> Fixes Requests
=======
>>>>>>> Terminal Visual for LED Sign
=======
    sign_data = []
>>>>>>> Fixes Requests
=======
>>>>>>> Terminal Visual for LED Sign
=======
    sign_data = []
>>>>>>> Fixes Requests

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

    def print_menu(self, stdscr, selected_row_idx):
        data = "info here"
        stdscr.clear()
        stdscr.border(0)
        height, width = stdscr.getmaxyx()
        for idx, row in enumerate(menu): #iterates over different menu options and aligns it
            x = width//3 - len(menu) 
            #calculates the location of the words (division changed by # of things in menu)
            y = height//3 - len(menu)//3 + idx
            stdscr.addstr(y, x, row)
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Fixes Requests
=======
>>>>>>> Fixes Requests
=======
>>>>>>> Fixes Requests
            if data[3]:
                print(self.sign_data["text"])
            elif data[4]:
                print(self.sign_data["brightness"])
            elif data[6]:
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
                print(self.sign_data["scroll-speed"])
=======
                print(rself.sign_data["scroll-speed"])
>>>>>>> Fixes Requests
=======
                print(self.sign_data["scroll-speed"])
>>>>>>> Fixes Main
=======
                print(rself.sign_data["scroll-speed"])
>>>>>>> Fixes Requests
=======
                print(self.sign_data["scroll-speed"])
>>>>>>> Fixes Main
=======
                print(rself.sign_data["scroll-speed"])
>>>>>>> Fixes Requests
            elif data[7]:
                print(self.sign_data["background-color"])
            elif data[8]:
                print(self.sign_data["font-color"])
            elif data[9]:
                print(self.sign_data["border-color"])
            else:
                break
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Terminal Visual for LED Sign
=======
>>>>>>> Fixes Requests
=======
>>>>>>> Terminal Visual for LED Sign
=======
>>>>>>> Fixes Requests
=======
>>>>>>> Terminal Visual for LED Sign
=======
>>>>>>> Fixes Requests
        stdscr.refresh()

    def creates_display(self, stdscr):
        curses.curs_set(0)
        current_row = 0
        print_menu(stdscr, current_row)
        checkKey = stdscr.getch()
        while checkKey != self.ESCKEY:
            checkKey = stdscr.getch()
        curses.endwin()
        exit()
        print_menu(stdscr, current_row)
mock.creates_display()
