
import SpecialtyCards from "./ui/SpecialtyCards";

export const revalidate = 60
export const dynamic = 'force-static';

export default function Home() {
  return (
    <main className="overflow-x-hidden flex flex-col items-center justify-center py-4 lg:my-auto" style={{ backgroundColor: 'var(--background-color, var(--card-color))' }}>
      <SpecialtyCards />
    </main>
  );
}

