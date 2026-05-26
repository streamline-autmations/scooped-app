import Reveal from './Reveal.jsx';

export default function Trust() {
  const items = [
    { ico: '🇿🇦', h: 'Hand-packed in SA',  p: 'Every box packed with care, right here locally.' },
    { ico: '🚚', h: 'Nationwide delivery', p: 'Door-to-door via Courier Guy, 2–4 working days.' },
    { ico: '🎬', h: 'Filmed just for you', p: 'We film every scoop and share the clip with you.' },
  ];
  return (
    <section className="trust-sec py-16">
      <div className="mx-auto max-w-[1180px] px-6 sm:px-7">
        <Reveal>
          <div className="grid grid-cols-1 gap-7 rounded-[28px] bg-ink p-10 text-center text-white md:grid-cols-3 sm:p-12">
            {items.map((i) => (
              <div key={i.h}>
                <div className="mb-2 text-3xl">{i.ico}</div>
                <h4 className="font-display text-xl font-extrabold mb-1.5">{i.h}</h4>
                <p className="text-[14px] leading-relaxed opacity-60">{i.p}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
