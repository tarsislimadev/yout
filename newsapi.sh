#!/usr/bin/sh

. datetime.sh

apiKey=""

q="apple"

newsapi=$( curl -sL "https://newsapi.org/v2/everything?pageSize=100&language=pt&q=${q}&from=${year}-${month}-01&to=${year}-${month}-${day}&sortBy=publishedAt&apiKey=${apiKey}" | jq '.articles[].title' | sed -e 's/\[Removed\]//ig' | sed -e 's/null//ig' | sed -e 's/["|‘’]//ig' )

echo "${newsapi}" > "newsapi.${datetime}.txt"
