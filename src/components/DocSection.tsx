import React from "react";

const DocSection: React.FC<{ title: string; id: string; children: React.ReactNode }> = ({ title, id, children }) => (
    <div id={id} className="mb-16 scroll-mt-24">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-6 flex items-center gap-3">
            <span className="w-1.5 h-8 bg-orange-500 rounded-full" />
            {title}
        </h2>
        <div className="space-y-6 text-slate-300 leading-relaxed text-lg">
            {children}
        </div>
    </div>
);

export default DocSection;
