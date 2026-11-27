#!/bin/bash
# ==============================================================================
# Script de Aprovisionamiento y Despliegue en Azure VM (IP: 40.116.69.29)
# ==============================================================================

set -e

echo "=== 1. Actualizando paquetes del sistema en Azure ==="
sudo apt-get update -y && sudo apt-get upgrade -y
sudo apt-get install -y git curl ufw

echo "=== 2. Instalando Docker y Docker Compose oficial ==="
if ! command -v docker &> /dev/null; then
    curl -fsSL https://get.docker.com -o get-docker.sh
    sudo sh get-docker.sh
    sudo usermod -aG docker $USER
    sudo systemctl enable docker
    sudo systemctl start docker
fi

echo "=== 3. Levantando los contenedores de EduMaster.ai ==="
docker compose up -d --build

echo "=== DESPLIEGUE COMPLETADO CON EXITO ==="
echo "La plataforma esta accesible en: http://40.116.69.29"
