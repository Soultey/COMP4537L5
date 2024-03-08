#!/bin/bash

if [ $# -ne 2 ]; then
    echo "Usage: $0 [file-to-monitor] [command-to-run]"
    exit 1;
fi

MONITORED_FILE=$1

COMMAND_TO_RUN=$2

while true; do
    inotifywait -e close_write "$MONITORED_FILE"
    $COMMAND_TO_RUN
done
