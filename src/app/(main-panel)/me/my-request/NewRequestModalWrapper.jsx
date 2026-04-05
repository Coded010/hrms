"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import NewRequestModal from "./NewRequestModal";

export default function NewRequestModalWrapper({ balances = [] }) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors shadow-sm"
            >
                <Plus className="w-4 h-4" />
                Create New Request
            </button>
            <NewRequestModal open={open} onClose={() => setOpen(false)} balances={balances} />
        </>
    );
}
