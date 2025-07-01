# 🛒 Sistema de Reservas en Tiempo Real - Omega API

## 📋 Descripción

Sistema completo de reservas en tiempo real que permite a los usuarios reservar productos temporalmente antes de realizar la compra. Incluye manejo automático de stock, expiración de reservas y limpieza automática.

## 🚀 Nuevas Funcionalidades Implementadas

### ✨ Características Principales

1. **Reservas Temporales**: Los usuarios pueden reservar productos por un tiempo limitado (30 minutos por defecto)
2. **Manejo de Stock en Tiempo Real**: El stock se actualiza inmediatamente al reservar/cancelar
3. **Expiración Automática**: Las reservas expiran automáticamente y devuelven el stock
4. **Prevención de Reservas Múltiples**: Un usuario no puede reservar el mismo producto dos veces
5. **Limpieza Automática**: Job programado que limpia reservas expiradas cada 5 minutos
6. **Auditoría Completa**: Todas las acciones se registran en el sistema de auditoría

### 🛠️ Componentes Añadidos

- **Modelo de Reservas** (`models/reservaModel.js`)
- **Controlador de Reservas** (en `controllers/productosController.js`)
- **Rutas de Reservas** (en `routes/productosRoutes.js`)
- **Programador de Tareas** (`utils/reservaScheduler.js`)
- **Script de Base de Datos** (`database/crear_tabla_reservas.sql`)
- **Ejemplo de Frontend** (`frontend-ejemplo/reservas-ejemplo.html`)

## 🗄️ Configuración de Base de Datos

### 1. Crear la tabla de reservas

Ejecutar el script SQL en PostgreSQL:

```sql
-- Ubicado en: database/crear_tabla_reservas.sql
```

### 2. Instalar dependencias

```bash
npm install node-cron
```

## 🔗 API Endpoints

### Productos y Stock

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/productos` | Obtener todos los productos |
| `GET` | `/productos/:id/stock` | Obtener stock en tiempo real |

### Reservas (Requieren autenticación)

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `POST` | `/productos/:id/reservar` | Reservar producto |
| `PUT` | `/productos/reserva/:reservaId/confirmar` | Confirmar reserva |
| `DELETE` | `/productos/reserva/:reservaId/cancelar` | Cancelar reserva |
| `GET` | `/productos/mis-reservas` | Obtener mis reservas |

## 📝 Ejemplos de Uso

### 1. Obtener Stock de un Producto

```javascript
GET /productos/1/stock

Respuesta:
{
  "producto_id": 1,
  "nombre_producto": "Producto Ejemplo",
  "stock_disponible": 15,
  "precio_producto": 99.99,
  "disponible": true
}
```

### 2. Reservar Producto

```javascript
POST /productos/1/reservar
Authorization: Bearer <token>
Content-Type: application/json

{
  "cantidad": 2,
  "tiempo_expiracion": 30
}

Respuesta:
{
  "message": "Producto reservado exitosamente",
  "reserva": {
    "reserva_id": 123,
    "producto_id": 1,
    "cantidad_reservada": 2,
    "fecha_expiracion": "2025-06-27T15:30:00.000Z",
    "estado": "activa"
  },
  "producto": {
    "nombre": "Producto Ejemplo",
    "stock_restante": 13
  }
}
```

### 3. Confirmar Reserva

```javascript
PUT /productos/reserva/123/confirmar
Authorization: Bearer <token>

Respuesta:
{
  "message": "Reserva confirmada exitosamente",
  "reserva": {
    "reserva_id": 123,
    "estado": "confirmada",
    "fecha_confirmacion": "2025-06-27T15:15:00.000Z"
  }
}
```

### 4. Cancelar Reserva

```javascript
DELETE /productos/reserva/123/cancelar
Authorization: Bearer <token>

