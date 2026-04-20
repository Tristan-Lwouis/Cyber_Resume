#!/bin/bash
set -euo pipefail

trap 'echo "❌ Erreur pendant le déploiement. Le script s’est arrêté."; exit 1' ERR

echo "⏬ Récupération de la dernière version du repo..."
git fetch origin
git reset --hard origin/master
git clean -fd

echo "🐳 Redéploiement Docker..."
docker compose down --remove-orphans
docker compose up -d --build
cat << 'EOF'
_________        ___.                 __________                                    
\_   ___ \___.__.\_ |__   ___________ \______   \ ____   ________ __  _____   ____  
/    \  \<   |  | | __ \_/ __ \_  __ \ |       _// __ \ /  ___/  |  \/     \_/ __ \ 
\     \___\___  | | \_\ \  ___/|  | \/ |    |   \  ___/ \___ \|  |  /  Y Y  \  ___/ 
 \______  / ____| |___  /\___  >__|____|____|_  /\___  >____  >____/|__|_|  /\___  >
        \/\/          \/     \/  /_____/      \/     \/     \/            \/     \/ 
EOF
echo "Déploiement terminé avec succès"