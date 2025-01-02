#!/usr/bin/sh

# inputs

METHOD="captions"

VIDEO_ID="${1}"

# runner

RESP=$( sh get.sh "${METHOD}" "videoId=${VIDEO_ID}" )

# outputs

sh create.sh "${METHOD}" "${VIDEO_ID}" "json" "${RESP}"
