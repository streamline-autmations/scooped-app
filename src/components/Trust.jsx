import Reveal from './Reveal.jsx';
import { Flag, Truck, Camera } from './Icon.jsx';

export default function Trust() {
  const items = [
    { Icon: Flag,   h: 'Hand-packed in SA',  p: 'Every box packed with care, right here locally.' },
    { Icon: Truck,  h: 'Nationwide delivery', p: 'Door-to-door via Courier Guy, 2–4 working days.' },
    { Icon: Camera, h: 'Filmed just for you', p: 'We film every scoop and share the clip with you.' },
  ];
  return (
    <section className="trust-sec py-16">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-7">
        <Reveal>
          <div className="grid grid-cols-1 gap-8 rounded-[28px] bg-ink p-10 text-center text-white md:grid-cols-3 sm:p-12">
            {items.map((i) => (
              <div key={i.h} className="flex flex-col items-center">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl text-coral"
                     style={{ background: 'rgba(240,98,90,.12)', border: '1px solid rgba(240,98,90,.25)' }}>
                  <i.Icon style={{ width: 22, height: 22 }} />
                </div>
                <h4 className="font-display text-xl font-extrabold mb-1.5">{i.h}</h4>
                <p className="max-w-[260px] text-[14px] leading-relaxed opacity-60">{i.p}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
