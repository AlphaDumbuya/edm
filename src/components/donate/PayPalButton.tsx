"use client";
import { useEffect } from "react";

declare global {
  interface Window {
    paypal?: any;
  }
}

export default function PayPalButton() {
  useEffect(() => {
    // Dynamically load the PayPal SDK if not already present
    if (!window.paypal) {
      const script = document.createElement("script");
      script.src =
        "https://www.paypal.com/sdk/js?client-id=BAAtVyCFo0kWxiZ_FS5BS3QSNnnJ4VCn7sxndZ-UkJ6SiN2zhUFrTlswPBEppkaoUOpqaMKHGfBkw1tHWA&components=hosted-buttons&currency=USD"; // Removed enable-funding=venmo
      script.async = true;
      script.onload = () => {
        if (window.paypal && window.paypal.HostedButtons) {
          window.paypal
            .HostedButtons({
              hostedButtonId: "QQJUCWAXAX3JE",
            })
            .render("#paypal-container-QQJUCWAXAX3JE");
        }
      };
      document.body.appendChild(script);
    } else if (window.paypal && window.paypal.HostedButtons) {
      window.paypal
        .HostedButtons({
          hostedButtonId: "QQJUCWAXAX3JE",
        })
        .render("#paypal-container-QQJUCWAXAX3JE");
    }
  }, []);

  return <div id="paypal-container-QQJUCWAXAX3JE"></div>;
}
