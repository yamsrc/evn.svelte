#!/bin/bash
mkdir -p ./.certs
TRUST_STORES=system mkcert -cert-file ./.certs/cert.pem -key-file ./.certs/key.pem $(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}') localhost
