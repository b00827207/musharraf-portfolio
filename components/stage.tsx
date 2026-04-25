'use client';

import { useAether } from './aether-core';
import { IdleView } from './views/idle-view';
import { DiagnosticView } from './views/diagnostic-view';
import { ModuleView } from './views/module-view';
import { IdentityView } from './views/identity-view';
import { ModulesListView } from './views/modules-list-view';
import { RecruitView } from './views/recruit-view';
import { HelpView } from './views/help-view';

export function Stage() {
  const { view } = useAether();

  return (
    <div className="flex-1 min-w-0 flex flex-col">
      <div className="flex-1 overflow-y-auto crt">
        <div className="px-5 md:px-8 py-6 md:py-8 max-w-[1400px] mx-auto">
          {/* Render key forces remount per view, replaying enter animations */}
          <div key={JSON.stringify(view)} className="animate-fade-in">
            {view.type === 'idle' && <IdleView />}
            {view.type === 'diagnostic' && (
              <DiagnosticView domain={view.domain} caseIdx={view.caseIdx} />
            )}
            {view.type === 'module' && <ModuleView slug={view.slug} />}
            {view.type === 'identity' && <IdentityView />}
            {view.type === 'modules-list' && <ModulesListView />}
            {view.type === 'recruit' && <RecruitView />}
            {view.type === 'help' && <HelpView />}
          </div>
        </div>
      </div>
    </div>
  );
}
