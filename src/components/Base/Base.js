import React from 'react';
import "./Base.css";

export default function Base() {
  return (
    <div className="base">
      <header className="base-header">
        <h1>Welcome to Our Application!</h1>
        <p>Discover how our app can simplify your daily tasks and enhance your productivity.</p>
      </header>
      <section className="base-details">
        <h2>About Our Application</h2>
        <p>Our application is designed to provide seamless user experiences tailored to your needs. With intuitive navigation and advanced features, we aim to make your workflow more efficient and enjoyable.</p>
        <p>Key Features:</p>
        <ul>
          <li>User-friendly interface for easy navigation</li>
          <li>Real-time data syncing and updates</li>
          <li>Secure user authentication and data protection</li>
          <li>Customizable settings to fit your preferences</li>
        </ul>
        <p>Join thousands of satisfied users who have enhanced their productivity with our app. Start exploring today!</p>
      </section>
    </div>
  );
}
