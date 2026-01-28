import { motion } from 'framer-motion';
import { Box, Cpu, Rocket } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: Box,
    title: 'The Digital Twin (Gazebo)',
    description: 'We build and test every line of code in a simulated "Smart City" before it ever touches a wheel.',
    highlight: 'gazebo',
  },
  {
    number: '02',
    icon: Cpu,
    title: 'The Brain-Spine Handshake',
    description: 'Our custom Serial Protocol ensures the logic (Python) and the reflexes (C++) are perfectly synchronized.',
    highlight: 'protocol',
  },
  {
    number: '03',
    icon: Rocket,
    title: 'Sim-to-Real Deployment',
    description: 'The moment the car arrives, we transfer our 90% tested software onto the physical Reely TC-04 chassis.',
    highlight: 'deploy',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0, 0, 0.2, 1] as const,
    },
  },
};

export const RoadToAutonomous = () => {
  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-black via-[hsl(0,0%,3%)] to-black overflow-hidden">
      {/* Background grid effect */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.3) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-semibold tracking-[0.3em] uppercase mb-4 block">
            Engineering Pipeline
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white racing-headline mb-4">
            Road to Autonomous
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our simulation-first approach ensures every algorithm is battle-tested before deployment.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-3 gap-8"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="group relative"
              >
                {/* Connector line (hidden on mobile, visible between cards on desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-full h-[2px] bg-gradient-to-r from-primary/50 via-primary/20 to-transparent z-0" />
                )}

                {/* Card */}
                <div className="relative h-full p-8 rounded-2xl bg-gradient-to-br from-[hsl(0,0%,8%)] to-[hsl(0,0%,4%)] border border-white/5 backdrop-blur-sm transition-all duration-500 group-hover:border-primary/30 group-hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]">
                  {/* Step Number Badge */}
                  <div className="absolute -top-4 -left-2 w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center shadow-lg shadow-primary/30">
                    <span className="text-black font-bold text-lg racing-headline">
                      {step.number}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="mt-6 mb-6 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-primary" strokeWidth={1.5} />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  {/* Bottom glow accent */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default RoadToAutonomous;
