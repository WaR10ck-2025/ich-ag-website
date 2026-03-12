#!/usr/bin/env bash
# ich-ag-website – Schnellstart (nur docker compose up, kein rebuild)
set -e

INSTALL_DIR="$HOME/docker/ich-ag-website"

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; CYAN='\033[0;36m'; NC='\033[0m'
step() { echo -e "\n${CYAN}[*] $1${NC}"; }
ok()   { echo -e "${GREEN}[OK] $1${NC}"; }
warn() { echo -e "${YELLOW}[!]  $1${NC}"; }
fail() { echo -e "${RED}[FEHLER] $1${NC}"; exit 1; }

if [ ! -d "$INSTALL_DIR/.git" ]; then
    warn "Kein installiertes Repository gefunden. Führe zuerst install.sh aus."
    fail "Abgebrochen."
fi

step "Starte ich-ag-website..."
cd "$INSTALL_DIR"
docker compose up -d || fail "docker compose up fehlgeschlagen."
ok "Container gestartet."

step "Health-Check (max. 30s)..."
for i in $(seq 1 10); do
    sleep 3
    if curl -sf http://localhost:80/ &>/dev/null; then
        ok "Website erreichbar."
        break
    fi
    echo "  ... $((i * 3))s"
    if [ "$i" -eq 10 ]; then
        warn "Website antwortet nicht. Logs: docker compose logs --tail=20"
    fi
done

LOCAL_IP=$(hostname -I 2>/dev/null | awk '{print $1}')
echo ""
echo -e "${GREEN}  URL: ${CYAN}http://${LOCAL_IP}${NC}"
echo ""
