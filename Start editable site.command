#!/bin/bash
# Double-click to start the editable case-study site, then open it in your browser.
cd "$(dirname "$0")"
[ -f app/data/content.json ] || python3 -I app/seed.py
( sleep 1; open "http://127.0.0.1:8765" ) &
python3 -I app/server.py
