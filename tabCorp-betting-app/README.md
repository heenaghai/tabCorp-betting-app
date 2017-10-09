#TabCorp tote-betting

Tote-betting is a betting application written in nodejs. 
Tote betting involves punters choosing the outcome of a race by placing bets into a pool of money. Punters who successfully predict the outcome of a race take a share of the pool proportional to their stake.
It currently involves three types of bets - Win, Place, Exacta. In tote betting pool is generated from individuals placing money on a Tote bet in a race and dividend paid out from the total pool collected.
Dividends are calculated based on the following rules-

# WIN
1. Punters must choose the winner of a race
2. 15% commission from the Win pool is deducted
3. The remaining total is split, proportionally to stake, amongst punters who chose the correct winning horse.

# Place
1. Punters must choose the first, second or third place horse in a race
2. 12% commission from the Place pool is deducted
3. The total pool is split evenly into 3 and each of these amounts is then split, proportionally to stake, amongst the punters who chose each placed horse

# Exacta
1. Punters must choose the first and second place runners in a race in the correct order
2. 18% commission from the Exacta pool is deducted
3. The remaining total is split, proportionally to stake, amongst punters who chose the correct first and second horse in correct order

##Input Format
Bet:\<product\>:\<selections\>:\<stake\> 
\<product\> is one of W,P,E
\<selection\> is either a single runner number (e.g. 4) for Win and Place, or two runner numbers (e.g.
4,3) for Exacta
\<stake\> is an amount in whole dollars (e.g. 35)

##Result Format
Result:\<first\>:\<second\>:\<third\>

##Output Format
\<product\>:\<winningSelections\>:\<dividend\>
The output against a specific product is not displayed if the dividend is 0.

## Intalling and Running the Application:
Please follow the below steps- 
1. Clone the respository
2. Run npm install within the cloned directory
3. Hit http://localhost:8000 , This will take you to home page where in enter all the bets & result(as the las line) in the given text area.
5. Click submit button to view output.