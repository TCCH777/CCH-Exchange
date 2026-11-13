import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Instancia el cliente de Mercado Pago
const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN || 'TEST-XXXXXXXXX' });

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { shares, totalCOP, userEmail } = body;

    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: [
          {
            id: 'ACCION_CCH_FASE1',
            title: 'Acciones CCH Exchange - Fase Semilla',
            quantity: shares,
            unit_price: 50000,
            currency_id: 'COP',
          }
        ],
        payer: {
          email: userEmail,
        },
        back_urls: {
          success: 'https://tu-dominio.com/dashboard?status=success',
          failure: 'https://tu-dominio.com/dashboard?status=failure',
        },
        auto_return: 'approved',
      }
    });

    return NextResponse.json({ preferenceId: result.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error al conectar con Mercado Pago' }, { status: 500 });
  }
}
