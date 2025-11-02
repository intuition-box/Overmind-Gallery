# The Overmind Gallery

## Overview

The Overmind Gallery is an art-first, auction-driven gallery built on the Intuition Network. Every sale is a live auction designed to let time, attention, and competition discover value.
Each artifact is listed with a starting price and an auction duration. Collectors place bids using $TRUST. When a new bid outbids the previous bidder, the previous bidder receives a dynamic outbid reward.


## Deployment

Project is live at:

**[The Overmind Gallery](https://overmind-gallery.intuition.box)**


## How It Works

When you are outbid, you can receive a reward. That reward increases when the new bidder jumps the price by a larger margin and is smaller for tiny increases. The reward cannot exceed 10% of the new bid.

Let:
B_prev = previous (outbid) bid amount (in $TRUST)
B_new = new winning bid amount (in $TRUST)
r = relative increase
MAX_P = maximum reward percent = 0.10 (10%)
p = reward percent
R = reward amount in $TRUST

Where:
MAX_P = 0.10 (10%)
r = (B_new - B_prev) / B_prev
p = (MAX_P * r)
R = (p * B_new)