Respuesta:
{
  "message": "Reserva cancelada exitosamente. El stock ha sido devuelto.",
  "reserva": {
    "reserva_id": 123,
    "estado": "cancelada",
    "cantidad_devuelta": 2
  }
}
```

## 🧪 Pruebas

### Ejecutar pruebas automáticas

```bash
node test_reservas.js
```

Las pruebas incluyen:
- Login/registro de usuario
- Obtener productos y stock
- Reservar productos
- Verificar stock actualizado
- Cancelar reservas
- Confirmar reservas
- Verificar prevención de reservas duplicadas

## 🎨 Frontend de Ejemplo

Abrir `frontend-ejemplo/reservas-ejemplo.html` en el navegador para ver una implementación completa del sistema de reservas con:

- **Visualización en tiempo real** del stock
- **Botón de reserva inteligente** que se adapta al estado
- **Contador regresivo** para reservas activas
- **Notificaciones** para todas las acciones
- **Actualización automática** del stock cada 30 segundos

### Características del Frontend:

- ✅ Interfaz responsive y moderna
- ✅ Manejo de estados de reserva en tiempo real
- ✅ Contador regresivo visual
- ✅ Notificaciones toast
- ✅ Validaciones de stock
- ✅ Manejo de errores
- ✅ Actualización automática

## ⚙️ Configuración del Programador de Tareas

El sistema incluye un programador automático que:

- **Cada 5 minutos**: Limpia reservas expiradas y devuelve el stock
- **Cada hora**: Genera estadísticas de reservas

### Estados de Reserva

| Estado | Descripción |
|--------|-------------|
| `activa` | Reserva creada y vigente |
| `confirmada` | Usuario confirmó la compra |
| `cancelada` | Usuario canceló manualmente |
| `expirada` | Expiró automáticamente |

## 🔒 Seguridad

- ✅ Todas las rutas de reserva requieren autenticación
- ✅ Validación de parámetros de entrada
- ✅ Prevención de reservas duplicadas
- ✅ Transacciones de base de datos para consistencia
- ✅ Límites de cantidad por reserva (máximo 10 unidades)
- ✅ Registro completo en auditoría

## 📊 Monitoreo

### Logs del Sistema

El sistema genera logs automáticos para:
- Reservas creadas, confirmadas y canceladas
- Limpieza de reservas expiradas
- Errores de stock insuficiente
- Estadísticas horarias

### Ejemplo de logs:

```
🧹 Iniciando limpieza de reservas expiradas...
✅ Se limpiaron 3 reservas expiradas y se devolvió el stock
📊 Estadísticas de reservas: {"activas": 5, "confirmadas": 12, "canceladas": 2}
```

## 🚀 Iniciar el Sistema

1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Configurar base de datos** (ejecutar el script SQL)

3. **Iniciar servidor**:
   ```bash
   npm start
   # o para desarrollo:
   npm run dev
   ```

4. **Verificar logs**:
   - El programador de reservas se iniciará automáticamente
   - Verás mensajes de confirmación en la consola

## 🎯 Casos de Uso

### Para Usuarios Finales
- Reservar productos mientras deciden la compra
- Ver tiempo restante de reserva
- Cancelar si cambian de opinión
- Confirmar para proceder al pago

### Para Administradores
- Monitorear reservas en tiempo real
- Ver estadísticas de uso
- Gestionar stock dinámicamente

### Para Desarrolladores
- API RESTful completa
- Documentación clara
- Ejemplos de implementación
- Pruebas automatizadas

## 💡 Próximas Mejoras

- [ ] Dashboard administrativo para monitorear reservas
- [ ] Notificaciones push cuando la reserva está por expirar
- [ ] Integración con sistema de pagos
- [ ] Reservas por lotes para carritos de compras
- [ ] API de webhooks para notificaciones externas

## 📧 **NUEVA FUNCIONALIDAD: CORREO DE CONFIRMACIÓN**

### ✅ IMPLEMENTADO EXITOSAMENTE

Tu backend ahora **envía automáticamente un correo electrónico** al usuario cuando confirma una reserva de producto.

### 🔄 **Flujo con Correo:**

1. **Usuario Confirma Reserva**
   ```javascript
   PUT /productos/reserva/:reservaId/confirmar
   Authorization: Bearer jwt_token
   ```

2. **Backend Procesa y Envía Correo**
   - ✅ Valida la reserva
   - ✅ Cambia estado a 'confirmada'
   - ✅ Obtiene datos del usuario y producto
   - ✅ **Envía correo automático con detalles**
   - ✅ Registra auditoría
   - ✅ Responde al cliente

3. **Usuario Recibe Correo Profesional**

### 📧 **Contenido del Correo:**

#### **Información Incluida:**
- 🆔 **Número de reserva** (para referencia en tienda)
- 🛒 **Producto reservado** (nombre y cantidad)
- 💰 **Total a pagar** (precio calculado automáticamente)
- ⏰ **Fecha límite** para retirar (con countdown visual)
- 📍 **Información de la tienda** (dirección, horarios, contacto)
- 📋 **Instrucciones paso a paso** para retirar

#### **Diseño Profesional:**
- ✅ HTML responsivo con CSS inline
- ✅ Colores llamativos y diseño moderno
- ✅ Iconos emoji para mejor visualización
- ✅ Secciones bien organizadas
- ✅ Versión texto plano como fallback

### 🗂️ **Archivos Implementados:**

#### 1. `middleware/emailReserva.js`
```javascript
// Función principal
enviarCorreoConfirmacionReserva(datos)

