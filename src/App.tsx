import { useState } from 'react';
import Header, { Tab } from './components/Header';
import TabInicio from './components/TabInicio';
import TabRutina from './components/TabRutina';
import TabMediciones from './components/TabMediciones';
import TabProgreso from './components/TabProgreso';
import { Sparkles, Jack } from './components/DisneyDecorations';
import ConfigMissing from './components/ConfigMissing';
import { isSupabaseConfigured } from './lib/supabase';

export default function App() {
  const [tab, setTab] = useState<Tab>('inicio');

  if (!isSupabaseConfigured) {
    return <ConfigMissing />;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#FFF0F5' }}>
      <Header active={tab} onChange={setTab} />
      <main
        style={{
          maxWidth: 480,
          margin: '0 auto',
          padding: '4px 14px 80px',
          position: 'relative',
        }}
      >
        <Sparkles />
        <Jack />
        {tab === 'inicio' && <TabInicio onGoRutina={() => setTab('rutina')} />}
        {tab === 'rutina' && <TabRutina />}
        {tab === 'mediciones' && <TabMediciones />}
        {tab === 'progreso' && <TabProgreso />}
        <div
          style={{
            textAlign: 'center',
            fontSize: 10,
            color: '#72243E',
            marginTop: 18,
            opacity: 0.8,
          }}
        >
          ★ Cetzin Ha Tracker 2026 ★
        </div>
      </main>
    </div>
  );
}
