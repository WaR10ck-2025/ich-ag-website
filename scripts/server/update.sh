#!/usr/bin/env bash
# Update = Install (idempotent nach Pionex-Muster: git pull + rebuild + restart)
exec "$(dirname "${BASH_SOURCE[0]}")/install.sh" "$@"
