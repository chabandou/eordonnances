import Lungs from "@/app/ui/icons/Lungs";
import Heart from "@/app/ui/icons/Heart";
import SearchGlass from "@/app/ui/icons/SearchGlass";
import Rx from "@/app/ui/icons/Rx";

export default function DiagnosticsGrid({ Dx }) {
    // Mock icons for now based on index or type if we had it.
    // Using a rotation of available icons.
    const icons = [Lungs, SearchGlass, Heart, Rx];
    const colors = ["bg-blue-600", "bg-orange-600", "bg-cyan-600", "bg-sky-600"];

    const diagnostics = Dx && Dx.length > 0 ? Dx : ["Clinique", "Biologie", "Imagerie"];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {diagnostics.slice(0, 4).map((dx, index) => {
                const Icon = icons[index % icons.length];
                return (
                    <div
                        key={index}
                        className="flex items-center gap-4 p-4 rounded-xl bg-black/10 backdrop-blur-sm border border-white/10 hover:bg-black/30 transition-colors"
                    >
                        <div className={`p-2 rounded-lg ${colors[index % colors.length]} text-white shrink-0`}>
                            {/* Ensure Icon is rendered as a component if it's a React component, or fallback */}
                            <Icon className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-md leading-tight">{dx}</h4>
                            <p className="text-white text-xs opacity-80">Abnormalité/Taux Elevé</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
