import React from 'react';
import { UserCheck, Zap, Target, HeartHandshake } from 'lucide-react';

export default function WhyChooseUs() {
  const reasons = [
    {
      id: 1,
      cardClass: 'card-blue',
      icon: UserCheck,
      title: (
        <>
          Verified<br />Professionals
        </>
      ),
      description: 'Background-verified chefs, cooks and hospitality staff for complete peace of mind.'
    },
    {
      id: 2,
      cardClass: 'card-red',
      icon: Zap,
      title: (
        <>
          Quick<br className="hidden sm:inline" /> Hiring
        </>
      ),
      description: 'Receive shortlisted profiles quickly and hire staff without lengthy delays.'
    },
    {
      id: 3,
      cardClass: 'card-dark',
      icon: Target,
      title: (
        <>
          Specialized<br className="hidden sm:inline" /> Talent
        </>
      ),
      description: 'Indian, Chinese, Tandoor, Continental, Bakery and multi-cuisine experts available.'
    },
    {
      id: 4,
      cardClass: 'card-green',
      icon: HeartHandshake,
      title: (
        <>
          Dedicated<br />Support
        </>
      ),
      description: 'Our team assists throughout the hiring process to ensure successful placements.'
    }
  ];

  return (
    <>
      <style>{`
        /* =========================================================
           MAIN SECTION
        ========================================================= */
        .zomo-why-section {
          width: 100%;
          background: #ffffff;
          padding: 70px 30px 95px;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
        }

        /* Subtle background glow accents for glassmorphism */
        .zomo-bg-glow-why-1 {
          position: absolute;
          top: 15%;
          right: -5%;
          width: 450px;
          height: 450px;
          background: rgba(0, 74, 173, 0.05);
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
        }

        .zomo-bg-glow-why-2 {
          position: absolute;
          bottom: 10%;
          left: -5%;
          width: 450px;
          height: 450px;
          background: rgba(237, 28, 36, 0.04);
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
        }

        /* =========================================================
           HEADER
        ========================================================= */
        .zomo-why-header {
          max-width: 900px;
          margin: 0 auto 78px;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .zomo-why-header h2 {
          margin: 0 0 22px;
          color: #10182d;
          font-size: 42px;
          line-height: 1.15;
          font-weight: 800;
          letter-spacing: -1.5px;
        }

        .zomo-why-header p {
          margin: 0;
          color: #61738d;
          font-size: 17px;
          line-height: 1.6;
        }

        /* =========================================================
           BLUE + RED ACCENT LINE
        ========================================================= */
        .zomo-why-line {
          width: 64px;
          height: 5px;
          margin: 27px auto 0;
          border-radius: 20px;
          overflow: hidden;
          background: #ed1c24;
        }

        .zomo-why-line span {
          display: block;
          width: 50%;
          height: 100%;
          background: #004aad;
        }

        /* =========================================================
           CARDS WRAPPER
        ========================================================= */
        .zomo-why-wrapper {
          max-width: 1150px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
          align-items: stretch;
          position: relative;
          z-index: 2;
        }

        /* =========================================================
           CARD
        ========================================================= */
        .zomo-why-card {
          position: relative;
          min-height: 320px;
          padding: 40px 30px 32px;
          box-sizing: border-box;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          background: rgba(248, 250, 253, 0.78);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(215, 225, 237, 0.95);
          border-radius: 16px;
          box-shadow:
            0 8px 22px rgba(31, 64, 104, 0.07),
            inset 0 1px 0 rgba(255, 255, 255, 0.95);
          overflow: hidden;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease,
            border-color 0.3s ease;
        }

        /* =========================================================
           CARD HOVER
        ========================================================= */
        .zomo-why-card:hover {
          transform: translateY(-7px);
          border-color: rgba(180, 205, 232, 1);
          box-shadow:
            0 18px 38px rgba(31, 64, 104, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 1);
        }

        /* =========================================================
           GLASS REFLECTION
        ========================================================= */
        .zomo-why-card::before {
          content: "";
          position: absolute;
          width: 160px;
          height: 160px;
          top: -90px;
          left: -70px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.65);
          filter: blur(18px);
          pointer-events: none;
        }

        /* =========================================================
           ICON BOX
        ========================================================= */
        .zomo-why-icon {
          position: relative;
          width: 60px;
          height: 60px;
          margin: 0 auto 27px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          box-sizing: border-box;
          z-index: 2;
          box-shadow:
            0 4px 12px rgba(0, 0, 0, 0.04),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          transition: transform 0.3s ease;
        }

        .zomo-why-card:hover .zomo-why-icon {
          transform: scale(1.08);
        }

        /* =========================================================
           ICON COLORS
        ========================================================= */
        .card-blue .zomo-why-icon {
          color: #0066d6;
          background: rgba(0, 102, 214, 0.065);
          border: 1px solid rgba(0, 102, 214, 0.14);
        }

        .card-red .zomo-why-icon {
          color: #ed1c24;
          background: rgba(237, 28, 36, 0.065);
          border: 1px solid rgba(237, 28, 36, 0.14);
        }

        .card-dark .zomo-why-icon {
          color: #17233c;
          background: rgba(40, 58, 85, 0.055);
          border: 1px solid rgba(40, 58, 85, 0.12);
        }

        .card-green .zomo-why-icon {
          color: #00a879;
          background: rgba(0, 168, 121, 0.065);
          border: 1px solid rgba(0, 168, 121, 0.14);
        }

        /* =========================================================
           CARD HEADING
        ========================================================= */
        .zomo-why-card h3 {
          position: relative;
          z-index: 2;
          margin: 0;
          color: #10182d;
          font-size: 20px;
          line-height: 1.35;
          font-weight: 800;
          letter-spacing: -0.3px;
          min-height: 54px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* =========================================================
           SMALL CARD LINE
        ========================================================= */
        .zomo-card-line {
          width: 34px;
          height: 2.5px;
          margin: 15px auto 18px;
          background: #dce5ef;
          border-radius: 10px;
          transition: background 0.3s ease, width 0.3s ease;
        }

        .zomo-why-card:hover .zomo-card-line {
          width: 44px;
          background: #b8cbdc;
        }

        /* =========================================================
           DESCRIPTION
        ========================================================= */
        .zomo-why-card p {
          position: relative;
          z-index: 2;
          max-width: 225px;
          margin: 0 auto;
          color: #61738d;
          font-size: 15px;
          line-height: 1.65;
        }

        /* =========================================================
           TABLET
        ========================================================= */
        @media (max-width: 1024px) {
          .zomo-why-section {
            padding: 60px 25px 80px;
          }
          .zomo-why-header {
            margin-bottom: 55px;
          }
          .zomo-why-header h2 {
            font-size: 38px;
          }
          .zomo-why-wrapper {
            grid-template-columns: repeat(2, 1fr);
            gap: 25px;
            max-width: 750px;
          }
        }

        /* =========================================================
           MOBILE
        ========================================================= */
        @media (max-width: 600px) {
          .zomo-why-section {
            padding: 55px 18px 65px;
          }
          .zomo-why-header {
            margin-bottom: 45px;
          }
          .zomo-why-header h2 {
            font-size: 31px;
            letter-spacing: -0.8px;
          }
          .zomo-why-header p {
            font-size: 15px;
            line-height: 1.55;
          }
          .zomo-why-wrapper {
            grid-template-columns: 1fr;
            gap: 20px;
            max-width: 420px;
          }
          .zomo-why-card {
            min-height: 295px;
            padding: 35px 25px 30px;
          }
          .zomo-why-icon {
            width: 58px;
            height: 58px;
            margin-bottom: 23px;
            border-radius: 12px;
          }
          .zomo-why-card h3 {
            font-size: 19px;
            min-height: auto;
          }
          .zomo-why-card p {
            font-size: 15px;
          }
        }
      `}</style>

      {/* =========================================================
           ZOMOCOOK - WHY CHOOSE ZOMOCOOK
      ========================================================= */}
      <section className="zomo-why-section">
        {/* Background Ambient Glows */}
        <div className="zomo-bg-glow-why-1" />
        <div className="zomo-bg-glow-why-2" />

        {/* HEADER */}
        <div className="zomo-why-header">
          <h2>Why Choose Zomocook?</h2>

          <p>
            India's trusted platform for hiring professional chefs, cooks and hospitality staff.
          </p>

          <div className="zomo-why-line">
            <span></span>
          </div>
        </div>

        {/* CARDS */}
        <div className="zomo-why-wrapper">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div key={reason.id} className={`zomo-why-card ${reason.cardClass}`}>
                <div className="zomo-why-icon">
                  <Icon className="w-7 h-7" strokeWidth={1.85} />
                </div>

                <h3>{reason.title}</h3>

                <div className="zomo-card-line"></div>

                <p>{reason.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
