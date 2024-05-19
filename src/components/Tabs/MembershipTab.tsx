import React, { useState } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { OrderResponseBody } from '@paypal/paypal-js';

export default function MembershipTab({ visible }: { visible: boolean }) {
  const [tokenAmount, setTokenAmount] = useState("50"); // Default amount is set to 50

  const cancelSubscription = async () => {
    const userEmail = localStorage.getItem('email');

    if (userEmail) {
      const response = await fetch('http://127.0.0.1:5090/cancel_subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: userEmail }),
      });

      if (response.ok) {
        localStorage.setItem('tokens', '0');
        alert('¡Suscripción cancelada con éxito!');
      } else {
        alert('Error al cancelar la suscripción. Por favor, contacte al soporte.');
      }
    } else {
      alert('El correo electrónico del usuario no está disponible. No se puede cancelar la suscripción.');
    }
  };

  return (
    <PayPalScriptProvider options={{ clientId: "ATwlVltFMnElAXuqgfTae4TQ3vQcH7CEsGwgPog86d4xVFNqWH2tzm5s-TeIsoscATLGw3MjRDOlH11T", currency: "USD", "vault": true }}>
      <motion.div
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
        exit="exit"
        className={classNames("membership", { hidden: !visible })}
        style={{
          padding: '20px',
          backgroundColor: '#1e1e1e',
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
          maxWidth: '600px',
          margin: '0 auto',
          color: '#ccc'
        }}
      >
        <div style={{ padding: '10px' }}>
          <div className="subscription-details mb-4 flex flex-row">
            <div style={{ width: '100%', textAlign: 'center' }}>
              <h1 style={{ fontSize: '22px', color: '#fff' }}>Subscripción Regular</h1>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', color: '#4caf50' }}>
                Compra mínima de $50 en tokens
              </h2>
              <p style={{ fontSize: '16px', lineHeight: '1.5', color: '#bbb' }}>
                Cada token corresponde a aproximadamente una consulta al bot de QA. Las consultas y respuestas serán utilizadas para mejorar el sistema cuando se usen cuentas no empresariales.
              </p>
              <p style={{ fontSize: '16px', lineHeight: '1.5', color: '#bbb' }}>
                Cada búsqueda utilizando el motor de búsqueda legal avanzado cuesta 0.1 token.
              </p>
              <p style={{ fontSize: '16px', lineHeight: '1.5', color: '#bbb' }}>
                Contáctenos en: <a href="mailto:support@panamaaiq.com" style={{ color: '#4caf50', textDecoration: 'none' }}>support@panamaaiq.com</a> para activar una cuenta a través de <span style={{ color: '#0077cc' }}>Yappy</span> o <span style={{ color: '#0077cc' }}>Transferencia Bancaria</span>.
              </p>
              <a href="mailto:support@panamaaiq.com" style={{
                display: 'inline-block',
                padding: '10px 20px',
                marginTop: '20px',
                backgroundColor: '#4caf50',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                textAlign: 'center',
                textDecoration: 'none',
                fontSize: '16px',
                cursor: 'pointer'
              }}>Contactar Soporte</a>
            </div>
          </div>

          <div className="paypal-button-container flex flex-col items-center justify-center" style={{ marginTop: '20px' }}>
            <div style={{ width: '100%', marginBottom: '20px', textAlign: 'center' }}>
              <label className="text-white" style={{ display: 'block', marginBottom: '10px' }}>Tokens:</label>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <button onClick={() => setTokenAmount((prev) => (Number(prev) > 50 ? (Number(prev) - 1).toString() : "50"))} style={{ marginRight: '10px', backgroundColor: '#333', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>-</button>
                <input
                  type="number"
                  min="50"
                  value={tokenAmount}
                  onChange={(e) => {
                    const newAmount = Number(e.target.value);
                    setTokenAmount(newAmount >= 50 ? newAmount.toString() : "50");
                  }}
                  className="text-black bg-gray-800 p-2 rounded text-center"
                  style={{ width: '60%', margin: '0 auto', border: '1px solid #555', color: '#ccc' }}
                />
                <button onClick={() => setTokenAmount((prev) => (Number(prev) + 1).toString())} style={{ marginLeft: '10px', backgroundColor: '#333', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>+</button>
              </div>
            </div>

            <PayPalButtons
              key={tokenAmount}
              style={{ layout: "vertical" }}
              createOrder={(data, actions) => {
                return actions.order.create({
                  intent: "CAPTURE",
                  purchase_units: [{
                    amount: { value: tokenAmount } // Assuming each token costs $10
                  }],
                  application_context: {
                    shipping_preference: "NO_SHIPPING"
                  }        
                });
              }}
              onApprove={(data, actions) => {
                if (actions.order) {
                  const handleTokenPurchase = async (details: OrderResponseBody) => {
                    const userEmail = localStorage.getItem('email');
                    if (!userEmail) {
                      alert('El correo electrónico del usuario no está disponible. No se puede procesar la compra de tokens.');
                      return;
                    }
                    const purchaseDetails = {
                      email: userEmail,
                      amountPaid: details.purchase_units[0].amount.value,
                      transactionId: details.id,
                      tokensPurchased: tokenAmount
                    };
                    const response = await fetch('http://127.0.0.1:5090/handle_buy_tokens', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify(purchaseDetails),
                    });
                    if (response.ok) {
                      const responseData = await response.json();
                      if (responseData.success) {
                        alert(`¡Compra de ${tokenAmount} tokens realizada con éxito!`);
                      } else {
                        alert('Transacción verificada pero fallo al actualizar los tokens. Por favor, contacte al soporte.');
                      }
                    } else {
                      alert('Error al comunicar con el servidor. Por favor, revise su conexión a la red e intente nuevamente.');
                    }
                  };
                  return actions.order.capture().then(details => {
                    console.log('Order successfully captured:', details);
                    handleTokenPurchase(details);
                  });
                }
                return Promise.resolve();
              }}
              onError={(err) => {
                console.error('PayPal Button Error:', err);
                alert('Ocurrió un error con el botón de PayPal. ' + err.message);
              }}
            />
          </div>
        </div>
      </motion.div>
    </PayPalScriptProvider>
  );
}
