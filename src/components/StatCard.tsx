import { ReactNode, useEffect, useRef, useState } from "react";
import { Check, ChevronDown } from "lucide-react";

interface StatCardProps {
    value: string;
    label: string;
    tooltipTitle?: string;
    items?: string[];
    children?: ReactNode;
}

const StatCard = ({ value, label, tooltipTitle, items, children }: StatCardProps) => {
    const hasTooltip = tooltipTitle || items || children;
    const num = parseInt(value, 10);
    const isNumeric = !isNaN(num);
    const [displayValue, setDisplayValue] = useState(isNumeric ? "0" : value);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isNumeric) return;
        const observer = new IntersectionObserver(
            (entries) => {
                if (!entries[0].isIntersecting) return;
                observer.disconnect();
                let start = 0;
                const steps = 24;
                const interval = 700 / steps;
                const increment = num / steps;
                const timer = setInterval(() => {
                    start += increment;
                    if (start >= num) {
                        setDisplayValue(value);
                        clearInterval(timer);
                    } else {
                        setDisplayValue(Math.floor(start).toString());
                    }
                }, interval);
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [value, num, isNumeric]);

    return (
        <div ref={ref} className={`flex flex-col items-center gap-1 transition-transform duration-200 ${hasTooltip ? "relative group cursor-pointer hover:-translate-y-1" : ""}`}>
            <span className="text-3xl font-semibold gradient-text">{displayValue}</span>
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1 group-hover:text-primary transition-colors">
                {label}
                {hasTooltip && <ChevronDown className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" />}
            </span>

            {/* Tooltip */}
            {hasTooltip && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 min-w-[280px] bg-card border border-border rounded-xl p-4 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    {tooltipTitle && (
                        <div className="text-xs font-mono uppercase tracking-wider text-primary mb-3 pb-2 border-b border-border">
                            {tooltipTitle}
                        </div>
                    )}
                    <ul className="space-y-2">
                        {items ? (
                            items.map((item, index) => (
                                <li key={index} className="flex items-center gap-2 text-sm">
                                    <Check className="w-4 h-4 text-primary" />
                                    {item}
                                </li>
                            ))
                        ) : (
                            children
                        )}
                    </ul>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-card" />
                </div>
            )}
        </div>
    );
};

export default StatCard;
