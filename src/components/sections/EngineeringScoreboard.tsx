import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Gauge, Truck, ChevronDown, ChevronUp, CheckCircle2, XCircle, Clock, FileCheck } from 'lucide-react';

// Calculate days until March 9th, 2026
const getCountdown = () => {
  const target = new Date('2026-03-09T00:00:00');
  const now = new Date();
  const diff = target.getTime() - now.getTime();

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};

const timeline = [
  // Competition Milestones
  {
    date: 'Oct 20, 2025',
    event: 'Initial Inquiry to Bosch',
    description: '15 detailed questions sent to BFMC team about hardware, funding, travel, and tech stack',
    status: 'info',
    type: 'competition',
  },
  {
    date: 'Oct 21, 2025',
    event: 'Bosch Responds',
    description: 'All questions answered — green light to apply',
    status: 'approved',
    type: 'competition',
  },
  {
    date: 'Nov 10, 2025',
    event: 'BFMC Interview',
    description: 'Team RAVEN presents to Bosch jury',
    status: 'pending',
    type: 'competition',
  },
  {
    date: 'Nov 19, 2025',
    event: 'Acceptance! 🎉',
    description: 'Selected as 1 of 78 teams (from 163 applicants) — only team from Africa',
    status: 'approved',
    type: 'competition',
  },
  // Customs Battle Begins
  {
    date: 'Nov 27, 2025',
    event: 'BFMC Kick-Off',
    description: 'Official competition start — car shipped from Romania',
    status: 'approved',
    type: 'competition',
  },
  {
    date: 'Nov 27, 2025',
    event: 'Package Stuck in Customs',
    description: 'Shipment held — misclassified as "vehicle spare parts"',
    status: 'rejected',
    type: 'customs',
  },
  {
    date: 'Nov 27, 2025',
    event: 'First DHL Contact',
    description: 'Team explains it\'s a 1/10-scale educational prototype',
    status: 'pending',
    type: 'customs',
  },
  {
    date: 'Nov 30, 2025',
    event: 'Airport Visit #1',
    description: 'Team visits Cairo Cargo Village with passports, supervisor letters, and IDs',
    status: 'pending',
    type: 'customs',
  },
  {
    date: 'Dec 2, 2025',
    event: 'BoM Submitted',
    description: 'Bill of Materials and Bosch documentation sent to NTRA',
    status: 'info',
    type: 'customs',
  },
  {
    date: 'Dec 8, 2025',
    event: 'BFMC Workshop: Brain',
    description: 'Technical discussion on Raspberry Pi integration (while fighting customs)',
    status: 'info',
    type: 'competition',
  },
  {
    date: 'Dec 11, 2025',
    event: 'False Hope',
    description: 'Notification that shipment was "cleared" — celebration was premature',
    status: 'pending',
    type: 'customs',
  },
  {
    date: 'Dec 12, 2025',
    event: 'NTRA Rejection',
    description: 'Rejected citing "national security concerns" — a 1/10 scale toy car flagged as a threat',
    status: 'rejected',
    type: 'customs',
  },
  {
    date: 'Dec 12, 2025',
    event: 'Emergency Intervention',
    description: 'Team negotiates with DHL to hold shipment while pursuing independent appeal',
    status: 'pending',
    type: 'customs',
  },
  {
    date: 'Dec 16, 2025',
    event: 'BFMC Workshop: Embedded',
    description: 'Technical discussion on Nucleo integration (still no car)',
    status: 'info',
    type: 'competition',
  },
  {
    date: 'Dec 17, 2025',
    event: 'Stakeholder Engagement',
    description: 'Team leverages university and industry contacts to reach NTRA decision-makers directly - leaving no stone unturned, andabing DHL channels',
    status: 'pending',
    type: 'customs',
  },
  {
    date: 'Dec 23, 2025',
    event: 'Return Warning',
    description: 'DHL warns shipment may be returned if not resolved soon',
    status: 'rejected',
    type: 'customs',
  },
  {
    date: 'Dec 25, 2025',
    event: 'High-Level Support',
    description: 'GUC President and senior faculty provide official letters vouching for educational purpose',
    status: 'info',
    type: 'customs',
  },
  {
    date: 'Dec 29, 2025',
    event: 'Document Lost',
    description: 'NTRA POC out of office — soft copy lost in system',
    status: 'rejected',
    type: 'customs',
  },
  {
    date: 'Jan 1, 2026',
    event: 'ACID System Goes Live',
    description: 'Egypt implements new blockchain import system — adds complexity',
    status: 'info',
    type: 'customs',
  },
  {
    date: 'Jan 22, 2026',
    event: 'Physical Submission',
    description: 'Team submits all documents directly to NTRA in person',
    status: 'pending',
    type: 'customs',
  },
  {
    date: 'Jan 24, 2026',
    event: 'NTRA Approval! 🎉',
    description: 'Decision rectified — clearance finally approved after 63 days',
    status: 'approved',
    type: 'customs',
  },
  {
    date: 'Jan 26, 2026',
    event: 'Final Documents',
    description: 'Legal documents returned to DHL Service Point',
    status: 'approved',
    type: 'customs',
  },
  {
    date: 'Jan 28, 2026',
    event: 'Awaiting Release',
    description: 'DHL confirms ready — standing by for delivery',
    status: 'pending',
    type: 'customs',
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'approved':
      return <CheckCircle2 className="w-4 h-4 text-green-500" />;
    case 'rejected':
      return <XCircle className="w-4 h-4 text-red-500" />;
    case 'pending':
      return <Clock className="w-4 h-4 text-yellow-500" />;
    default:
      return <FileCheck className="w-4 h-4 text-blue-500" />;
  }
};

