from collections import Counter
import pandas as pd
import random

class Deck:
    def __init__(self, nplayers) -> None:
        self.reset(nplayers)
    def reset(self, nplayers):
        self.nplayers = nplayers
        if nplayers == 1:
            self.drawPile = ["1", "1", "1", "1", "N", "N"]
        elif nplayers == 2:
            self.drawPile = ["1", "1", "2", "2", "N", "N"]
        elif nplayers == 3:
            self.drawPile = ["1", "2", "3", "W", "N", "N"]
        elif nplayers == 4:
            self.drawPile = ["1", "2", "3", "4", "N", "N"]
        self.discard = []
        self.shuffle()
    def shuffle(self):
        print("Shuffling")
        self.drawPile.extend(self.discard)
        self.discard = []
        random.shuffle(self.drawPile)
    def draw(self):
        if len(self.drawPile) == 0:
            self.shuffle()
        player = self.drawPile.pop(0)
        self.discard.append(player)
        print(f"{player}")
    def reveal(self):
        if len(self.drawPile) == 0:
            self.shuffle()
        print(f"Next player: {self.drawPile[0]}")
    def reorder(self):
        print(f"Current draw order: {' '.join(self.drawPile)}")
        customOrder = input("Enter new order:").split()
        oldFreq = Counter(self.drawPile)
        customFreq = Counter(customOrder)
        if oldFreq != customFreq:
            print("Number of cards has changed.")
            print(f'Original card counts:')
            allCards = set(self.drawPile)
            allCards = allCards.union(customOrder)
            counts = {'Old': {c: self.drawPile.count(c) for c in allCards},
                    'New': {c: customOrder.count(c) for c in allCards}}

            diff = pd.DataFrame(counts)
            print(diff)

            print("Try again")
            print()
            self.reorder()
        else:
            self.drawPile = customOrder
    def moveToDraw(self, shuffle=True):
        print(f'Current discard pile: {self.discard}')
        card = input('Enter card to return: ')
        if card not in self.discard:
            print('Card not in discard pile. No action taken.')
        else:
            self.discard.remove(card)
            self.drawPile.append(card)
            if shuffle:
                random.shuffle(self.drawPile)

def help():
    print('Available commands:')
    for cmd in cmds:
        print(f'-{cmd}')
        print(f'\t{cmds[cmd]["desc"]}')

deck = Deck(4)

def start():
    global deck
    nplayers = int(input("Enter the number of players (1,2,3, or 4):"))
    if nplayers not in [1,2,3,4]:
        print(f"Invalid number of players: {nplayers}")
        return
    deck.reset(nplayers)
    while(True):
        move = input(">>>")
        if move not in cmds:
            continue
        else:
            cmds[move]['function']()

cmds = {'help': {'desc': 'Print this help message.',
                'function': help},
        'next': {'desc': 'Advance to the next player.',
                'function': deck.draw},
        'n': {'desc': 'Same as "next".',
                'function': deck.draw},
        'reveal': {'desc': 'Show the next player in line, without advancing the turn.',
                'function': deck.reveal},
        'reorder': {'desc': 'Reveal the draw pile and return it in any order.',
                'function': deck.reorder},
        'return': {'desc': 'Shuffle a card from the discard pile into the draw pile.',
                'function': deck.moveToDraw},
        'exit': {'desc': 'Exit the game.',
                'function': exit},
        'start': {'desc': 'Begin the game.',
                'function': start}}

help()

while(True):
    move = input(">>>")
    if move == 'exit':
        exit()
    elif move == 'start':
        start()
    elif move == 'help':
        help()
    elif move in cmds:
        print("Game not yet started.")