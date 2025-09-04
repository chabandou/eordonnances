
import SpecialtyCards from "./ui/SpecialtyCards";


export const revalidate = +(process.env.NEXT_REVALIDATION_TIME || 0) || 60
export const dynamic = 'force-static';

export default function Home() {
  return (
    <main className="overflow-x-hidden flex items-center justify-center py-4 lg:my-auto">
      <SpecialtyCards />
    </main>
  );
}

