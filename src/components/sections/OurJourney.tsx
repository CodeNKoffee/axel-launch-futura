import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react';

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
  caption: string;
  date: string;
  location?: string;
}

const journeyMedia: MediaItem[] = [
  // Aug 4, 2025 - Sushi hangout
  {
    type: 'image',
    src: parkedSushi,
    caption: 'Parked and ready — sushi time, arrived right on time',
    date: 'Aug 4, 2025',
    location: 'Cairo',
  },
  {
    type: 'image',
    src: casualWalk,
    caption: 'Casual walk because we thought sushi wasn\'t the best idea at first',
    date: 'Aug 4, 2025',
    location: 'Cairo',
  },
  {
    type: 'image',
    src: debatingIkea,
    caption: 'Debating IKEA prices during the hangout',
    date: 'Aug 4, 2025',
    location: 'Cairo',
  },
  {
    type: 'video',
    src: sushiHangout,
    caption: 'Sushi hangout time with the team',
    date: 'Aug 4, 2025',
    location: 'Cairo',
  },
  // Sep 25, 2025 - Team meets by coincidence
  {
    type: 'video',
    src: teamCoincidence2,
    caption: 'RAVEN team and friends meet by coincidence (Part 1)',
    date: 'Sep 25, 2025',
  },
  {
    type: 'video',
    src: teamCoincidence,
    caption: 'RAVEN team and friends meet by coincidence (Part 2)',
    date: 'Sep 25, 2025',
  },
  // Nov 30, 2025 - First visit to DHL/Airport
  {
    type: 'image',
    src: toAirport1,
    caption: 'Journey to DHL Cargo Village at Cairo Airport',
    date: 'Nov 30, 2025',
    location: 'Cairo Airport',
  },
  {
    type: 'video',
    src: toAirportVideo1,
    caption: 'En route to the cargo clearance facility',
    date: 'Nov 30, 2025',
    location: 'Cairo',
  },
  {
    type: 'image',
    src: toAirport2,
    caption: 'Arriving at DHL area',
    date: 'Nov 30, 2025',
    location: 'DHL Cargo Village',
  },
  {
    type: 'video',
    src: cargoVillageVideo,
    caption: 'Inside the DHL cargo area and customs authority',
    date: 'Nov 30, 2025',
    location: 'DHL Cargo Village',
  },
  {
    type: 'image',
    src: toAirport3,
    caption: 'At the customs clearance facility',
    date: 'Nov 30, 2025',
    location: 'Cairo Airport Customs',
  },
  // Dec 8, 2025 - BFMC Workshop: Brain session (while fighting customs)
  {
    type: 'image',
    src: teamPhoto,
    caption: 'The team takes and submits their official team photo',
    date: 'Dec 8, 2025',
    location: 'GUC Campus',
  },
  {
    type: 'image',
    src: yasminBrainSession,
    caption: 'Yasmin attending the BFMC Brain workshop session',
    date: 'Dec 8, 2025',
    location: 'Indoor',
  },
  {
    type: 'image',
    src: amrOutsideCold,
    caption: 'Amr taking a deep breath in the cold while attending remotely',
    date: 'Dec 8, 2025',
    location: 'Outside',
  },
  {
    type: 'video',
    src: hatemFindingSpot,
    caption: 'Hatem finding a spot to sit for the meeting after gym — in the rain',
    date: 'Dec 8, 2025',
    location: 'GUC Campus',
  },
  {
    type: 'video',
    src: hatemRainsMeeting,
    caption: 'Hatem casually listening to the meeting while it rains on campus',
    date: 'Dec 8, 2025',
    location: 'GUC Campus',
  },
  {
    type: 'video',
    src: salmaFromCar,
    caption: 'Salma attending the Brain session from the car',
    date: 'Dec 8, 2025',
    location: 'In Car',
  },
  // Dec 29, 2025 - NTRA appeal
  {
    type: 'image',
    src: submissionLetter,
    caption: 'Submitting the appeal letter to rectify NTRA decision',
    date: 'Dec 29, 2025',
    location: 'NTRA Office',
  },
  // Jan 24, 2026 - NTRA approval
  {
    type: 'image',
    src: atCampus,
    caption: 'Day of NTRA approval — celebrating on campus',
    date: 'Jan 24, 2026',
    location: 'GUC Campus',
  },
  // Jan 26, 2026 - Final DHL paperwork
  {
    type: 'image',
    src: emptyDocs,
    caption: 'Submitted legal documents for DHL to finalize clearance',
    date: 'Jan 26, 2026',
  },
  {
    type: 'image',
    src: submittingDocs1,
    caption: 'Submitting final documents to DHL Service Point',
    date: 'Jan 26, 2026',
    location: 'DHL Service Point',
  },
  {
    type: 'image',
    src: submittingDocs2,
    caption: 'Final clearance paperwork submitted',
    date: 'Jan 26, 2026',
    location: 'DHL Service Point',
  },
];

export const OurJourney = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % journeyMedia.length);
    }
  };

  const goPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        (selectedIndex - 1 + journeyMedia.length) % journeyMedia.length
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
            Behind The Scenes
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white racing-headline mb-4">
            Our Journey
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
            The road to BFMC 2026 wasn't just code — it was customs documents,
            airport runs, and unwavering belief. We started documenting our journey months before
            even registering, because we knew we'd be part of this future, regardless of the odds.
            <br />
            <span className="text-sm text-primary/80 mt-2 block">
              * English captions for videos will be available soon.
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
            When our car was misclassified by customs as "vehicle spare parts" and rejected by NTRA,
            most teams would have panicked. We doubled down on our <strong className="text-primary">Simulation-First</strong> strategy.
            The dates below prove it — we were working and documenting long before valid registration.
            While fighting bureaucracy, our digital twin kept evolving. The struggle didn't stop us; it defined us.
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
          {journeyMedia.map((item, index) => (
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
                  alt={item.caption}
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
                    {item.caption}
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
              {journeyMedia[selectedIndex].type === 'image' ? (
                <img
                  src={journeyMedia[selectedIndex].src}
                  alt={journeyMedia[selectedIndex].caption}
                  className="w-full max-h-[70vh] object-contain rounded-lg"
                />
              ) : (
                <video
                  src={journeyMedia[selectedIndex].src}
                  className="w-full max-h-[70vh] object-contain rounded-lg"
                  controls
                  autoPlay
                />
              )}

              {/* Caption */}
              <div className="mt-4 text-center">
                <p className="text-white text-lg font-medium">
                  {journeyMedia[selectedIndex].caption}
                </p>
                <div className="flex items-center justify-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {journeyMedia[selectedIndex].date}
                  </span>
                  {journeyMedia[selectedIndex].location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {journeyMedia[selectedIndex].location}
                    </span>
                  )}
                </div>
              </div>

              {/* Counter */}
              <p className="text-center text-muted-foreground text-sm mt-4">
                {selectedIndex + 1} / {journeyMedia.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default OurJourney;
