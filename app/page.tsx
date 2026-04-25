'use client';

import { useEffect, useState } from 'react';
import { BootSequence } from '@/components/boot';
import { TelemetryRail } from '@/components/telemetry-rail';
import { Stage } from '@/components/stage';
import { CommandBar } from '@/components/command-bar';
import { useAether } from '@/components/aether-core';

export default function HomePage() {
  return <Shell />;
}

function Shell() {
  const { log } = useAether();
  // Boot only on first render. Skip after that within the SPA.
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    // Once booting completes, log the ready event.
    if (!booting) {
      log('CONSOLE READY', 'system');
      log('AWAITING COMMAND', 'info');
    }
  }, [booting, log]);

  return (
    <>
      {booting && <BootSequence onDone={() => setBooting(false)} />}

      <main
        className={`flex flex-col h-screen transition-opacity duration-500 ${
          booting ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="flex flex-1 min-h-0">
          <TelemetryRail />
          <Stage />
        </div>
        <CommandBar />
      </main>
    </>
  );
}
