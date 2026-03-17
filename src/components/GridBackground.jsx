export default function GridBackground() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
            <div className="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black)]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="100%"
                    height="100%"
                    className="absolute inset-0 h-full w-full"
                >
                    <pattern id="global-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <rect
                            width="40"
                            height="40"
                            fill="none"
                            stroke="white"
                            strokeWidth="0.5"
                            className="opacity-40 animate-gridPulse"
                        />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#global-grid)" />
                </svg>
            </div>
        </div>
    );
}