import React, { Suspense } from "react";
import { PackAnimCard } from "./pack-anim-card";
import { RotatingCard } from "./rotating-card";

export const Scene: React.FC<{ toggle: boolean }> = ({ toggle }) => {
    return (
        <Suspense fallback={null}>
            {toggle ? <PackAnimCard /> : <RotatingCard />}
        </Suspense>
    );
};
