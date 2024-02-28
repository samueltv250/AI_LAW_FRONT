import React, { useState } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function MembershipTab({ visible }: { visible: boolean }) {
  // Define subscription cost
  const subscriptionCost = "300.00"; // Monthly subscription cost

  return (
    <PayPalScriptProvider options={{ clientId: "YOUR_CLIENT_ID", currency: "USD" }}>
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
                  return actions.order.create({
                    purchase_units: [{
                      amount: {
                        value: subscriptionCost, // Subscription cost
                      },
                      description: "Monthly Subscription for 1000 tokens",
                    }],
                  });
                }}
                onApprove={async (data, actions) => {
                  if (actions.order) {
                    await actions.order.capture();
                    alert(`Subscription successful! Welcome, ${data.payerID}.`);
                    // Here you can call your backend to update the subscription status
                  }
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </PayPalScriptProvider>
  );
}
