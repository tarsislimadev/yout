#!/usr/bin/sh

. datetime.sh

apiKey=""

generativelanguage=$( curl -sL -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}" -H 'Content-Type: application/json' -d '{ "contents": [{ "parts":[{ "text": "Write a story about a magic backpack." }]}]}' )

echo "${generativelanguage}" > "generativelanguage.${datetime}.txt"
