import curses
import argparse 

parser = argparse.ArgumentParser(description="Prints mock output.")
parser.add_argument('--mock-output', help = "Displays Mock Output", )
args = parser.parse_args()

class LedSignMock():
    sign_data = {
        "text": '',
        "brightness": '',
        "scroll-speed": '',
        "background-color": '',
        "font-color": '',
        "border-color":''
    }

    screen = curses.initscr()

    menu = ['   ','SCE LED Sign Visualization ', ' ','Current Text: ', 'Current Brightness: ',' ',
    'Current Scroll Speed:', 'Current Background Color: ', 'Current Font Color:',
    'Current Border Color: ' ]
    ESCKEY = 27

    def update_sign_visual(self, request):
        self.sign_data["text"] = request["text"]
        self.sign_data["brightness"] = str(request["brightness"])
        self.sign_data["scroll-speed"] = str(request["scroll-speed"])
        self.sign_data["background-color"] = request["background-color"]
        self.sign_data["font-color"] = request["font-color"]
        self.sign_data["border-color"] = request["border-color"]
        self.print_menu(0)
        self.screen.refresh()

    def print_menu(self, selected_row_idx):
        self.screen.clear()
        self.screen.border(0)
        height, width = self.screen.getmaxyx()
        for idx, row in enumerate(self.menu): #iterates over different menu options and aligns it
            x = width//3 - len(self.menu) 
            #calculates the location of the words (division changed by # of things in self.menu)
            y = height//3 - len(self.menu)//3 + idx
            self.screen.addstr(y, x, row)
            if idx == 3:
                self.screen.addstr(y ,x +25, self.sign_data["text"])
            elif idx == 4:
                self.screen.addstr(y,x+25,self.sign_data["brightness"])
            elif idx == 6:
                self.screen.addstr(y ,x +25,self.sign_data["scroll-speed"])
            elif idx == 7:
                self.screen.addstr(y,x +25,self.sign_data["background-color"])
            elif idx == 8:
                self.screen.addstr(y,x +25,self.sign_data["font-color"])
            elif idx == 9:
                self.screen.addstr(y,x +25,self.sign_data["border-color"])
        self.screen.refresh()

    def creates_display(self):
        curses.curs_set(0)
        current_row = 0
        self.print_menu(current_row)
        checkKey = self.screen.getch()
        while checkKey != self.ESCKEY:
            checkKey = self.screen.getch()
        curses.endwin()
        exit()