export const EngineeringScoreboard = () => {
  const [countdown, setCountdown] = useState(getCountdown());
  const [showTimeline, setShowTimeline] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-20 px-6 bg-gradient-to-b from-black to-[hsl(0,0%,3%)] overflow-hidden">
      {/* Racing stripe accents */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-30" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-primary text-sm font-semibold tracking-[0.3em] uppercase mb-4 block">
            Mission Control
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white racing-headline">
            Engineering Scoreboard
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-8"
        >
          {/* Countdown */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[hsl(0,0%,8%)] to-[hsl(0,0%,4%)] border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground uppercase tracking-wider">
                Days to Qualification
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-bold text-white racing-headline">
                {countdown.days}
              </span>
              <span className="text-xl text-muted-foreground">days</span>
            </div>
            <div className="flex gap-4 mt-3 text-sm text-muted-foreground">
              <span>{countdown.hours}h</span>
              <span>{countdown.minutes}m</span>
              <span>{countdown.seconds}s</span>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              March 9th, 2026 — Qualification Round
            </p>
          </div>

          {/* Development Phase */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[hsl(0,0%,8%)] to-[hsl(0,0%,4%)] border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <Gauge className="w-5 h-5 text-accent" />
              </div>
              <span className="text-sm text-muted-foreground uppercase tracking-wider">
                Development Phase
              </span>
            </div>
            <p className="text-2xl font-bold text-white mb-2">
              Simulation & Integration
            </p>
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: '65%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-accent to-primary rounded-full"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              65% — Preparing for hardware integration
            </p>
          </div>

          {/* Car Status */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-[hsl(0,0%,8%)] to-[hsl(0,0%,4%)] border border-white/5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/20 flex items-center justify-center">
                <Truck className="w-5 h-5 text-yellow-500" />
              </div>
              <span className="text-sm text-muted-foreground uppercase tracking-wider">
                Car Status
              </span>
            </div>
            <p className="text-xl font-bold text-white mb-1">
              Customs Cleared
            </p>
            <p className="text-sm text-green-500 flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4" />
              NTRA Approved
            </p>
            <button
              onClick={() => setShowTimeline(!showTimeline)}
              className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              View Timeline
              {showTimeline ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
          </div>
        </motion.div>

        {/* Expandable Timeline */}
        <motion.div
          initial={false}
          animate={{
            height: showTimeline ? 'auto' : 0,
            opacity: showTimeline ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="p-6 rounded-2xl bg-[hsl(0,0%,5%)] border border-white/5">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div className="flex items-center gap-3">
                <h4 className="text-lg font-semibold text-white">
                  The 3-Month Journey
                </h4>
                <span className="text-[10px] px-2 py-1 rounded-full bg-primary/20 text-primary border border-primary/30 font-semibold">
                  🌍 Only Team from Africa
                </span>
              </div>
              <span className="text-xs text-muted-foreground px-3 py-1 rounded-full bg-white/5 border border-white/10">
                {timeline.length} events
              </span>
            </div>

            {/* Summary stats */}
            <div className="grid grid-cols-4 gap-3 mb-6 p-4 rounded-xl bg-black/30 border border-white/5">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">78</p>
                <p className="text-[10px] text-muted-foreground uppercase">Teams Selected</p>
              </div>
              <div className="text-center border-x border-white/10">
                <p className="text-2xl font-bold text-red-500">4</p>
                <p className="text-[10px] text-muted-foreground uppercase">Rejections</p>
              </div>
              <div className="text-center border-r border-white/10">
                <p className="text-2xl font-bold text-yellow-500">63</p>
                <p className="text-[10px] text-muted-foreground uppercase">Days Fought</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-500">1</p>
                <p className="text-[10px] text-muted-foreground uppercase">Victory</p>
              </div>
            </div>

            {/* Legend */}
            <div className="flex gap-4 mb-4 text-[10px]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <span className="text-muted-foreground">Competition</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                <span className="text-muted-foreground">Customs Battle</span>
              </span>
            </div>

            {/* Scrollable timeline */}
            <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
              <div className="space-y-3">
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    className={`flex gap-4 p-3 rounded-lg transition-colors ${item.status === 'approved' ? 'bg-green-500/10 border border-green-500/20' :
                      item.status === 'rejected' ? 'bg-red-500/5 border border-red-500/10' :
                        'hover:bg-white/5'
                      }`}
                  >
                    <div className="flex flex-col items-center shrink-0">
                      {getStatusIcon(item.status)}
                      {index < timeline.length - 1 && (
                        <div className={`w-px flex-1 mt-2 ${item.status === 'approved' ? 'bg-green-500/30' :
                          item.status === 'rejected' ? 'bg-red-500/30' :
                            'bg-white/10'
                          }`} />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-xs text-muted-foreground">
                          {item.date}
                        </p>
                        <span className={`text-[9px] px-1.5 py-0.5 rounded font-medium ${item.type === 'competition'
                          ? 'bg-primary/20 text-primary'
                          : 'bg-yellow-500/20 text-yellow-500'
                          }`}>
                          {item.type === 'competition' ? 'BFMC' : 'DHL/NTRA'}
                        </span>
                        {item.status === 'approved' && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/20 text-green-500">
                            Success
                          </span>
                        )}
                        {item.status === 'rejected' && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-500">
                            Setback
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-white mt-1">
                        {item.event}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom note */}
            <div className="mt-4 pt-4 border-t border-white/5 space-y-3">
              <p className="text-sm text-white text-center font-medium">
                Never give up. The car is coming. 🏎️
              </p>
              <p className="text-[11px] text-muted-foreground text-center leading-relaxed max-w-2xl mx-auto">
                A 1/10 scale educational RC car — initially flagged by customs as "vehicle spare parts," then
                escalated to NTRA review as a "national security concern" under Egypt's strict counter-terrorism
                regulations on autonomous and remote-controlled technology. What followed
                was 63 days of daily phone calls, email threads at all hours, airport visits, and leveraging
                every university and industry connection we had. From the GUC President to senior faculty
                to direct engagement with NTRA officials — we left no stone unturned.
              </p>
              <p className="text-[10px] text-primary/80 text-center font-medium">
                Proud to be the only African team — also representing the Arab world and Middle East. 🌍
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EngineeringScoreboard;
