import React from 'react';
import "./Base.css";

export default function Base() {
  return (
    <div className="base">
      <header className="base-header">
        <h1>Welcome to AAI Financials!</h1>
        <p>Where we prioritize your financial journey with trust, transparency, and expertise</p>
      </header>
      <section className="base-details">
        <h2>About Us</h2>
        <p>As independent mortgage advisors, we have a holistic view of the mortgage market, giving us access to a wide range of lenders and products. This allows us to tailor solutions that best fit your unique needs.
        </p>
        <p>Whether you're buying your first home, remortgaging, or exploring investment opportunities, we are here to secure the best deal for you.</p>
        <p>Our commitment is to guide you every step of the way, making the process smooth and stress-free while ensuring you achieve your homeownership goals with confidence. Let's build your future together.</p>
      </section>
    </div>
  );
}
