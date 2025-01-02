#!/usr/bin/sh

path="${1}"

queries="${2}"

. ~/.youtube_api_key

curl -sL "https://youtube.googleapis.com/youtube/v3/${path}?key=${youtube_api_key}&${queries}"
