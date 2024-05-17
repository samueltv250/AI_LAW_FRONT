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
            
</div>
<div style={{
        backgroundColor: '#333', // Dark background color
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)', // More prominent shadow for dark theme
        width: '95%', 
        margin: '40px auto', 
        padding: '20px', 
        textAlign: 'center', // Centered text

        borderRadius: '8px', 
        fontFamily: 'Arial, sans-serif',
        color: '#ccc' // Light text color for readability on dark background
    }}>
        <h1 style={{ fontSize: '22px', color: '#fff' }}>$1000/month Subscription</h1>
        <h2 style={{
            fontSize: '18px', 
            fontWeight: 'bold', 
            marginBottom: '10px', 
            color: '#4caf50' // Bright red color to highlight the setup fee
        }}>
            Initial subscription setup fee is $1500
        </h2>
        <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
            1000 tokens per month with the option to purchase additional tokens by contacting support.
        </p>
        <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
            Each consultation consumes approximately 1 token.
        </p>
        <p style={{ fontSize: '16px', lineHeight: '1.5' }}>
            Contact us at: <a href="mailto:support@panamaaiq.com" style={{
                color: '#4caf50', // Green color for links for better visibility
                textDecoration: 'none'
            }}>
            support@panamaaiq.com</a> to activate an account via <span style={{ color: '#0077cc' }}>Yappy</span> or <span style={{ color: '#0077cc' }}>Wire Transfer</span>
        </p>
        <a href="mailto:support@panamaaiq.com" style={{
            display: 'block',
            width: '100%',
            padding: '10px',
            marginTop: '20px',
            backgroundColor: '#4caf50', // Green button to stand out
            color: '#fff', // White text for contrast
            border: 'none',
            borderRadius: '4px',
            textAlign: 'center',
            textDecoration: 'none',
            fontSize: '16px',
            cursor: 'pointer'
        }}>Contact Support</a>
    </div>



            <div className="paypal-button-container">
              <PayPalButtons
              
                style={{ layout: "vertical" }}
                createSubscription={(data, actions) => {
                  const userEmail = localStorage.getItem('email');
                  return actions.subscription.create({
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
                      alert('An error occurred during the subscription process. Please contact support.');
                      return Promise.reject(new Error('Subscription actions are undefined'));
                  }
         
              
                  return actions.subscription.get().then(async (details) => {
                      const userEmail = localStorage.getItem('email');
                      const subscriptionId = data.subscriptionID;


                      
                      if (!userEmail) {
                          alert('User email is not available. Cannot activate subscription.');
                          return Promise.reject(new Error('User email is not available'));
                      }
              
                      const response = await fetch('/activate_subscription_api', {
                          method: 'POST',
                          headers: {
                              'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({ username: userEmail, subscriptionId:  subscriptionId}),
                      });
              
                      if (!response.ok) {
                          alert('Failed to activate subscription. Please contact support.');
                          return Promise.reject(new Error('Failed to activate subscription' + response.statusText));
                      }
                      localStorage.setItem('tokens', '1000');
                      alert('Subscription activated successfully!');
                      return Promise.resolve();
                  }).catch((error) => {
                      console.error('Error during subscription get:', error);
                      alert('An error occurred during the subscription process. Please contact support. ' + error.message);
                      return Promise.reject(error);
                  });
              }}
              
                
              
              onError={(err) => {
                // Log the error details for debugging
                console.error('PayPal Button Error:', err);
            
                // Provide a more detailed error message
                let errorMessage = 'An error occurred with the PayPal button.';
                if (err.message) {
                  errorMessage += ' Error message: ' + err.message;
                }
                if (err.name) {
                  errorMessage += ' Error name: ' + err.name;
                }
                if (err.stack) {
                  errorMessage += ' Stack trace: ' + err.stack;
                }
            
                alert(errorMessage);
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
