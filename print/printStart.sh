#!/bin/bash

# cd /root/print/printer

# yarn

pm2 start /root/print/printer/processes.json

echo "start ok"

/bin/bash