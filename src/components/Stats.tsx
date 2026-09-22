import React from 'react';
import { Shield, HeartHandshake, MapPin, Star } from 'lucide-react';

export default function Stats() {
  const stats = [
    {
      id: 1,
      icon: Shield,
      iconBoxClass: 'zomo-icon-blue',
      value: '1,25,000+',
      label: 'VERIFIED STAFF'
    },
    {
      id: 2,
      icon: HeartHandshake,
      iconBoxClass: 'zomo-icon-blue',
      value: '15,500+',
      label: 'HORECA PARTNERS'
    },
    {
      id: 3,
      icon: MapPin,
      iconBoxClass: 'zomo-icon-blue',
      value: '250+',
      label: 'CITIES SERVED'
    },
    {
      id: 4,
      icon: Star,
      iconBoxClass: 'zomo-icon-rating',
      value: '4.6 / 5',
      label: 'GLOBAL RATING',
      isStar: true
    }
  ];

  return (
    <>
      <style>{`
        /* =========================================================
           MAIN SECTION
        ========================================================= */
        .zomo-trusted-section {
          width: 100%;
          background: linear-gradient(
            115deg,
            #263f91 0%,
            #2447aa 48%,
            #2850c8 100%
          );
          padding: 78px 30px 80px;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
        }

        /* Ambient glows */
        .zomo-trusted-glow-1 {
          position: absolute;
          top: 0;
          left: 10%;
          width: 380px;
          height: 380px;
          background: rgba(255, 255, 255, 0.04);
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }

        .zomo-trusted-glow-2 {
          position: absolute;
          bottom: 0;
          right: 10%;
          width: 420px;
          height: 420px;
          background: rgba(239, 68, 68, 0.05);
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
        }

        /* =========================================================
           HEADER
        ========================================================= */
        .zomo-trusted-header {
          max-width: 1000px;
          margin: 0 auto 66px;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .zomo-trusted-header h2 {
          margin: 0 0 16px;
          color: #ffffff;
          font-size: 43px;
          line-height: 1.15;
          font-weight: 800;
          letter-spacing: -1.2px;
        }

        .zomo-trusted-header h2 span {
          color: #ff4d4d;
        }

        .zomo-trusted-header p {
          margin: 0;
          color: rgba(255, 255, 255, 0.78);
          font-size: 17px;
          line-height: 1.6;
          font-weight: 600;
        }

        /* =========================================================
           STATS CONTAINER
        ========================================================= */
        .zomo-trusted-stats {
          max-width: 1050px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1px 1fr 1px 1fr 1px 1fr;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        /* =========================================================
           INDIVIDUAL STAT
        ========================================================= */
        .zomo-stat {
          text-align: center;
          min-width: 0;
          transition: transform 0.3s ease;
        }

        .zomo-stat:hover {
          transform: translateY(-4px);
        }

        /* =========================================================
           ICON BOX
        ========================================================= */
        .zomo-stat-icon {
          width: 72px;
          height: 72px;
          margin: 0 auto 27px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.08),
            0 8px 20px rgba(0, 0, 0, 0.06);
          box-sizing: border-box;
          color: #ffffff;
          transition: transform 0.3s ease, background 0.3s ease, border-color 0.3s ease;
        }

        .zomo-stat:hover .zomo-stat-icon {
          transform: scale(1.08);
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.28);
        }

        /* =========================================================
           ICON COLORS
        ========================================================= */
        .zomo-icon-blue {
          color: #ffffff;
        }

        .zomo-icon-rating {
          color: #ffd22f;
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.16);
        }

        /* =========================================================
           NUMBER
        ========================================================= */
        .zomo-stat-number {
          color: #ffffff;
          font-size: 46px;
          line-height: 1.1;
          font-weight: 800;
          letter-spacing: -1.5px;
          margin-bottom: 11px;
        }

        /* =========================================================
           LABEL
        ========================================================= */
        .zomo-stat-label {
          color: rgba(255, 255, 255, 0.78);
          font-size: 12px;
          line-height: 1.4;
          font-weight: 700;
          letter-spacing: 0.5px;
        }

        /* =========================================================
           DIVIDER
        ========================================================= */
        .zomo-stat-divider {
          width: 1px;
          height: 128px;
          background: rgba(255, 255, 255, 0.14);
        }

        /* =========================================================
           TABLET
        ========================================================= */
        @media (max-width: 1024px) {
          .zomo-trusted-section {
            padding: 65px 25px 70px;
          }

          .zomo-trusted-header {
            margin-bottom: 55px;
          }

          .zomo-trusted-header h2 {
            font-size: 38px;
          }

          .zomo-trusted-header p {
            font-size: 16px;
          }

          .zomo-trusted-stats {
            max-width: 850px;
          }

          .zomo-stat-icon {
            width: 65px;
            height: 65px;
            margin-bottom: 22px;
          }

          .zomo-stat-number {
            font-size: 37px;
          }

          .zomo-stat-divider {
            height: 105px;
          }
        }

        /* =========================================================
           MOBILE
        ========================================================= */
        @media (max-width: 600px) {
          .zomo-trusted-section {
            padding: 55px 18px 60px;
          }

          .zomo-trusted-header {
            margin-bottom: 42px;
          }

          .zomo-trusted-header h2 {
            font-size: 30px;
            line-height: 1.2;
            letter-spacing: -0.7px;
          }

          .zomo-trusted-header p {
            font-size: 14px;
            line-height: 1.55;
          }

          .zomo-trusted-stats {
            max-width: 430px;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0;
          }

          .zomo-stat {
            padding: 25px 10px 28px;
          }

          .zomo-stat-icon {
            width: 58px;
            height: 58px;
            margin-bottom: 19px;
            border-radius: 12px;
          }

          .zomo-stat-number {
            font-size: 30px;
            letter-spacing: -0.8px;
            margin-bottom: 8px;
          }

          .zomo-stat-label {
            font-size: 10px;
            letter-spacing: 0.35px;
          }

          /* Hide desktop dividers */
          .zomo-stat-divider {
            display: none;
          }

          /* Mobile grid borders */
          .zomo-stat:nth-child(1) {
            border-right: 1px solid rgba(255, 255, 255, 0.14);
            border-bottom: 1px solid rgba(255, 255, 255, 0.14);
          }

          .zomo-stat:nth-child(3) {
            border-left: 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.14);
          }

          .zomo-stat:nth-child(5) {
            border-right: 1px solid rgba(255, 255, 255, 0.14);
          }
        }

        /* =========================================================
           SMALL MOBILE
        ========================================================= */
        @media (max-width: 380px) {
          .zomo-trusted-header h2 {
            font-size: 27px;
          }

          .zomo-trusted-header p {
            font-size: 13px;
          }

          .zomo-stat-number {
            font-size: 26px;
          }

          .zomo-stat-label {
            font-size: 9px;
          }
        }
      `}</style>

      {/* =========================================================
           ZOMOCOOK - TRUSTED BY THOUSANDS ACROSS INDIA
      ========================================================= */}
      <section className="zomo-trusted-section">
        {/* Ambient background glows */}
        <div className="zomo-trusted-glow-1" />
        <div className="zomo-trusted-glow-2" />

        {/* HEADER */}
        <div className="zomo-trusted-header">
          <h2>
            Trusted By Thousands <span>Across India</span>
          </h2>

          <p>
            Connecting Homes, Hotels &amp; Restaurants with Verified Professionals
          </p>
        </div>

        {/* STATS */}
        <div className="zomo-trusted-stats">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <React.Fragment key={stat.id}>
                {/* STAT ITEM */}
                <div className="zomo-stat">
                  <div className={`zomo-stat-icon ${stat.iconBoxClass}`}>
                    <Icon
                      className={`w-8 h-8 sm:w-9 sm:h-9 ${
                        stat.isStar ? 'text-[#ffd22f] fill-[#ffd22f]' : 'text-white'
                      }`}
                      strokeWidth={1.75}
                    />
                  </div>

                  <div className="zomo-stat-number">{stat.value}</div>

                  <div className="zomo-stat-label">{stat.label}</div>
                </div>

                {/* DIVIDER (Desktop/Tablet) */}
                {idx < stats.length - 1 && <div className="zomo-stat-divider" />}
              </React.Fragment>
            );
          })}
        </div>
      </section>
    </>
  );
}
