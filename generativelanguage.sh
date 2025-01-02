#!/usr/bin/sh

. ~/.datetime

. ~/.generativelanguage_api_key

generativelanguage=$( curl -sL -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${generativelanguage_api_key}" -H 'Content-Type: application/json' -d '{ "contents": [{ "parts":[{ "text": "Write a story about a magic backpack." }]}]}' )

echo "${generativelanguage}" > "generativelanguage.${datetime}.txt"
