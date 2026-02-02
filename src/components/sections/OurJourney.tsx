import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Import all journey media
import atCampus from '@/assets/our-journey/at-campus-day-of-ntra-approval.jpeg';
import submissionLetter from '@/assets/our-journey/day-of-submisison-letter-rectifying-ntra-appeal.png';
import emptyDocs from '@/assets/our-journey/empty-dhl-legal-docs-returned-to-dhl-after-ntra-approval.jpeg';
import submittingDocs1 from '@/assets/our-journey/submitting-dhl-legal-docs-returned-to-dhl-after-ntra-approval.png';
import submittingDocs2 from '@/assets/our-journey/submitting-dhl-legal-docs-returned-to-dhl-after-ntra-approval-2.png';
import toAirport1 from '@/assets/our-journey/to-airport-dhl-cargo-villiage-cairo-1.jpeg';
import toAirport2 from '@/assets/our-journey/to-airport-dhl-cargo-villiage-cairo-2.jpeg';
import toAirport3 from '@/assets/our-journey/to-airport-dhl-cargo-villiage-cairo-3.jpeg';

// Videos
import cargoVillageVideo from '@/assets/our-journey/at-cargo-villiage-dhl-area-and-customs-authority.mp4';
import toAirportVideo1 from '@/assets/our-journey/to-airport-dhl-cargo-villiage-cairo.mp4';
import toAirportVideo2 from '@/assets/our-journey/to-airport-dhl-cargo-villiage-cairo-2.mp4';
import toAirportVideo3 from '@/assets/our-journey/to-airport-dhl-cargo-villiage-cairo-3.mp4';
import lostAtCargo from '@/assets/our-journey/hatem-amr-omar-visit0-dhl-cargo-village-and-getfumbled-by-security-workers-lost.mp4';

// Dec 8, 2025 - BFMC Workshop: Brain session
import yasminBrainSession from '@/assets/our-journey/Yasmin-inside-the-BFMC Workshop-Brain-session.jpeg';
import amrOutsideCold from '@/assets/our-journey/amr-taking-deep-breath in-the-cold-while-also-attending-from-outside.jpeg';
import hatemRainsMeeting from '@/assets/our-journey/hatem-causllay-lisnteing-to-meeting-while-rains.mp4';
import hatemFindingSpot from '@/assets/our-journey/hatem-locating-a-place-to-sit-for-the-meeting-while-rain-after-gym-on-mcapus.mp4';
import salmaFromCar from '@/assets/our-journey/salma-attedning-session-ofbrain-from-car.mp4';
import teamPhoto from '@/assets/our-journey/the-team-takes-and-submits-team-photo.jpeg';

// Aug 4, 2025 - Sushi hangout
import casualWalk from '@/assets/our-journey/casual-walk-cuz-we-though-sushi-isnt-best-atm.jpeg';
import debatingIkea from '@/assets/our-journey/debating-ikea-prices.jpeg';
import parkedSushi from '@/assets/our-journey/parked-and-time-for-sushi-arrived-on-time.jpeg';
import sushiHangout from '@/assets/our-journey/sushi-hangout-time.mp4';

// Sep 25, 2025 - Team meets by coincidence
import teamCoincidence from '@/assets/our-journey/raven-team-and-their-friends-meet-by coindeicen.mp4';
import teamCoincidence2 from '@/assets/our-journey/raven-team-and-their-friends-meet-by coindeicen-2.mp4';

interface MediaItem {
  type: 'image' | 'video';
  src: string;
  captionKey: string;
  date: string;
  locationKey?: string;
}

