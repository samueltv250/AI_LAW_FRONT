import React, { useState } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function MembershipTab({ visible }: { visible: boolean }) {
  // Define subscription cost
  const subscriptionCost = "300.00"; // Monthly subscription cost
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
        alert('Subscription canceled successfully!');
      } else {
        alert('Failed to cancel subscription. Please contact support.');
      }
    } else {
      alert('User email is not available. Cannot cancel subscription.');
    }
  };
  return (
    <PayPalScriptProvider options={{ clientId: "ATwlVltFMnElAXuqgfTae4TQ3vQcH7CEsGwgPog86d4xVFNqWH2tzm5s-TeIsoscATLGw3MjRDOlH11T", currency: "USD" }}>
      <motion.div
        initial="hidden"
        animate="visible"
        exit="exit"
        className={classNames("membership", { hidden: !visible })}
      >
        <div className="p-2">
          <div className="subscription-details mb-4">
            <h2 className="text-lg font-bold mb-2">Subscribe for 1000 Tokens</h2>
            <p className="mb-4">Get 1000 tokens every month for just $300/month.</p>
            
            {/* PayPal Button for Subscription */}
            <div className="paypal-button-container">
            <PayPalButtons
    style={{ layout: "vertical" }}
    createOrder={(data, actions) => {
      const userEmail = localStorage.getItem('email');
        if (actions.order && userEmail) {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: subscriptionCost,
              },
              custom_id: userEmail, 
              description: "Monthly Subscription for 1000 tokens",
            }],
          });
        } else {
          // Return a rejected promise if actions.order is undefined
          return Promise.reject(new Error('Order creation failed'));
        }
    }}
    onApprove={(data, actions) => {
        if (actions.order) {
            return actions.order.capture().then(async (details) => {
                const userEmail = localStorage.getItem('email');
                if (userEmail) {
                    const response = await fetch('/activate_subscription_api', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ username: userEmail, subscriptionId: details.id}),
                    });

                    if (response.ok) {
                        alert('Subscription activated successfully!');
                    } else {
                        alert('Failed to activate subscription. Please contact support.');
                    }
                } else {
                    alert('User email is not available. Cannot activate subscription.');
                }
            }).catch((error) => {
                console.error('Error during order capture:', error);
                alert('An error occurred during the order capture process. Please contact support.');
            });
        } else {
            // Alert and return a rejected promise if actions.order is undefined
            alert('Order capture failed because actions.order is undefined.');
            return Promise.reject(new Error('Order capture failed because actions.order is undefined.'));
        }
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
                Cancel Subscription
              </button>
            </div>

            </div>
            
          </div>
        </div>
      </motion.div>
    </PayPalScriptProvider>
  );
}




