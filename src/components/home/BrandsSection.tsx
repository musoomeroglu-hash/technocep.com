type BrandData = {
  id: string;
  name: string;
};

export default function BrandsSection({ brands }: { brands: BrandData[] }) {
  const doubled = [...brands, ...brands];

  return (
    <section className="py-16 bg-[#f8f9fa] overflow-hidden">
      <div className="text-center mb-10">
        <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">
          Desteklenen Markalar
        </span>
      </div>

      <div className="relative">
        {/* Kenar gradientleri */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#f8f9fa] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#f8f9fa] to-transparent z-10 pointer-events-none" />

        {/* Sıra 1 — soldan sağa */}
        <div className="flex mb-5" style={{ width: "max-content" }}>
          <div
            className="flex gap-8 items-center"
            style={{ animation: "marquee 28s linear infinite" }}
          >
            {doubled.map((brand, i) => (
              <span
                key={`a-${i}`}
                className="font-heading font-bold text-2xl text-[#1a1a2e]/20 whitespace-nowrap px-4 hover:text-[#1a1a2e]/50 transition-colors cursor-default"
              >
                {brand.name}
              </span>
            ))}
          </div>
        </div>

        {/* Sıra 2 — sağdan sola */}
        <div className="flex" style={{ width: "max-content" }}>
          <div
            className="flex gap-8 items-center"
            style={{ animation: "marquee-reverse 22s linear infinite" }}
          >
            {doubled.map((brand, i) => (
              <span
                key={`b-${i}`}
                className="font-heading font-bold text-xl text-[#00d4ff]/25 whitespace-nowrap px-4 hover:text-[#00d4ff]/60 transition-colors cursor-default"
              >
                {brand.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
