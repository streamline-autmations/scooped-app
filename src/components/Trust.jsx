import Reveal from './Reveal.jsx';
import { Flag, Truck, Camera } from './Icon.jsx';

export default function Trust() {
  const items = [
    { Icon: Flag,   h: 'Hand-packed in SA',   p: 'Every box packed with care, right here locally.', bg: 'bg-pink-100' },
    { Icon: Truck,  h: 'Nationwide delivery', p: 'Door-to-door via Courier Guy, 2–4 working days.', bg: 'bg-lemon' },
    { Icon: Camera, h: 'Filmed just for you', p: 'We film every scoop and share the clip with you.', bg: 'bg-lavender' },
  ];
  return (
    <section className="trust-sec py-16">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-7">
        <Reveal>
          <div className="grid grid-cols-1 gap-6 rounded-card border border-line bg-white p-8 sm:p-10 md:grid-cols-3 shadow-soft">
            {items.map((i) => (
              <div key={i.h} className="flex items-start gap-4">
                <div className={`grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl text-ink/85 ${i.bg}`}>
                  <i.Icon style={{ width: 22, height: 22 }} />
                </div>
                <div>
                  <h4 className="font-display text-lg font-bold mb-1">{i.h}</h4>
                  <p className="text-[14px] leading-relaxed opacity-65">{i.p}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
