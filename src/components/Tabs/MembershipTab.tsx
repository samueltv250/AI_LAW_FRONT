import React from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function MembershipTab({ visible }: { visible: boolean }) {
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
          <div className="subscription-details mb-4">
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <h2 className="text-lg font-bold mb-2">Subscribe for 100 Tokens / 100$ the first month</h2>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
            <p className="mb-4">100 tokens every month after for just $30/month</p>
            </div>
            <div className="paypal-button-container">
              <PayPalButtons
                style={{ layout: "vertical" }}
                createSubscription={(data, actions) => {
                  const userEmail = localStorage.getItem('email');
                  return actions.subscription.create({
                    plan_id: 'P-01B713726B9539812MXRLAWY',
                    custom_id: userEmail || undefined,
                    subscriber: {
                      email_address: userEmail,
                    },
                  });
                }}
                onApprove={(data, actions) => {
                  localStorage.setItem('tokens', '100');
                  if (!actions.subscription) {
                      console.error('Subscription actions are undefined');
                      alert('An error occurred during the subscription process. Please contact support.');
                      return Promise.reject(new Error('Subscription actions are undefined'));
                  }
              
                  return actions.subscription.get().then(async (details) => {
                      const userEmail = localStorage.getItem('email');
                      if (!userEmail) {
                          alert('User email is not available. Cannot activate subscription.');
                          return Promise.reject(new Error('User email is not available'));
                      }
              
                      const response = await fetch('/activate_subscription_api', {
                          method: 'POST',
                          headers: {
                              'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({ username: userEmail, subscriptionId: data.subscriptionID }),
                      });
              
                      if (!response.ok) {
                          alert('Failed to activate subscription. Please contact support.');
                          return Promise.reject(new Error('Failed to activate subscription'));
                      }
              
                      alert('Subscription activated successfully!');
                      return Promise.resolve();
                  }).catch((error) => {
                      console.error('Error during subscription get:', error);
                      alert('An error occurred during the subscription process. Please contact support.');
                      return Promise.reject(error);
                  });
              }}
              
                
              
                onError={(err) => {
                  // Error handling
                  console.error('PayPal Button Error:', err);
                  alert('An error occurred with the PayPal button.');
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
