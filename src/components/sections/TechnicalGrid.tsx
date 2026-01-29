import { motion } from 'framer-motion';
import { Eye, Cpu, Brain } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export const TechnicalGrid = () => {
  const { t } = useTranslation();

  const modules = [
    {
      icon: Eye,
      name: t('technicalGrid.cards.perception.name'),
      subtitle: t('technicalGrid.cards.perception.subtitle'),
      responsibility: t('technicalGrid.cards.perception.responsibility'),
      stack: ['OpenCV', 'Python', 'Gazebo'],
      color: 'from-cyan-500 to-blue-500',
      glowColor: 'rgba(6, 182, 212, 0.3)',
    },
    {
      icon: Cpu,
      name: t('technicalGrid.cards.embedded.name'),
      subtitle: t('technicalGrid.cards.embedded.subtitle'),
      responsibility: t('technicalGrid.cards.embedded.responsibility'),
      stack: ['C++', 'mbed OS', 'STM32'],
      color: 'from-green-500 to-emerald-500',
      glowColor: 'rgba(34, 197, 94, 0.3)',
    },
    {
      icon: Brain,
      name: t('technicalGrid.cards.integration.name'),
      subtitle: t('technicalGrid.cards.integration.subtitle'),
      responsibility: t('technicalGrid.cards.integration.responsibility'),
      stack: ['Python FSM', 'WebSockets'],
      color: 'from-purple-500 to-pink-500',
      glowColor: 'rgba(168, 85, 247, 0.3)',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0, 0, 0.2, 1] as const,
      },
    },
  };

  return (
    <section className="relative py-24 px-6 bg-black overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

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
            {t('technicalGrid.architecture')}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white racing-headline mb-4">
            {t('technicalGrid.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('technicalGrid.subtitle')}
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid md:grid-cols-3 gap-6"
        >
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <motion.div
                key={module.name}
                variants={cardVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group relative"
              >
                {/* Card */}
                <div
                  className="relative h-full p-8 rounded-2xl bg-[hsl(0,0%,5%)] border border-white/5 overflow-hidden transition-all duration-500 flex flex-col"
                  style={{
                    boxShadow: `0 0 0 rgba(0,0,0,0)`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = `0 20px 60px ${module.glowColor}`;
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 0 0 rgba(0,0,0,0)';
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                  }}
                >
                  {/* Gradient top border */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${module.color} opacity-60 group-hover:opacity-100 transition-opacity`}
                  />

                  {/* Icon */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${module.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                  </div>

                  {/* Title */}
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold text-white mb-1">
                      {module.name}
                    </h3>
                    <span className="text-sm text-muted-foreground italic">
                      {module.subtitle}
                    </span>
                  </div>

                  {/* Responsibility - flex-1 pushes badges down */}
                  <p className="text-muted-foreground mb-6 leading-relaxed flex-1">
                    {module.responsibility}
                  </p>

                  {/* Tech Stack Badges - always at bottom */}
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {module.stack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-white/5 text-white/70 border border-white/10 group-hover:border-white/20 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Corner accent */}
                  <div
                    className={`absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-br ${module.color} opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity`}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default TechnicalGrid;
