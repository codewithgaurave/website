import React from 'react';
import { FileText, CreditCard, Users, Handshake } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      id: 1,
      number: '1',
      title: 'Share Requirement',
      description: 'Tell us your staffing requirement, cuisine preference, location and service type.',
      icon: FileText,
      stepClass: 'step-blue'
    },
    {
      id: 2,
      number: '2',
      title: 'Activate Package',
      description: 'Select the suitable hiring package and activate your requirement.',
      icon: CreditCard,
      stepClass: 'step-green'
    },
    {
      id: 3,
      number: '3',
      title: 'Receive Profiles',
      description: 'Get shortlisted profiles and conduct interviews or trial sessions.',
      icon: Users,
      stepClass: 'step-orange'
    },
    {
      id: 4,
      number: '4',
      title: 'Final Joining',
      description: 'Select the best candidate and complete the onboarding process.',
      icon: Handshake,
      stepClass: 'step-red'
    }
  ];

  return (
    <>
      <style>{`
        /* =====================================================
           ZOMOCOOK - HOW IT WORKS
        ===================================================== */
        .zomo-how-section {
          width: 100%;
          background: #ffffff;
          padding: 75px 30px 90px;
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
        }

        /* Ambient background glow for glassmorphism */
        .zomo-bg-glow-how-1 {
          position: absolute;
          top: 20%;
          left: -5%;
          width: 480px;
          height: 480px;
          background: rgba(0, 74, 173, 0.05);
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
        }

        .zomo-bg-glow-how-2 {
          position: absolute;
          bottom: 10%;
          right: -5%;
          width: 480px;
          height: 480px;
          background: rgba(237, 28, 36, 0.04);
          border-radius: 50%;
          filter: blur(90px);
          pointer-events: none;
        }

        /* =====================================================
           HEADER
        ===================================================== */
        .zomo-how-header {
          max-width: 850px;
          margin: 0 auto 72px;
          text-align: center;
          position: relative;
          z-index: 2;
        }

        .zomo-how-header h2 {
          margin: 0 0 20px;
          color: #10182d;
          font-size: 44px;
          line-height: 1.15;
          font-weight: 800;
          letter-spacing: -1.5px;
        }

        .zomo-how-header p {
          margin: 0;
          color: #61738d;
          font-size: 17px;
          line-height: 1.6;
        }

        /* =====================================================
           HEADER ACCENT
        ===================================================== */
        .zomo-how-line {
          width: 64px;
          height: 5px;
          margin: 27px auto 0;
          border-radius: 20px;
          overflow: hidden;
          background: #ed1c24;
        }

        .zomo-how-line span {
          display: block;
          width: 50%;
          height: 100%;
          background: #004aad;
        }

        /* =====================================================
           MAIN GRID
        ===================================================== */
        .zomo-how-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 55px 1fr 55px 1fr 55px 1fr;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        /* =====================================================
           STEP
        ===================================================== */
        .zomo-step {
          position: relative;
          z-index: 2;
        }

        /* =====================================================
           GLASS CARD
        ===================================================== */
        .zomo-step-card {
          position: relative;
          min-height: 315px;
          padding: 78px 30px 30px;
          box-sizing: border-box;
          text-align: center;
          background: rgba(255, 255, 255, 0.72);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.95);
          border-radius: 22px;
          box-shadow:
            0 12px 35px rgba(31, 64, 104, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.95),
            inset 0 -1px 0 rgba(255, 255, 255, 0.45);
          overflow: hidden;
          transition:
            transform 0.35s ease,
            box-shadow 0.35s ease;
        }

        /* =====================================================
           GLASS HIGHLIGHT
        ===================================================== */
        .zomo-step-card::before {
          content: "";
          position: absolute;
          width: 180px;
          height: 180px;
          top: -90px;
          left: -70px;
          background: rgba(255, 255, 255, 0.55);
          border-radius: 50%;
          filter: blur(18px);
          pointer-events: none;
        }

        /* Bottom glow */
        .zomo-step-card::after {
          content: "";
          position: absolute;
          width: 180px;
          height: 80px;
          bottom: -45px;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 74, 173, 0.04);
          border-radius: 50%;
          filter: blur(25px);
          pointer-events: none;
        }

        /* =====================================================
           HOVER
        ===================================================== */
        .zomo-step-card:hover {
          transform: translateY(-8px);
          box-shadow:
            0 20px 45px rgba(31, 64, 104, 0.13),
            inset 0 1px 0 rgba(255, 255, 255, 1);
        }

        /* =====================================================
           TOP RIGHT NUMBER AREA
        ===================================================== */
        .zomo-number-corner {
          position: absolute;
          top: 0;
          right: 0;
          width: 76px;
          height: 76px;
          border-bottom-left-radius: 70px;
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;
          padding: 10px;
          box-sizing: border-box;
          z-index: 5;
        }

        /* Number */
        .zomo-number-corner span {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: #ffffff;
          font-size: 21px;
          font-weight: 800;
          box-shadow: 0 6px 15px rgba(0, 0, 0, 0.12);
        }

        /* =====================================================
           NUMBER COLORS
        ===================================================== */
        .step-blue .zomo-number-corner {
          background: rgba(0, 102, 214, 0.14);
        }
        .step-blue .zomo-number-corner span {
          background: #0066d6;
        }

        .step-green .zomo-number-corner {
          background: rgba(0, 180, 130, 0.14);
        }
        .step-green .zomo-number-corner span {
          background: #08b77c;
        }

        .step-orange .zomo-number-corner {
          background: rgba(245, 158, 11, 0.15);
        }
        .step-orange .zomo-number-corner span {
          background: #f59e0b;
        }

        .step-red .zomo-number-corner {
          background: rgba(237, 28, 74, 0.13);
        }
        .step-red .zomo-number-corner span {
          background: #ed1c4a;
        }

        /* =====================================================
           ICON
        ===================================================== */
        .zomo-step-icon {
          position: relative;
          z-index: 3;
          width: 60px;
          height: 60px;
          margin: 0 auto 25px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 13px;
          background: rgba(255, 255, 255, 0.65);
          border: 1px solid rgba(255, 255, 255, 0.95);
          box-shadow:
            0 7px 18px rgba(0, 0, 0, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.9);
          transition: transform 0.3s ease;
        }

        .zomo-step-card:hover .zomo-step-icon {
          transform: scale(1.08);
        }

        /* =====================================================
           ICON COLORS
        ===================================================== */
        .step-blue .zomo-step-icon {
          color: #0066d6;
          background: rgba(0, 102, 214, 0.08);
        }

        .step-green .zomo-step-icon {
          color: #008c68;
          background: rgba(0, 174, 128, 0.08);
        }

        .step-orange .zomo-step-icon {
          color: #f59e0b;
          background: rgba(245, 158, 11, 0.08);
        }

        .step-red .zomo-step-icon {
          color: #ed1c4a;
          background: rgba(237, 28, 74, 0.07);
        }

        /* =====================================================
           TITLE
        ===================================================== */
        .zomo-step-card h3 {
          position: relative;
          z-index: 3;
          margin: 0 0 14px;
          color: #10182d;
          font-size: 18px;
          line-height: 1.3;
          font-weight: 750;
        }

        /* =====================================================
           DESCRIPTION
        ===================================================== */
        .zomo-step-card p {
          position: relative;
          z-index: 3;
          max-width: 235px;
          margin: 0 auto;
          color: #61738d;
          font-size: 15px;
          line-height: 1.65;
        }

        /* =====================================================
           CONNECTOR
        ===================================================== */
        .zomo-connector {
          position: relative;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1;
        }

        /* DOTTED LINE */
        .zomo-connector::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          height: 2px;
          background-image:
            radial-gradient(
              circle,
              #7e9bbb 1.4px,
              transparent 1.5px
            );
          background-size: 8px 2px;
          background-repeat: repeat-x;
        }

        /* ARROW */
        .zomo-connector span {
          position: relative;
          z-index: 2;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          color: #0066d6;
          font-size: 24px;
          font-weight: 700;
        }

        .zomo-connector span::after {
          content: "→";
        }

        /* =====================================================
           TABLET
        ===================================================== */
        @media (max-width: 1024px) {
          .zomo-how-section {
            padding: 65px 25px 75px;
          }
          .zomo-how-header {
            margin-bottom: 55px;
          }
          .zomo-how-header h2 {
            font-size: 38px;
          }
          .zomo-how-wrapper {
            grid-template-columns: repeat(2, 1fr);
            gap: 25px;
          }
          .zomo-connector {
            display: none;
          }
        }

        /* =====================================================
           MOBILE
        ===================================================== */
        @media (max-width: 600px) {
          .zomo-how-section {
            padding: 55px 18px 65px;
          }
          .zomo-how-header {
            margin-bottom: 45px;
          }
          .zomo-how-header h2 {
            font-size: 31px;
            letter-spacing: -0.8px;
          }
          .zomo-how-header p {
            font-size: 15px;
          }
          .zomo-how-wrapper {
            grid-template-columns: 1fr;
            gap: 22px;
          }
          .zomo-step-card {
            min-height: 270px;
            padding: 72px 24px 30px;
          }
          .zomo-number-corner {
            width: 72px;
            height: 72px;
          }
          .zomo-number-corner span {
            width: 44px;
            height: 44px;
            font-size: 19px;
          }
          .zomo-connector {
            display: none;
          }
        }
      `}</style>

      {/* ZOMOCOOK - HOW IT WORKS */}
      <section className="zomo-how-section">
        {/* Background ambient glows */}
        <div className="zomo-bg-glow-how-1" />
        <div className="zomo-bg-glow-how-2" />

        {/* HEADER */}
        <div className="zomo-how-header">
          <h2>How It Works</h2>

          <p>
            Get verified chefs and cooks in just a few simple steps.
          </p>

          <div className="zomo-how-line">
            <span></span>
          </div>
        </div>

        {/* STEPS */}
        <div className="zomo-how-wrapper">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.id}>
                {/* STEP CARD */}
                <div className={`zomo-step ${step.stepClass}`}>
                  <div className="zomo-step-card">
                    {/* TOP RIGHT NUMBER */}
                    <div className="zomo-number-corner">
                      <span>{step.number}</span>
                    </div>

                    {/* ICON */}
                    <div className="zomo-step-icon">
                      <Icon className="w-7 h-7" strokeWidth={1.85} />
                    </div>

                    <h3>{step.title}</h3>

                    <p>{step.description}</p>
                  </div>
                </div>

                {/* CONNECTOR (Between steps only) */}
                {idx < steps.length - 1 && (
                  <div className="zomo-connector">
                    <span></span>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </section>
    </>
  );
}
