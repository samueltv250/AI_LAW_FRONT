import React, { useState } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { OrderResponseBody } from '@paypal/paypal-js';

export default function EmpresaMembershipTab({ visible }: { visible: boolean }) {
  const [tokenAmount, setTokenAmount] = useState("50"); // Default amount is set to 50

  const cancelSubscription = async () => {
    const userEmail = localStorage.getItem('email');

    if (userEmail) {
      const response = await fetch('/cancel_subscription', {
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
              <h1 style={{ fontSize: '22px', color: '#fff', marginTop: '20px' }}>Subscripción Empresariales</h1>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px', color: '#4caf50' }}>
                Tarifa inicial de configuración de $1500 y $1000/mes después
              </h2>
              <p style={{ fontSize: '16px', lineHeight: '1.5', color: '#bbb' }}>
                Incluye 1500 tokens por mes. Las cuentas empresariales garantizan que sus datos solo serán vistos por usted y se almacenarán únicamente en su dispositivo, sin utilizarse para mejorar el sistema.
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
            <PayPalButtons
              style={{ layout: "vertical" }}
              createSubscription={(data, actions) => {
                const userEmail = localStorage.getItem('email');
                return actions.subscription.create({
                  application_context: {
                    shipping_preference: "NO_SHIPPING"
                  },

                  plan_id: 'P-14841027AX447721SMY3PZZY',
                  custom_id: userEmail || undefined,
                  subscriber: {
                    email_address: userEmail,
                  },
                });
              }}
              onApprove={(data, actions) => {
                if (!actions.subscription) {
                  console.error('Subscription actions are undefined');
                  alert('Ocurrió un error durante el proceso de suscripción. Por favor, contacte al soporte.');
                  return Promise.reject(new Error('Subscription actions are undefined'));
                }

                return actions.subscription.get().then(async (details) => {
                  const userEmail = localStorage.getItem('email');
                  const subscriptionId = data.subscriptionID;

                  if (!userEmail) {
                    alert('El correo electrónico del usuario no está disponible. No se puede activar la suscripción.');
                    return Promise.reject(new Error('User email is not available'));
                  }

                  const response = await fetch('/activate_subscription_api', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username: userEmail, subscriptionId: subscriptionId }),
                  });

                  if (!response.ok) {
                    alert('Error al activar la suscripción. Por favor, contacte al soporte.');
                    return Promise.reject(new Error('Failed to activate subscription' + response.statusText));
                  }
                  localStorage.setItem('tokens', '1000');
                  alert('¡Suscripción activada con éxito!');
                  return Promise.resolve();
                }).catch((error) => {
                  console.error('Error during subscription get:', error);
                  alert('Ocurrió un error durante el proceso de suscripción. Por favor, contacte al soporte. ' + error.message);
                  return Promise.reject(error);
                });
              }}
              onError={(err) => {
                console.error('PayPal Button Error:', err);
                alert('Ocurrió un error con el botón de PayPal. ' + err.message);
              }}
            />

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <button onClick={cancelSubscription} style={{
                backgroundColor: 'red',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 'bold',
              }}>
                Cancelar Suscripción
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </PayPalScriptProvider>
  );
}
