#!/usr/bin/sh

# inputs

METHOD="search"

Q="${1}"

# runner

RESP=$( sh get.sh "${METHOD}" "q=${Q}" )

# outputs

sh create.sh "${METHOD}" "${Q}" "json" "${RESP}"