// Parámetros:
{
  emailUsuario: string,
  nombreUsuario: string,
  nombreProducto: string,
  cantidadReservada: number,
  fechaExpiracion: Date,
  reservaId: number,
  precioTotal: number
}
```

#### 2. `controllers/productosController.js` (Modificado)
- ✅ Importa función de envío de correo
- ✅ Obtiene datos del usuario y producto
- ✅ Calcula precio total automáticamente
- ✅ Envía correo después de confirmar reserva
- ✅ Maneja errores sin afectar la confirmación

### 📱 **Nueva Respuesta del Endpoint:**

```json
{
  "message": "Reserva confirmada exitosamente. Se ha enviado un correo con los detalles.",
  "reserva": {
    "reserva_id": 123,
    "estado": "confirmada",
    "fecha_confirmacion": "2025-07-01T19:48:04.000Z"
  }
}
```

### 🧪 **Tests Ejecutados:**

✅ **test_email_reserva.js** - Envío básico de correo
✅ **test_confirmacion_completa.js** - Flujo completo simulado

### ⚙️ **Configuración Requerida:**

#### Variables de entorno (.env):
```env
EMAIL_USER=tu_email@gmail.com
EMAIL_PASSWORD=tu_app_password
```

#### Para Gmail:
1. Habilitar 2FA en tu cuenta Google
2. Generar "App Password" específica
3. Usar la App Password en EMAIL_PASSWORD

### 🎯 **Casos de Uso Cubiertos:**

1. ✅ **Reserva confirmada exitosamente** → Envía correo con todos los detalles
2. ✅ **Error al enviar correo** → La confirmación sigue funcionando (no crítico)
3. ✅ **Datos faltantes** → Maneja errores gracefully
4. ✅ **Cálculo automático** → Precio total basado en cantidad × precio unitario

### 🚀 **¿Cómo Usar desde el Frontend?**

```javascript
// Confirmar reserva
fetch('/productos/reserva/123/confirmar', {
  method: 'PUT',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  }
})
.then(response => response.json())
.then(data => {
  if (data.message.includes('enviado un correo')) {
    // El usuario recibirá correo automáticamente
    showSuccess('Reserva confirmada. Revisa tu correo.');
  }
});
```

### 🎉 **RESULTADO FINAL:**

**Tu sistema de reservas ahora es completamente profesional:**
- ✅ Reserva temporal de productos
- ✅ Confirmación con correo automático
- ✅ Información completa para el cliente
- ✅ Proceso claro para retirar en tienda
- ✅ Manejo robusto de errores

**¡Los usuarios ahora reciben toda la información necesaria por correo cuando confirman su reserva!**