const journeyMediaRaw = [
  // Aug 4, 2025 - Sushi hangout
  {
    type: 'image',
    src: parkedSushi,
    captionKey: '0',
    date: 'Aug 4, 2025',
    locationKey: '0',
  },
  {
    type: 'image',
    src: casualWalk,
    captionKey: '1',
    date: 'Aug 4, 2025',
    locationKey: '1',
  },
  {
    type: 'image',
    src: debatingIkea,
    captionKey: '2',
    date: 'Aug 4, 2025',
    locationKey: '2',
  },
  {
    type: 'video',
    src: sushiHangout,
    captionKey: '3',
    date: 'Aug 4, 2025',
    locationKey: '3',
  },
  // Sep 25, 2025 - Team meets by coincidence
  {
    type: 'video',
    src: teamCoincidence2,
    captionKey: '4',
    date: 'Sep 25, 2025',
  },
  {
    type: 'video',
    src: teamCoincidence,
    captionKey: '5',
    date: 'Sep 25, 2025',
  },
  // Nov 30, 2025 - First visit to DHL/Airport
  {
    type: 'image',
    src: toAirport1,
    captionKey: '6',
    date: 'Nov 30, 2025',
    locationKey: '6',
  },
  {
    type: 'video',
    src: toAirportVideo1,
    captionKey: '7',
    date: 'Nov 30, 2025',
    locationKey: '7',
  },
  {
    type: 'image',
    src: toAirport2,
    captionKey: '8',
    date: 'Nov 30, 2025',
    locationKey: '8',
  },
  {
    type: 'video',
    src: cargoVillageVideo,
    captionKey: '9',
    date: 'Nov 30, 2025',
    locationKey: '9',
  },
  {
    type: 'video',
    src: lostAtCargo,
    captionKey: '22',
    date: 'Nov 30, 2025',
    locationKey: '22',
  },
  {
    type: 'image',
    src: toAirport3,
    captionKey: '10',
    date: 'Nov 30, 2025',
    locationKey: '10',
  },
  // Dec 8, 2025 - BFMC Workshop: Brain session (while fighting customs)
  {
    type: 'image',
    src: teamPhoto,
    captionKey: '11',
    date: 'Dec 8, 2025',
    locationKey: '11',
  },
  {
    type: 'image',
    src: yasminBrainSession,
    captionKey: '12',
    date: 'Dec 8, 2025',
    locationKey: '12',
  },
  {
    type: 'image',
    src: amrOutsideCold,
    captionKey: '13',
    date: 'Dec 8, 2025',
    locationKey: '13',
  },
  {
    type: 'video',
    src: hatemFindingSpot,
    captionKey: '14',
    date: 'Dec 8, 2025',
    locationKey: '14',
  },
  {
    type: 'video',
    src: hatemRainsMeeting,
    captionKey: '15',
    date: 'Dec 8, 2025',
    locationKey: '15',
  },
  {
    type: 'video',
    src: salmaFromCar,
    captionKey: '16',
    date: 'Dec 8, 2025',
    locationKey: '16',
  },
  // Dec 29, 2025 - NTRA appeal
  {
    type: 'image',
    src: submissionLetter,
    captionKey: '17',
    date: 'Dec 29, 2025',
    locationKey: '17',
  },
  // Jan 24, 2026 - NTRA approval
  {
    type: 'image',
    src: atCampus,
    captionKey: '18',
    date: 'Jan 24, 2026',
    locationKey: '18',
  },
  // Jan 26, 2026 - Final DHL paperwork
  {
    type: 'image',
    src: emptyDocs,
    captionKey: '19',
    date: 'Jan 26, 2026',
  },
  {
    type: 'image',
    src: submittingDocs1,
    captionKey: '20',
    date: 'Jan 26, 2026',
    locationKey: '20',
  },
  {
    type: 'image',
    src: submittingDocs2,
    captionKey: '21',
    date: 'Jan 26, 2026',
    locationKey: '21',
  },
];

export const OurJourney = () => {
  const { t } = useTranslation();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % journeyMediaRaw.length);
    }
  };

  const goPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        (selectedIndex - 1 + journeyMediaRaw.length) % journeyMediaRaw.length
      );
    }
  };

  return (
    <section className="relative py-24 px-6 bg-gradient-to-b from-[hsl(0,0%,3%)] to-black overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-4"
        >
          <span className="text-primary text-sm font-semibold tracking-[0.3em] uppercase mb-4 block">
            {t('ourJourney.subtitle')}
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white racing-headline mb-4">
            {t('ourJourney.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            {t('ourJourney.description')}
            <br />
            <span className="text-sm text-primary/80 mt-2 block">
              {t('ourJourney.note')}
            </span>
          </p>
        </motion.div>

        {/* Story intro */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto mb-12 p-6 rounded-2xl bg-gradient-to-r from-primary/10 to-transparent border-l-4 border-primary"
        >
          <p className="text-white/90 leading-relaxed">
            {t('ourJourney.story')}
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {journeyMediaRaw.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
              onClick={() => openLightbox(index)}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-[hsl(0,0%,8%)]"
            >
              {item.type === 'image' ? (
                <img
                  src={item.src}
                  alt={t(`ourJourney.media.${item.captionKey}.caption`)}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <>
                  <video
                    src={item.src}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-12 h-12 rounded-full bg-black/50 flex items-center justify-center group-hover:bg-primary/80 transition-colors">
                      <Play className="w-5 h-5 text-white ml-1" fill="white" />
                    </div>
                  </div>
                </>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white text-xs font-medium line-clamp-2">
                    {t(`ourJourney.media.${item.captionKey}.caption`)}
                  </p>
                  <p className="text-white/60 text-[10px] mt-1">{item.date}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Navigation */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Content */}
            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {journeyMediaRaw[selectedIndex].type === 'image' ? (
                <img
                  src={journeyMediaRaw[selectedIndex].src}
                  alt={t(`ourJourney.media.${journeyMediaRaw[selectedIndex].captionKey}.caption`)}
                  className="w-full max-h-[70vh] object-contain rounded-lg"
                />
              ) : (
                <video
                  src={journeyMediaRaw[selectedIndex].src}
                  className="w-full max-h-[70vh] object-contain rounded-lg"
                  controls
                  autoPlay
                />
              )}

              {/* Caption */}
              <div className="mt-4 text-center">
                <p className="text-white text-lg font-medium">
                  {t(`ourJourney.media.${journeyMediaRaw[selectedIndex].captionKey}.caption`)}
                </p>
                <div className="flex items-center justify-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {journeyMediaRaw[selectedIndex].date}
                  </span>
                  {journeyMediaRaw[selectedIndex].locationKey && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {t(`ourJourney.media.${journeyMediaRaw[selectedIndex].locationKey}.location`)}
                    </span>
                  )}
                </div>
              </div>

              {/* Counter */}
              <p className="text-center text-muted-foreground text-sm mt-4">
                {selectedIndex + 1} / {journeyMediaRaw.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default OurJourney;
