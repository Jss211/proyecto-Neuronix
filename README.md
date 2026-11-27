# EduMaster.ai - Plataforma Empresarial de Aprendizaje Inteligente y Redes Neuronales

Sistema integral de gestión del aprendizaje, analítica predictiva en tiempo real y red neuronal multitarea desarrollado con base en la especificación técnica enterprise oficial.

---

## 1. Credenciales Preconfiguradas para Demostración

La aplicación cuenta con un **Selector Rápido de 1-Clic** en la pantalla de inicio de sesión para alternar entre perfiles de inmediato durante la sustentación:

| Rol | Correo Electrónico | Contraseña | Dashboard y Capacidades |
| :--- | :--- | :--- | :--- |
| **Administrador** | `admin@edumaster.ai` | `Admin2026!` | Visualizador de Red Neuronal interactivo en SVG, KPIs macro ($342,150 ingresos, 24,593 alumnos), mapa global, donut de avance y control de estados del modelo. |
| **Docente** | `docente@edumaster.ai` | `Docente2026!` | Gestión de cohortes asignadas, detección predictiva de riesgo de abandono (Cabeza C de la IA) y validación de evidencias/rúbricas. |
| **Estudiante** | `estudiante@edumaster.ai` | `Estudiante2026!` | Ruta de especialización en Deep Learning, recomendaciones del tutor IA con explicabilidad transparente y certificados verificables con código QR. |

---

## 2. Servidor Virtual en Microsoft Azure

*   **Nombre de Instancia:** `vm-neuronixmaster`
*   **Región:** `(US) North Central US`
*   **IP Pública Oficial:** `40.116.69.29`
*   **Sistema Operativo:** Ubuntu Server 24.04 LTS (x64)
*   **Tamaño:** `Standard_B2als_v2` (2 vCPUs, 4 GiB de RAM)
*   **Acceso Web:** `http://40.116.69.29`

---

## 3. Instrucciones de Despliegue en Azure

### Paso 1: Conectarse al servidor por SSH desde PowerShell
```powershell
ssh azureuser@40.116.69.29
```
*(Introduce la contraseña que definiste al crear la máquina).*

### Paso 2: Clonar o subir los archivos y ejecutar el aprovisionador
Dentro del servidor, ejecuta el script automatizado:
```bash
chmod +x deploy-azure.sh
./deploy-azure.sh
```

El script instalará Docker y levantará los contenedores de frontend y backend en menos de 3 minutos.

---

## 4. Ejecución en Entorno Local

Si deseas ejecutar o presentar el sistema localmente en tu equipo:

### Frontend (React + Vite)
```powershell
cd apps/web
npm run dev
```
Disponible en: `http://localhost:5173`

### Backend (FastAPI + PyTorch)
```powershell
cd apps/api
pip install -r requirements.txt
python main.py
```
Documentación OpenAPI Swagger en: `http://localhost:8000/docs`
