const { enviarCorreoConfirmacionReserva } = require('./middleware/emailReserva');

async function testEmailReserva() {
    console.log('🧪 Test: Envío de correo de confirmación de reserva\n');

    // Datos de prueba para el correo
    const datosReservaPrueba = {
        emailUsuario: 'tomas.kenpo@gmail.com', // Cambia por tu email para probar
        nombreUsuario: 'Juan Carlos Pérez González',
        nombreProducto: 'Laptop Gaming ROG Strix G15',
        cantidadReservada: 2,
        fechaExpiracion: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 días desde ahora
        reservaId: 12345,
        precioTotal: 2599.99
    };

    console.log('📋 Datos de la reserva de prueba:');
    console.log('   📧 Email:', datosReservaPrueba.emailUsuario);
    console.log('   👤 Usuario:', datosReservaPrueba.nombreUsuario);
    console.log('   🛒 Producto:', datosReservaPrueba.nombreProducto);
    console.log('   📊 Cantidad:', datosReservaPrueba.cantidadReservada);
    console.log('   💰 Total:', `$${datosReservaPrueba.precioTotal.toLocaleString('es-ES')}`);
    console.log('   📅 Expira:', datosReservaPrueba.fechaExpiracion.toLocaleString('es-ES'));
    console.log('   🆔 Reserva ID:', datosReservaPrueba.reservaId);

    try {
        console.log('\n📧 Enviando correo de confirmación...');
        
        const resultado = await enviarCorreoConfirmacionReserva(datosReservaPrueba);
        
        if (resultado.success) {
            console.log('\n✅ ¡Correo enviado exitosamente!');
            console.log('   📧 Destinatario:', resultado.destinatario);
            console.log('   🆔 Message ID:', resultado.messageId);
            console.log('\n🎯 Revisa tu bandeja de entrada para ver el correo de confirmación');
            console.log('   💡 Si no lo ves, revisa la carpeta de spam/promociones');
        } else {
            console.log('\n❌ Error al enviar el correo:');
            console.log('   🔍 Error:', resultado.error);
        }

    } catch (error) {
        console.error('\n❌ Error en el test:', error.message);
        
        if (error.message.includes('auth') || error.message.includes('password')) {
            console.log('\n💡 Posibles soluciones:');
            console.log('   1. Verifica que EMAIL_USER y EMAIL_PASSWORD estén en .env');
            console.log('   2. Si usas Gmail, asegúrate de tener una "App Password"');
            console.log('   3. Verifica que 2FA esté habilitado en tu cuenta Google');
        }
    }
}

// Ejecutar test solo si no estamos en producción
if (process.env.NODE_ENV !== 'production') {
    testEmailReserva();
} else {
    console.log('Test deshabilitado en producción');
}
