import { NextRequest, NextResponse } from 'next/server';

// Tipo para los datos del formulario
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

export async function POST(request: NextRequest) {
  try {
    // Parsear el body de la petición
    const body: ContactFormData = await request.json();
    
    // Validación básica
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Nombre, email y mensaje son requeridos' },
        { status: 400 }
      );
    }
    
    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }
    
    // TODO: Implementar envío de email real
    // Opciones:
    // 1. Resend (recomendado): https://resend.com/docs/send-with-nextjs
    // 2. SendGrid: https://www.twilio.com/docs/sendgrid/for-developers/sending-email/v3-nodejs-code-example
    // 3. Nodemailer con SMTP
    
    // Por ahora, simulamos el envío exitoso
    console.log('Formulario de contacto recibido:', {
      name: body.name,
      email: body.email,
      phone: body.phone || 'No proporcionado',
      company: body.company || 'No proporcionada',
      message: body.message,
      timestamp: new Date().toISOString()
    });
    
    // Si quieres usar Resend (instalar: npm install resend):
    /*
    import { Resend } from 'resend';
    const resend = new Resend(process.env.RESEND_API_KEY);
    
    await resend.emails.send({
      from: 'contacto@herramaq.com',
      to: process.env.CONTACT_EMAIL || 'ventas@herramaq.com',
      subject: `Nuevo contacto de ${body.name}`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Teléfono:</strong> ${body.phone || 'No proporcionado'}</p>
        <p><strong>Empresa:</strong> ${body.company || 'No proporcionada'}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${body.message}</p>
      `
    });
    */
    
    // Respuesta exitosa
    return NextResponse.json(
      { 
        success: true, 
        message: 'Mensaje enviado correctamente. Nos pondremos en contacto pronto.' 
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Error procesando formulario de contacto:', error);
    return NextResponse.json(
      { error: 'Error al procesar el formulario. Por favor intente nuevamente.' },
      { status: 500 }
    );
  }
}

// Opcional: manejar método GET (devolver método no permitido)
export async function GET() {
  return NextResponse.json(
    { error: 'Método no permitido' },
    { status: 405 }
  );
}
