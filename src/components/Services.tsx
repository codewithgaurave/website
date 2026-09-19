"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import HotelStaffHiringModal from '@/components/modals/HotelStaffHiringModal';
import HomeCookHiringModal from '@/components/modals/HomeCookHiringModal';
import DailyStaffHiringModal from '@/components/modals/DailyStaffHiringModal';

export default function Services() {
  const [isHotelModalOpen, setIsHotelModalOpen] = useState(false);
  const [isHomeCookModalOpen, setIsHomeCookModalOpen] = useState(false);
  const [isDailyModalOpen, setIsDailyModalOpen] = useState(false);

  return (
    <>
      <style jsx>{`
        /* =========================================================
           ZOMOCOOK — GLASS SERVICE CARDS
        ========================================================= */
        .zc-services {
          --navy: #102544;
          --text: #65768d;
          --red: #ed1c24;

          position: relative;
          padding: 65px 20px 50px;
          overflow: hidden;

          background:
            radial-gradient(circle at 5% 20%, rgba(0, 102, 232, 0.07), transparent 25%),
            radial-gradient(circle at 95% 80%, rgba(237, 28, 36, 0.06), transparent 25%),
            linear-gradient(135deg, #f7faff, #fff 50%, #f8fbff);

          font-family: Arial, Helvetica, sans-serif;
        }

        .zc-container {
          width: 100%;
          max-width: 1240px;
          margin: auto;
          position: relative;
          z-index: 2;
        }

        /* ================= HEADER ================= */
        .zc-top-badge {
          width: max-content;
          margin: 0 auto 14px;
          padding: 7px 19px;

          border: 1px solid rgba(255, 255, 255, 0.9);
          border-radius: 50px;

          background: rgba(235, 245, 255, 0.75);

          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);

          color: #0866e8;

          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.8px;
          text-transform: uppercase;

          box-shadow:
            0 7px 20px rgba(8, 102, 232, 0.07),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }

        .zc-heading {
          margin: 0;
          color: var(--navy);
          text-align: center;
          font-size: clamp(34px, 4vw, 52px);
          line-height: 1.08;
          font-weight: 800;
          letter-spacing: -1.8px;
        }

        .zc-heading span {
          color: var(--red);
        }

        .zc-subtitle {
          max-width: 780px;
          margin: 14px auto 0;
          color: var(--text);
          text-align: center;
          font-size: 16px;
          line-height: 1.55;
        }

        .zc-divider {
          width: 90px;
          height: 4px;
          margin: 20px auto 42px;
          border-radius: 50px;
          background: linear-gradient(90deg, #004aad, #5967db, #ed1c24);
        }

        /* ================= GRID ================= */
        .zc-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        /* ================= CARD — 1:1 GLASS ================= */
        .zc-card {
          --card-color: #0866e8;
          --card-light: #e4f0ff;

          position: relative;
          aspect-ratio: 1 / 1;
          min-width: 0;
          min-height: 0;
          padding: 20px;
          overflow: hidden;
          border-radius: 23px;
          border: 1px solid rgba(255, 255, 255, 0.9);

          background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.84),
            rgba(255, 255, 255, 0.6)
          );

          backdrop-filter: blur(17px);
          -webkit-backdrop-filter: blur(17px);

          box-shadow:
            0 12px 35px rgba(16, 37, 68, 0.07),
            inset 0 1px 0 rgba(255, 255, 255, 0.95),
            inset 0 -1px 0 rgba(255, 255, 255, 0.35);

          display: flex;
          flex-direction: column;
          cursor: pointer;

          transition:
            transform 0.35s ease,
            box-shadow 0.35s ease,
            border-color 0.35s ease;
        }

        .zc-card:hover {
          transform: translateY(-8px);
          border-color: rgba(255, 255, 255, 1);
          background: linear-gradient(
            145deg,
            rgba(255, 255, 255, 0.94),
            rgba(255, 255, 255, 0.68)
          );
          box-shadow:
            0 25px 55px rgba(16, 37, 68, 0.13),
            inset 0 1px 0 rgba(255, 255, 255, 1);
        }

        /* CARD GLOW */
        .zc-card::before {
          content: "";
          position: absolute;
          width: 170px;
          height: 170px;
          right: -65px;
          top: -65px;
          border-radius: 50%;
          background: var(--card-light);
          opacity: 0.8;
        }

        .zc-card::after {
          content: "";
          position: absolute;
          width: 160px;
          height: 160px;
          left: -100px;
          bottom: -100px;
          border-radius: 50%;
          background: var(--card-light);
          opacity: 0.4;
        }

        /* GLASS SHINE */
        .zc-card .zc-shine {
          position: absolute;
          z-index: 2;
          top: -80%;
          left: -45%;
          width: 70%;
          height: 180%;
          background: linear-gradient(
            115deg,
            transparent 35%,
            rgba(255, 255, 255, 0.35) 50%,
            transparent 62%
          );
          transform: rotate(12deg);
          pointer-events: none;
          transition: transform 0.7s ease;
        }

        .zc-card:hover .zc-shine {
          transform: rotate(12deg) translateX(80%);
        }

        /* BADGE */
        .zc-badge {
          position: relative;
          z-index: 6;
          display: inline-flex;
          align-items: center;
          width: max-content;
          gap: 6px;
          padding: 7px 11px;
          border-radius: 50px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.85), var(--badge-bg));
          border: 1px solid rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(9px);
          -webkit-backdrop-filter: blur(9px);
          color: var(--badge-color);
          font-size: 10px;
          font-weight: 800;
          box-shadow:
            0 5px 14px rgba(16, 37, 68, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.95);
        }

        .zc-badge-icon {
          font-size: 12px;
        }

        /* CHEF PHOTO */
        .zc-chef-photo {
          position: absolute;
          z-index: 4;
          top: 14px;
          right: 5px;
          width: 122px;
          height: 122px;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .zc-chef-photo::before {
          content: "";
          position: absolute;
          width: 116px;
          height: 116px;
          border-radius: 50%;
          background: linear-gradient(145deg, rgba(255, 255, 255, 0.75), var(--photo-bg));
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9);
        }

        .zc-chef-photo img {
          position: relative;
          z-index: 2;
          width: 108px;
          height: 108px;
          object-fit: cover;
          border-radius: 50%;
          border: 4px solid rgba(255, 255, 255, 0.92);
          box-shadow: 0 9px 22px rgba(16, 37, 68, 0.13);
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }

        .zc-card:hover .zc-chef-photo img {
          transform: scale(1.06) translateY(-3px);
          box-shadow: 0 14px 28px rgba(16, 37, 68, 0.18);
        }

        /* ICON */
        .zc-icon-wrap {
          position: relative;
          z-index: 6;
          width: 54px;
          height: 54px;
          margin-top: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          background: var(--icon-bg);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.4);
          box-shadow:
            0 9px 20px var(--icon-shadow),
            inset 0 1px 1px rgba(255, 255, 255, 0.35);
        }

        .zc-icon {
          width: 27px;
          height: 27px;
        }

        /* CONTENT */
        .zc-card h3 {
          position: relative;
          z-index: 6;
          margin: 13px 0 5px;
          color: var(--navy);
          font-size: 18px;
          line-height: 1.2;
          font-weight: 800;
        }

        .zc-card-desc {
          position: relative;
          z-index: 6;
          margin: 0;
          max-width: 90%;
          color: var(--text);
          font-size: 12px;
          line-height: 1.45;
        }

        /* STATS */
        .zc-stats {
          position: relative;
          z-index: 6;
          display: grid;
          grid-template-columns: 1fr 1fr;
          margin-top: auto;
          padding: 11px 8px;
          border-top: 1px solid rgba(255, 255, 255, 0.85);
          border-bottom: 1px solid rgba(218, 226, 236, 0.7);
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }

        .zc-stat {
          display: flex;
          align-items: center;
          gap: 7px;
          min-width: 0;
        }

        .zc-stat + .zc-stat {
          border-left: 1px solid rgba(205, 216, 229, 0.7);
          padding-left: 10px;
        }

        .zc-stat-icon {
          width: 24px;
          height: 24px;
          flex-shrink: 0;
          color: #687b94;
        }

        .zc-rating-icon {
          color: #ffb800;
        }

        .zc-number {
          display: block;
          color: var(--navy);
          font-size: 15px;
          line-height: 1.1;
          font-weight: 800;
        }

        .zc-label {
          display: block;
          margin-top: 2px;
          color: #74849a;
          font-size: 8px;
          line-height: 1.15;
          white-space: nowrap;
        }

        /* BUTTON */
        .zc-button {
          position: relative;
          z-index: 6;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          width: 100%;
          margin-top: 11px;
          padding: 10px 15px;
          border-radius: 50px;
          color: #fff !important;
          text-decoration: none !important;
          font-size: 13px;
          font-weight: 800;
          border: 1px solid rgba(255, 255, 255, 0.45);
          background: var(--button);
          box-shadow:
            0 9px 20px var(--button-shadow),
            inset 0 1px 0 rgba(255, 255, 255, 0.3);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          cursor: pointer;
        }

        .zc-button:hover {
          color: #fff !important;
          transform: translateY(-2px);
          box-shadow:
            0 13px 27px var(--button-shadow),
            inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }

        .zc-arrow {
          font-size: 17px;
          transition: transform 0.25s ease;
        }

        .zc-button:hover .zc-arrow {
          transform: translateX(4px);
        }

        /* CARD COLORS */
        .zc-hotel {
          --card-color: #0866e8;
          --card-light: #dcecff;
          --badge-bg: #e7f1ff;
          --badge-color: #0866e8;
          --icon-bg: linear-gradient(135deg, #1475ed, #0054c7);
          --icon-shadow: rgba(8, 102, 232, 0.25);
          --button: linear-gradient(135deg, #0870ed, #0054c7);
          --button-shadow: rgba(8, 102, 232, 0.23);
          --photo-bg: #dcecff;
        }

        .zc-home {
          --card-color: #ed1c24;
          --card-light: #ffe1e5;
          --badge-bg: #ffe8eb;
          --badge-color: #ed1c24;
          --icon-bg: linear-gradient(135deg, #ff3946, #ed1c24);
          --icon-shadow: rgba(237, 28, 36, 0.25);
          --button: linear-gradient(135deg, #ff3342, #ed1c24);
          --button-shadow: rgba(237, 28, 36, 0.23);
          --photo-bg: #ffe1e5;
        }

        .zc-daily {
          --card-color: #08b96d;
          --card-light: #d9f8eb;
          --badge-bg: #ddf9ec;
          --badge-color: #00a963;
          --icon-bg: linear-gradient(135deg, #0bc477, #00a963);
          --icon-shadow: rgba(8, 185, 109, 0.24);
          --button: linear-gradient(135deg, #0bc477, #00a963);
          --button-shadow: rgba(8, 185, 109, 0.23);
          --photo-bg: #d9f8eb;
        }

        .zc-occasion {
          --card-color: #6d2bd9;
          --card-light: #e9ddff;
          --badge-bg: #eee6ff;
          --badge-color: #6d2bd9;
          --icon-bg: linear-gradient(135deg, #7639e8, #5d20c6);
          --icon-shadow: rgba(109, 43, 217, 0.24);
          --button: linear-gradient(135deg, #7639e8, #5d20c6);
          --button-shadow: rgba(109, 43, 217, 0.23);
          --photo-bg: #e9ddff;
        }

        /* TRUST STRIP */
        .zc-trust {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
          margin-top: 27px;
        }

        .zc-trust-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 9px 23px;
          border: 1px solid rgba(255, 255, 255, 0.85);
          border-radius: 50px;
          background: rgba(255, 255, 255, 0.5);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          color: #667991;
          font-size: 12px;
          font-weight: 600;
          box-shadow:
            0 5px 18px rgba(16, 37, 68, 0.035),
            inset 0 1px 0 rgba(255, 255, 255, 0.85);
        }

        .zc-trust-item + .zc-trust-item {
          border-left: 1px solid rgba(255, 255, 255, 0.85);
        }

        .zc-trust-icon {
          width: 22px;
          height: 22px;
          color: #647890;
        }

        /* BACKGROUND GLASS ORBS */
        .zc-services::before {
          content: "";
          position: absolute;
          width: 300px;
          height: 300px;
          top: 70px;
          left: -150px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(0, 102, 232, 0.09), transparent 68%);
          filter: blur(5px);
          pointer-events: none;
        }

        .zc-services::after {
          content: "";
          position: absolute;
          width: 320px;
          height: 320px;
          right: -160px;
          bottom: 30px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(237, 28, 36, 0.07), transparent 68%);
          filter: blur(5px);
          pointer-events: none;
        }

        /* TABLET */
        @media (max-width: 1100px) {
          .zc-grid {
            grid-template-columns: repeat(2, 1fr);
            max-width: 700px;
            margin: auto;
          }
          .zc-card {
            aspect-ratio: 1 / 1;
          }
        }

        /* MOBILE */
        @media (max-width: 767px) {
          .zc-services {
            padding: 48px 15px 40px;
          }
          .zc-heading {
            font-size: 32px;
            letter-spacing: -1px;
          }
          .zc-subtitle {
            font-size: 14px;
          }
          .zc-grid {
            grid-template-columns: 1fr;
            max-width: 420px;
            gap: 16px;
          }
          .zc-card {
            aspect-ratio: auto;
            min-height: 390px;
          }
          .zc-chef-photo {
            width: 120px;
            height: 120px;
          }
          .zc-chef-photo::before {
            width: 114px;
            height: 114px;
          }
          .zc-chef-photo img {
            width: 106px;
            height: 106px;
          }
          .zc-card h3 {
            font-size: 19px;
          }
          .zc-card-desc {
            font-size: 13px;
          }
          .zc-trust {
            flex-direction: column;
            gap: 13px;
          }
          .zc-trust-item {
            padding: 8px 18px;
          }
          .zc-trust-item + .zc-trust-item {
            border-left: 1px solid rgba(255, 255, 255, 0.85);
          }
        }

        /* SMALL MOBILE */
        @media (max-width: 390px) {
          .zc-heading {
            font-size: 29px;
          }
          .zc-card {
            min-height: 375px;
          }
          .zc-stats {
            grid-template-columns: 1fr;
            gap: 8px;
          }
          .zc-stat + .zc-stat {
            border-left: 0;
            border-top: 1px solid rgba(205, 216, 229, 0.7);
            padding-left: 0;
            padding-top: 8px;
          }
        }
      `}</style>

      <section className="zc-services">
        <div className="zc-container">
          
          {/* ================= HEADER ================= */}
          <div className="zc-top-badge">
            Trusted Across India
          </div>

          <h2 className="zc-heading">
            Professional <span>Cooking</span> Services
          </h2>

          <p className="zc-subtitle">
            Hire verified chefs and cooks for homes, hotels,
            restaurants, cafes and special events across India.
          </p>

          <div className="zc-divider"></div>

          {/* ================= CARDS ================= */}
          <div className="zc-grid">
            
            {/* ================= CARD 1: HOTEL STAFF ================= */}
            <article 
              className="zc-card zc-hotel"
              onClick={() => setIsHotelModalOpen(true)}
            >
              <div className="zc-shine"></div>

              <div className="zc-badge">
                <span className="zc-badge-icon">♛</span>
                Most Trusted
              </div>

              <div className="zc-chef-photo">
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80"
                  alt="Professional hotel chef"
                  loading="lazy"
                />
              </div>

              <div className="zc-icon-wrap">
                <svg
                  className="zc-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 21V7l9-4 9 4v14" />
                  <path d="M7 21V11h4v10" />
                  <path d="M13 21V9h4v12" />
                  <path d="M7 7h.01" />
                  <path d="M11 7h.01" />
                  <path d="M15 7h.01" />
                </svg>
              </div>

              <h3>Hotel Staff Service</h3>

              <p className="zc-card-desc">
                Chef, Waiter, Helper & Kitchen Staff for hotels, restaurants and businesses.
              </p>

              <div className="zc-stats">
                <div className="zc-stat">
                  <svg className="zc-stat-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zM8 13c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.17.84 1.97 1.97 1.97 3.45V19h7v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                  </svg>
                  <div>
                    <span className="zc-number">4,959</span>
                    <span className="zc-label">Customers</span>
                  </div>
                </div>

                <div className="zc-stat">
                  <svg className="zc-stat-icon zc-rating-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.5l2.95 5.98 6.6.96-4.78 4.66 1.13 6.58L12 17.57 6.1 20.68l1.13-6.58-4.78-4.66 6.6-.96 L12 2.5z" />
                  </svg>
                  <div>
                    <span className="zc-number">4.6</span>
                    <span className="zc-label">Rating</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsHotelModalOpen(true);
                }}
                className="zc-button"
              >
                Continue
                <span className="zc-arrow">→</span>
              </button>
            </article>

            {/* ================= CARD 2: HOMECOOK ================= */}
            <article 
              className="zc-card zc-home"
              onClick={() => setIsHomeCookModalOpen(true)}
            >
              <div className="zc-shine"></div>

              <div className="zc-badge">
                <span className="zc-badge-icon">🔥</span>
                Trending
              </div>

              <div className="zc-chef-photo">
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=400&q=80"
                  alt="Professional home cook"
                  loading="lazy"
                />
              </div>

              <div className="zc-icon-wrap">
                <svg
                  className="zc-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 10.5L12 3l9 7.5" />
                  <path d="M5 9.5V21h14V9.5" />
                  <path d="M9 21v-7h6v7" />
                </svg>
              </div>

              <h3>Homecook Service</h3>

              <p className="zc-card-desc">
                Full-Time, Live-In and Family Cook Services for your home.
              </p>

              <div className="zc-stats">
                <div className="zc-stat">
                  <svg className="zc-stat-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zM8 13c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.17.84 1.97 1.97 1.97 3.45V19h7v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                  </svg>
                  <div>
                    <span className="zc-number">8,456</span>
                    <span className="zc-label">Customers</span>
                  </div>
                </div>

                <div className="zc-stat">
                  <svg className="zc-stat-icon zc-rating-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.5l2.95 5.98 6.6.96-4.78 4.66 1.13 6.58L12 17.57 6.1 20.68l1.13-6.58-4.78-4.66 6.6-.96 L12 2.5z" />
                  </svg>
                  <div>
                    <span className="zc-number">4.6</span>
                    <span className="zc-label">Rating</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsHomeCookModalOpen(true);
                }}
                className="zc-button"
              >
                Continue
                <span className="zc-arrow">→</span>
              </button>
            </article>

            {/* ================= CARD 3: DAILY BASIS ================= */}
            <article 
              className="zc-card zc-daily"
              onClick={() => setIsDailyModalOpen(true)}
            >
              <div className="zc-shine"></div>

              <div className="zc-badge">
                <span className="zc-badge-icon">⚡</span>
                Most Liked
              </div>

              <div className="zc-chef-photo">
                <img
                  src="https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=400&q=80"
                  alt="Daily basis cooking staff"
                  loading="lazy"
                />
              </div>

              <div className="zc-icon-wrap">
                <svg
                  className="zc-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="5" width="18" height="16" rx="2" />
                  <path d="M16 3v4" />
                  <path d="M8 3v4" />
                  <path d="M3 10h18" />
                </svg>
              </div>

              <h3>Daily Basis Staff</h3>

              <p className="zc-card-desc">
                Reliable daily cooking solutions for homes, offices and businesses.
              </p>

              <div className="zc-stats">
                <div className="zc-stat">
                  <svg className="zc-stat-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zM8 13c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.17.84 1.97 1.97 1.97 3.45V19h7v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                  </svg>
                  <div>
                    <span className="zc-number">11,478</span>
                    <span className="zc-label">Customers</span>
                  </div>
                </div>

                <div className="zc-stat">
                  <svg className="zc-stat-icon zc-rating-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.5l2.95 5.98 6.6.96-4.78 4.66 1.13 6.58L12 17.57 6.1 20.68l1.13-6.58-4.78-4.66 6.6-.96 L12 2.5z" />
                  </svg>
                  <div>
                    <span className="zc-number">4.5</span>
                    <span className="zc-label">Rating</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsDailyModalOpen(true);
                }}
                className="zc-button"
              >
                Continue
                <span className="zc-arrow">→</span>
              </button>
            </article>

            {/* ================= CARD 4: OCCASION ================= */}
            <article className="zc-card zc-occasion">
              <div className="zc-shine"></div>

              <div className="zc-badge">
                <span className="zc-badge-icon">★</span>
                Popular Choice
              </div>

              <div className="zc-chef-photo">
                <img
                  src="https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=400&q=80"
                  alt="Private occasion chef"
                  loading="lazy"
                />
              </div>

              <div className="zc-icon-wrap">
                <svg
                  className="zc-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3v3" />
                  <path d="M5.6 5.6l2.1 2.1" />
                  <path d="M3 12h3" />
                  <path d="M18.4 5.6l-2.1 2.1" />
                  <path d="M18 12h3" />
                  <path d="M12 18v3" />
                  <path d="M7 16c1.5-1.2 3.5-1.2 5 0 1.5 1.2 3.5 1.2 5 0" />
                </svg>
              </div>

              <h3>Chef for Occasion</h3>

              <p className="zc-card-desc">
                Private chefs for birthdays, house parties, family events and occasions.
              </p>

              <div className="zc-stats">
                <div className="zc-stat">
                  <svg className="zc-stat-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zM8 11c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zM8 13c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.17.84 1.97 1.97 1.97 3.45V19h7v-2.5c0-2.33-4.67-3.5-7-3.5z" />
                  </svg>
                  <div>
                    <span className="zc-number">7,688</span>
                    <span className="zc-label">Customers</span>
                  </div>
                </div>

                <div className="zc-stat">
                  <svg className="zc-stat-icon zc-rating-icon" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.5l2.95 5.98 6.6.96-4.78 4.66 1.13 6.58L12 17.57 6.1 20.68l1.13-6.58-4.78-4.66 6.6-.96 L12 2.5z" />
                  </svg>
                  <div>
                    <span className="zc-number">4.3</span>
                    <span className="zc-label">Rating</span>
                  </div>
                </div>
              </div>

              <Link
                href="/services/book-chef-on-birthday-party"
                className="zc-button"
              >
                Continue
                <span className="zc-arrow">→</span>
              </Link>
            </article>

          </div>

          {/* ================= TRUST STRIP ================= */}
          <div className="zc-trust">
            <div className="zc-trust-item">
              <svg className="zc-trust-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l8 3v6c0 5.2-3.4 9.9-8 11-4.6-1.1-8-5.8-8-11V5l8-3z" />
              </svg>
              Verified Professionals
            </div>

            <div className="zc-trust-item">
              <svg className="zc-trust-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3zM8 11c1.7 0 3-1.3 3-3S9.7 5 8 5 5 6.3 5 8s1.3 3 3 3zM8 13c-2.7 0-8 1.3-8 4v2h16v-2c0-2.7-5.3-4-8-4z" />
              </svg>
              10,000+ Happy Customers
            </div>

            <div className="zc-trust-item">
              <svg className="zc-trust-icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.5l2.95 5.98 6.6.96-4.78 4.66 1.13 6.58L12 17.57 6.1 20.68l1.13-6.58-4.78-4.66 6.6-.96 L12 2.5z" />
              </svg>
              4.5+ Average Rating
            </div>
          </div>

        </div>
      </section>

      {/* Hotel Staff Hiring Modal Popup */}
      <HotelStaffHiringModal 
        isOpen={isHotelModalOpen} 
        onClose={() => setIsHotelModalOpen(false)} 
      />

      {/* Home Cook Hiring Modal Popup */}
      <HomeCookHiringModal 
        isOpen={isHomeCookModalOpen} 
        onClose={() => setIsHomeCookModalOpen(false)} 
      />

      {/* Daily Staff Hiring Modal Popup */}
      <DailyStaffHiringModal 
        isOpen={isDailyModalOpen} 
        onClose={() => setIsDailyModalOpen(false)} 
      />
    </>
  );
}
