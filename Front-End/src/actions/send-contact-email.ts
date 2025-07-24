"use server"

interface ContactFormState {
  name: string
  email: string
  subject: string
  message: string
}

export async function sendContactEmail(prevState: any, formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const subject = formData.get("subject") as string
  const message = formData.get("message") as string

  // Validación básica en el servidor (adicional a la del cliente)
  if (!name || !email || !subject || !message) {
    return { success: false, message: "Todos los campos obligatorios deben ser completados." }
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
    return { success: false, message: "El correo electrónico no es válido." }
  }

  // --- SIMULACIÓN DE ENVÍO DE CORREO ---
  // En un entorno real, aquí integrarías un servicio de envío de correos
  // como Nodemailer, SendGrid, Mailgun, etc.
  // Por ejemplo, con Nodemailer:
  /*
  import nodemailer from 'nodemailer';

  const transporter = nodemailer.createTransport({
    service: 'gmail', // o 'smtp', 'SendGrid', etc.
    auth: {
      user: process.env.EMAIL_USER, // Configura estas variables de entorno en Vercel
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER, // Tu correo de envío
    to: 'diego.anchundia.hd@gmail.com', // Tu correo personal
    subject: `Mensaje de Contacto: ${subject} (de ${name})`,
    html: `
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Correo:</strong> ${email}</p>
      <p><strong>Asunto:</strong> ${subject}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado con éxito a diego.anchundia.hd@gmail.com');
    return { success: true, message: "¡Tu mensaje ha sido enviado con éxito! Te responderemos a la brevedad." };
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    return { success: false, message: "Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo más tarde." };
  }
  */

  // Simulación de retardo para mostrar el estado de envío
  await new Promise((resolve) => setTimeout(resolve, 2000))

  console.log("--- Simulación de Envío de Correo ---")
  console.log(`De: ${name} <${email}>`)
  console.log(`Para: diego.anchundia.hd@gmail.com`)
  console.log(`Asunto: ${subject}`)
  console.log(`Mensaje: ${message}`)
  console.log("------------------------------------")

  // Simulación de éxito
  return { success: true, message: "¡Tu mensaje ha sido enviado con éxito! Te responderemos a la brevedad." }
}
