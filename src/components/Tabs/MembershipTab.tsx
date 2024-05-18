import React, { useState } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { OrderResponseBody } from '@paypal/paypal-js';


export default function MembershipTab({ visible }: { visible: boolean }) {
  const [tokenAmount, setTokenAmount] = useState("50"); // Default amount is set to 1

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
        alert('Subscription canceled successfully!');
      } else {
        alert('Failed to cancel subscription. Please contact support.');
      }
    } else {
      alert('User email is not available. Cannot cancel subscription.');
    }
  };

  return (
    <PayPalScriptProvider options={{ clientId: "ATwlVltFMnElAXuqgfTae4TQ3vQcH7CEsGwgPog86d4xVFNqWH2tzm5s-TeIsoscATLGw3MjRDOlH11T", currency: "USD" , "vault": true}}>
      <motion.div
        initial="hidden"
        animate={visible ? "visible" : "hidden"}
        exit="exit"
        className={classNames("membership", { hidden: !visible })}
      >
        <div className="p-2">


          
          <div className="subscription-details mb-4 flex flex-row">

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' , marginLeft: '20px' }}>
            
</div>
<div style={{
        backgroundColor: '#333', // Color de fondo oscuro
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)', // Sombra más prominente para tema oscuro
        width: '95%', 
        margin: '40px auto', 
        maxWidth: '50vw', // Cap the width at 50% of the viewport width

        padding: '20px', 
        textAlign: 'center', // Texto centrado
        borderRadius: '8px', 
        fontFamily: 'Arial, sans-serif',
        color: '#ccc' // Color de texto claro para legibilidad en fondo oscuro
    }}>
        <h1 style={{ fontSize: '22px', color: '#fff' }}>Subscripción Regular</h1>
        <h2 style={{
            fontSize: '18px', 
            fontWeight: 'bold', 
            marginBottom: '10px', 
            color: '#4caf50' // Color verde brillante para resaltar la compra mínima
        }}>
            Compra mínima de $50 en tokens
        </h2>
        <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
            Cada token corresponde a aproximadamente una consulta al bot de QA. Las consultas y respuestas serán utilizadas para mejorar el sistema cuando se usen cuentas no empresariales.
        </p>
        <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
            Cada búsqueda utilizando el motor de búsqueda legal avanzado cuesta 0.1 token.
        </p>

        <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
            Contáctenos en: <a href="mailto:support@panamaaiq.com" style={{
                color: '#4caf50', // Color verde para enlaces para mejor visibilidad
                textDecoration: 'none'
            }}>
            support@panamaaiq.com</a> para activar una cuenta a través de <span style={{ color: '#0077cc' }}>Yappy</span> o <span style={{ color: '#0077cc' }}>Transferencia Bancaria</span>
        </p>
        <a href="mailto:support@panamaaiq.com" style={{
            display: 'block',
            width: '100%',
            padding: '10px',
            marginTop: '20px',
            backgroundColor: '#4caf50', // Botón verde para destacar
            color: '#fff', // Texto blanco para contraste
            border: 'none',
            borderRadius: '4px',
            textAlign: 'center',
            textDecoration: 'none',
            fontSize: '16px',
            cursor: 'pointer'
        }}>Contactar Soporte</a>
    </div>

            <div className="paypal-button-container ml-5 mr-4 flex flex-col items-center justify-center">


            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' , marginBottom: '20px'}}>
  <span className="text-white ml-2">Tokens: </span>
  <input
    type="number"
    min="50"
    value={tokenAmount}
    onChange={(e) => {
      const newAmount = Number(e.target.value);
      setTokenAmount(newAmount >= 50 ? newAmount.toString() : "50");

    }}
    className="text-white bg-blue-900 mx-auto block w-1/2 text-center"
  />
</div>
                <PayPalButtons
                key={tokenAmount}
                  style={{ layout: "vertical" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [{
                        amount: { value: tokenAmount} // Assuming each token costs $10
                      }],
                    });
                  }}
                  onApprove={(data, actions) => {
                    if (actions.order) {
                      const handleTokenPurchase = async (details: OrderResponseBody) => {
                        const userEmail = localStorage.getItem('email');
                        if (!userEmail) {
                          alert('User email is not available. Cannot process token purchase.');
                          return;
                        }
                      
                        // Prepare the data to be sent to the backend
                        const purchaseDetails = {
                          email: userEmail,
                          amountPaid: details.purchase_units[0].amount.value, // Assuming details structure from PayPal
                          transactionId: details.id, // Assuming details has an id field
                          tokensPurchased: tokenAmount
                        };
                      
                        // Send data to the backend
                        const response = await fetch('http://127.0.0.1:5090/handle_buy_tokens', {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify(purchaseDetails),
                        });
                      
                        if (response.ok) {
                          const responseData = await response.json();
                          if (responseData.success) {
                            alert(`Successfully purchased ${tokenAmount} tokens!`);
                          } else {
                            alert('Transaction verified but failed to update tokens. Please contact support.');
                          }
                        } else {
                          alert('Failed to communicate with the server. Please check your network connection and try again.');
                        }
                      };

                      return actions.order.capture().then(details => {
                        console.log('Order successfully captured:', details);
                        handleTokenPurchase(details);
                      });
                    }
                    return Promise.resolve(); // Add this line to return a Promise<void>
                  }}
                  onError={(err) => {
                    console.error('PayPal Button Error:', err);
                    alert('An error occurred with the PayPal button. ' + err.message);
                  }}
                />

<div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              </div>
              </div>
              
          </div>
        </div>
      </motion.div>
    </PayPalScriptProvider>
  );
}
