import Hero from '@/features/landing-page/components/Hero';

export default function Home() {
  return (
    <main>
      <Hero />
      {/* Placeholder section to enable scrolling */}
      <section className="flex min-h-screen items-center justify-center bg-zinc-900 text-white">
        <h2 className="text-4xl font-bold">More features coming soon...</h2>
      </section>
    </main>
  );
}
