import React from 'react';
import { Building2, UtensilsCrossed, Coffee, Home } from 'lucide-react';

export default function Industries() {
  const industries = [
    {
      id: 'hotel',
      cardClass: 'hotel-card',
      iconClass: 'hotel-icon',
      icon: Building2,
      name: 'Hotels',
      description: 'Luxury, business, boutique and budget hotel staffing solutions.'
    },
    {
      id: 'restaurant',
      cardClass: 'restaurant-card',
      iconClass: 'restaurant-icon',
      icon: UtensilsCrossed,
      name: 'Restaurants',
      description: 'Chefs, cooks, waiters and kitchen staff for restaurants.'
    },
    {
      id: 'cafe',
      cardClass: 'cafe-card',
      iconClass: 'cafe-icon',
      icon: Coffee,
      name: 'Cafés',
      description: 'Baristas, cooks and service staff for cafés and bakeries.'
    },
    {
      id: 'home',
      cardClass: 'home-card',
      iconClass: 'home-icon',
      icon: Home,
      name: 'Homes',
      description: 'Home cooks, private chefs and domestic kitchen staff.'
    }
  ];

  return (
    <>
      <style>{`
        /* =========================================
           ZOMOCOOK INDUSTRIES SECTION
        ========================================= */
        .zomo-industries {
          width: 100%;
          background: #ffffff;
          padding: 80px 30px 90px;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
        }

        /* Background glow accents for enhanced glassmorphism */
        .zomo-bg-glow-1 {
          position: absolute;
          top: 10%;
          right: -5%;
          width: 480px;
          height: 480px;
          background: rgba(0, 74, 173, 0.06);
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
        }

        .zomo-bg-glow-2 {
          position: absolute;
          bottom: 5%;
          left: -5%;
          width: 450px;
          height: 450px;
          background: rgba(237, 28, 36, 0.05);
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
        }

        /* =========================================
           HEADER
        ========================================= */
        .zomo-industries-header {
          max-width: 900px;
          margin: 0 auto 70px;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .zomo-industries-header h2 {
          margin: 0 0 20px;
          color: #10182d;
          font-size: 44px;
          line-height: 1.15;
          font-weight: 800;
          letter-spacing: -1.5px;
        }

        .zomo-industries-header p {
          max-width: 760px;
          margin: 0 auto;
          color: #61738d;
          font-size: 17px;
          line-height: 1.65;
          font-weight: 400;
        }

        .zomo-title-line {
          width: 100px;
          height: 5px;
          margin: 28px auto 0;
          border-radius: 20px;
          overflow: hidden;
          background: #004aad;
        }

        .zomo-title-line span {
          display: block;
          width: 50%;
          height: 100%;
          background: #ed1c24;
        }

        /* =========================================
           CARD GRID
        ========================================= */
        .zomo-industry-grid {
          width: 100%;
          max-width: 1140px;
          margin: auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;
          position: relative;
          z-index: 2;
        }

        /* =========================================
           GLASS CARD
        ========================================= */
        .zomo-industry-card {
          position: relative;
          min-height: 285px;
          padding: 40px 25px 32px;
          text-align: center;
          box-sizing: border-box;

          /* GLASS EFFECT */
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);

          /* BORDER */
          border: 1px solid rgba(255, 255, 255, 0.95);

          /* RADIUS */
          border-radius: 24px;

          /* GLASS SHADOW */
          box-shadow:
            0 8px 30px rgba(31, 64, 104, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.95),
            inset 0 -1px 0 rgba(255, 255, 255, 0.45);

          overflow: hidden;

          transition:
            transform 0.35s ease,
            box-shadow 0.35s ease,
            border-color 0.35s ease;
        }

        /* Glass reflection */
        .zomo-industry-card::before {
          content: "";
          position: absolute;
          top: -90px;
          left: -70px;
          width: 180px;
          height: 180px;
          background: rgba(255, 255, 255, 0.55);
          border-radius: 50%;
          filter: blur(18px);
          pointer-events: none;
        }

        /* Bottom glass glow */
        .zomo-industry-card::after {
          content: "";
          position: absolute;
          left: 10%;
          right: 10%;
          bottom: -55px;
          height: 100px;
          background: rgba(0, 74, 173, 0.05);
          border-radius: 50%;
          filter: blur(25px);
          pointer-events: none;
        }

        /* Hover */
        .zomo-industry-card:hover {
          transform: translateY(-9px);
          border-color: rgba(255, 255, 255, 1);
          box-shadow:
            0 18px 45px rgba(31, 64, 104, 0.14),
            inset 0 1px 0 rgba(255, 255, 255, 1);
        }

        /* =========================================
           ICON
        ========================================= */
        .zomo-icon-box {
          position: relative;
          z-index: 2;
          width: 64px;
          height: 64px;
          margin: 0 auto 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 14px;
          background: rgba(255, 255, 255, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.95);
          box-shadow:
            0 8px 20px rgba(0, 0, 0, 0.06),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition: 0.3s ease;
        }

        .zomo-industry-card:hover .zomo-icon-box {
          transform: scale(1.08);
        }

        /* =========================================
           ICON COLORS
        ========================================= */
        .hotel-icon {
          color: #0066d6;
          background: rgba(0, 102, 214, 0.08);
        }

        .restaurant-icon {
          color: #ed1c24;
          background: rgba(237, 28, 36, 0.08);
        }

        .cafe-icon {
          color: #17233d;
          background: rgba(23, 35, 61, 0.07);
        }

        .home-icon {
          color: #08a76b;
          background: rgba(8, 167, 107, 0.08);
        }

        /* =========================================
           CARD TITLE
        ========================================= */
        .zomo-industry-card h3 {
          position: relative;
          z-index: 2;
          margin: 0;
          color: #111a31;
          font-size: 21px;
          font-weight: 750;
          letter-spacing: -0.3px;
        }

        /* =========================================
           CARD LINE
        ========================================= */
        .zomo-card-line {
          position: relative;
          z-index: 2;
          width: 34px;
          height: 3px;
          margin: 15px auto 17px;
          border-radius: 20px;
        }

        .hotel-card .zomo-card-line {
          background: #1685ed;
        }

        .restaurant-card .zomo-card-line {
          background: #ed1c24;
        }

        .cafe-card .zomo-card-line {
          background: #55aaf0;
        }

        .home-card .zomo-card-line {
          background: #11bd7a;
        }

        /* =========================================
           DESCRIPTION
        ========================================= */
        .zomo-industry-card p {
          position: relative;
          z-index: 2;
          max-width: 240px;
          margin: auto;
          color: #61738d;
          font-size: 15px;
          line-height: 1.65;
          font-weight: 400;
        }

        /* =========================================
           RESPONSIVE TABLET
        ========================================= */
        @media (max-width: 1024px) {
          .zomo-industries {
            padding: 65px 25px 75px;
          }
          .zomo-industries-header {
            margin-bottom: 50px;
          }
          .zomo-industries-header h2 {
            font-size: 38px;
          }
          .zomo-industry-grid {
            grid-template-columns: repeat(2, 1fr);
            max-width: 760px;
          }
        }

        /* =========================================
           RESPONSIVE MOBILE
        ========================================= */
        @media (max-width: 600px) {
          .zomo-industries {
            padding: 55px 18px 65px;
          }
          .zomo-industries-header {
            margin-bottom: 40px;
          }
          .zomo-industries-header h2 {
            font-size: 31px;
            letter-spacing: -0.8px;
          }
          .zomo-industries-header p {
            font-size: 15px;
            line-height: 1.6;
          }
          .zomo-industry-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .zomo-industry-card {
            min-height: 270px;
            padding: 35px 22px 30px;
          }
        }
      `}</style>

      {/* ZOMOCOOK - INDUSTRIES WE SERVE */}
      <section className="zomo-industries">
        {/* Ambient background glows for glassmorphism */}
        <div className="zomo-bg-glow-1" />
        <div className="zomo-bg-glow-2" />

        <div className="zomo-industries-header">
          <h2>Industries We Serve</h2>

          <p>
            We help hotels, restaurants, cafés, and households hire verified cooks, chefs,
            waiters, and hospitality professionals quickly and efficiently.
          </p>

          <div className="zomo-title-line">
            <span></span>
          </div>
        </div>

        <div className="zomo-industry-grid">
          {industries.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className={`zomo-industry-card ${item.cardClass}`}>
                <div className={`zomo-icon-box ${item.iconClass}`}>
                  <Icon className="w-7 h-7" strokeWidth={1.85} />
                </div>

                <h3>{item.name}</h3>

                <div className="zomo-card-line"></div>

                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
