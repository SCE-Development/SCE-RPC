#!/usr/bin/env python
#!/usr/bin/env python3
import curses
import argparse
parser = argparse.ArgumentParser(description='Print the mock for 2D printer.')
parser.add_argument('--mock-output', help="Displays Mock Output", )
args = parser.parse_args()


class SCEPrinterMock():
    ESCKEY = 27
    left_copies = 0
    right_copies = 0
    printer = ''

    def __init__(self):
        print("2D Mock")

    def get_printer(self, printer):
        self.printer = printer

    def add_left_printer_copies(self, count):
        self.left_copies += count

    def add_right_printer_copies(self, count):
        self.right_copies += count

    def visual_components(self):
        screen = curses.initscr()
        height, width = screen.getmaxyx()
        screen.border(0)

        title = "2D PRINTER MOCK"
        # coordinates for positioning title
        title_x = width//2 - len(title)//2
        title_y = height-(height-2)
        screen.addstr(title_y, title_x,
                      title, curses.A_BOLD)

        page = "Total Pages Printed: "
        status = "Status: ???"
        left_window = screen.derwin(
            20, 50, height-(height-5), (width//2)-50)
        left_window.box()
        left_window.immedok(True)
        left_window.refresh()
        left_window.addstr(2, 2, "Printer  # 1: HP-LaserJet-p2015dn-left")
        left_window.addstr(4, 2, page)
        left_window.addstr(4, 25, str(self.left_copies))
        left_window.addstr(5, 2, status)

        right_window = screen.derwin(
            20, 50, height-(height-5), width//2)
        right_window.box()
        right_window.immedok(True)
        right_window.refresh()
        right_window.addstr(2, 2, "Printer  # 2: HP-LaserJet-p2015dn-right")
        right_window.addstr(4, 2, page)
        right_window.addstr(4, 25, str(self.right_copies))
        right_window.addstr(5, 2, status)

        screen.addstr(height-8, title_x-15, "Total Server Uptime: ")
        screen.addstr(height-5, title_x-15, "Most Recently Used Printer: ")
        exit_message = "----------PRESS ESC TO EXIT---------"
        exit_message_width = width//2 - len(exit_message)//2
        screen.addstr(height-3, exit_message_width, exit_message)

        screen.refresh()
        exitKey = screen.getch()
        while exitKey != self.ESCKEY:
            exitKey = screen.getch()

    def create_visual(self):
        self.visual_components()
        curses.endwin()
        exit()

    # curses.wrapper(create_visual)
