#!/usr/bin/env bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# ── Farb-Hilfsfunktionen ──────────────────────────────────────────────────────
RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; CYAN='\033[0;36m'; NC='\033[0m'
step() { echo -e "\n${CYAN}[*] $1${NC}"; }
ok()   { echo -e "${GREEN}[OK] $1${NC}"; }
warn() { echo -e "${YELLOW}[!]  $1${NC}"; }
fail() { echo -e "${RED}[FEHLER] $1${NC}"; exit 1; }

# ── Banner ────────────────────────────────────────────────────────────────────
echo -e "${CYAN}"
cat << 'EOF'
  ich-ag-website – Linux Install
EOF
echo -e "${NC}"

# ── [0] Git: Clone oder Pull (Pionex-Muster) ─────────────────────────────────
REPO_URL="https://github.com/WaR10ck-2025/ich-ag-website.git"
INSTALL_DIR="$HOME/docker/ich-ag-website"

step "Repository aktualisieren..."
if command -v git &>/dev/null; then
    if [ -d "$INSTALL_DIR/.git" ]; then
        git -C "$INSTALL_DIR" pull --ff-only || fail "git pull fehlgeschlagen."
        ok "Repository aktualisiert (git pull)."
    else
        git clone "$REPO_URL" "$INSTALL_DIR" || fail "git clone fehlgeschlagen."
        ok "Repository geklont nach $INSTALL_DIR."
    fi
else
    warn "Git nicht gefunden – überspringe Clone/Pull (lokales Verzeichnis wird verwendet)."
    INSTALL_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
fi

PROJECT_ROOT="$INSTALL_DIR"
echo "Project root: $PROJECT_ROOT"

# ── [1] Docker installieren ───────────────────────────────────────────────────
step "Prüfe Docker..."
if ! command -v docker &>/dev/null; then
    warn "Docker nicht gefunden. Installiere Docker..."
    curl -fsSL https://get.docker.com | sh
    sudo usermod -aG docker "$USER"
    ok "Docker installiert. Bitte neu einloggen falls nötig."
else
    ok "Docker gefunden: $(docker --version)"
fi

# ── [2] Docker Compose Plugin ─────────────────────────────────────────────────
step "Prüfe Docker Compose..."
if ! docker compose version &>/dev/null; then
    warn "Docker Compose Plugin fehlt. Installiere..."
    sudo apt-get update && sudo apt-get install -y docker-compose-plugin
fi
ok "Docker Compose: $(docker compose version)"

# ── [3] Docker Image bauen ────────────────────────────────────────────────────
step "Baue Docker Image (Multi-Stage: Node → nginx)..."
cd "$PROJECT_ROOT"
docker compose build || fail "docker compose build fehlgeschlagen."
ok "Docker Image gebaut."

# ── [4] Service starten ───────────────────────────────────────────────────────
step "Starte ich-ag-website..."
docker compose up -d || fail "docker compose up fehlgeschlagen."
ok "Container gestartet."

# ── [5] Health-Check ──────────────────────────────────────────────────────────
step "Warte auf Server-Start (max. 30 Sekunden)..."
for i in $(seq 1 10); do
    sleep 3
    if curl -sf http://localhost:80/ &>/dev/null; then
        ok "Website erreichbar."
        break
    fi
    echo "  ... $((i * 3))s"
    if [ "$i" -eq 10 ]; then
        warn "Website antwortet nicht. Logs:"
        docker compose logs --tail=20
        fail "Server nicht erreichbar."
    fi
done

# ── [6] IP-Adresse ermitteln ──────────────────────────────────────────────────
LOCAL_IP=$(hostname -I 2>/dev/null | awk '{print $1}')

# ── Abschluss ─────────────────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}═══════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  ich-ag-website – Setup erfolgreich!${NC}"
echo -e "${GREEN}═══════════════════════════════════════════════════════${NC}"
echo ""
echo -e "  Lokal:   ${CYAN}http://localhost${NC}"
echo -e "  Netzwerk: ${CYAN}http://${LOCAL_IP}${NC}"
echo ""
echo    "  Logs:    docker compose -f $PROJECT_ROOT/docker-compose.yml logs -f"
echo    "  Stoppen: docker compose -f $PROJECT_ROOT/docker-compose.yml down"
echo ""
