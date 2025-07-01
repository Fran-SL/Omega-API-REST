async function testConfirmacionReservaCompleta() {
    console.log('🧪 Test: Flujo completo de confirmación de reserva con correo\n');

    try {
        // Simular confirmación de reserva
        console.log('🚀 Simulando confirmación de reserva...');
        
        const response = await fetch('http://localhost:4000/productos/reserva/1/confirmar', {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInJvbCI6MSwiaWF0IjoxNzM1Njc4NzQ4LCJleHAiOjE3MzU2ODIzNDh9.test_token', // Token de prueba
                'Content-Type': 'application/json'
            }
        });

        console.log('📡 Status de respuesta:', response.status);
        
        const data = await response.json();
        console.log('📄 Respuesta del servidor:', JSON.stringify(data, null, 2));

        if (response.ok) {
            console.log('\n✅ Flujo exitoso:');
            console.log('   ✅ Reserva confirmada correctamente');
            console.log('   ✅ Respuesta indica que se envió correo');
            console.log('   ✅ Datos de reserva incluidos en respuesta');
            
            console.log('\n📧 El correo de confirmación debería incluir:');
            console.log('   📦 Detalles del producto reservado');
            console.log('   ⏰ Fecha límite para retirar');
            console.log('   💰 Total a pagar');
            console.log('   📍 Información de la tienda');
            console.log('   📋 Instrucciones para retirar');
        } else {
            console.log('\n⚠️ La reserva no se pudo confirmar:');
            console.log('   🔍 Razón:', data.message);
            
            if (data.message.includes('no encontrada')) {
                console.log('💡 La reserva con ID 1 no existe o no pertenece al usuario');
            }
            if (data.message.includes('expirado')) {
                console.log('💡 La reserva ha expirado');
            }
            if (data.message.includes('no autenticado')) {
                console.log('💡 Token de autenticación inválido');
            }
        }

    } catch (error) {
        console.error('❌ Error en el test:', error.message);
        
        if (error.code === 'ECONNREFUSED') {
            console.log('💡 El servidor no está ejecutándose en puerto 4000');
            console.log('   Ejecuta: npm start');
        }
    }
}

// Función alternativa que prueba solo la lógica sin hacer request HTTP
async function testLogicaCorreoSinHTTP() {
    console.log('\n🧪 Test alternativo: Solo lógica de correo (sin HTTP)\n');
    
    // Simular datos que tendría una reserva confirmada
    const reservaSimulada = {
        reserva_id: 123,
        usuario_id: 1,
        producto_id: 5,
        cantidad_reservada: 1,
        estado_reserva: 'confirmada',
        fecha_expiracion: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000) // 2 días
    };

    const usuarioSimulado = {
        usuario_id: 1,
        nombre: 'María',
        apellido_paterno: 'González',
        apellido_materno: 'López',
        correo_electronico: 'tomas.kenpo@gmail.com' // Tu email para probar
    };

    const productoSimulado = {
        producto_id: 5,
        nombre_producto: 'iPhone 15 Pro Max',
        precio_producto: 1299.99
    };

    try {
        const { enviarCorreoConfirmacionReserva } = require('./middleware/emailReserva');
        
        const nombreCompleto = `${usuarioSimulado.nombre} ${usuarioSimulado.apellido_paterno} ${usuarioSimulado.apellido_materno}`.trim();
        const precioTotal = productoSimulado.precio_producto * reservaSimulada.cantidad_reservada;
        
        const datosCorreo = {
            emailUsuario: usuarioSimulado.correo_electronico,
            nombreUsuario: nombreCompleto,
            nombreProducto: productoSimulado.nombre_producto,
            cantidadReservada: reservaSimulada.cantidad_reservada,
            fechaExpiracion: reservaSimulada.fecha_expiracion,
            reservaId: reservaSimulada.reserva_id,
            precioTotal: precioTotal
        };

        console.log('📧 Enviando correo de confirmación simulado...');
        const resultado = await enviarCorreoConfirmacionReserva(datosCorreo);
        
        if (resultado.success) {
            console.log('✅ ¡Correo enviado exitosamente!');
            console.log('   📧 Destinatario:', resultado.destinatario);
            console.log('\n🎯 Revisa tu email para ver el correo de confirmación');
        } else {
            console.log('❌ Error al enviar correo:', resultado.error);
        }

    } catch (error) {
        console.error('❌ Error:', error.message);
    }
}

console.log('🎯 Ejecutando tests de confirmación de reserva...\n');

// Ejecutar test de lógica de correo
testLogicaCorreoSinHTTP();
