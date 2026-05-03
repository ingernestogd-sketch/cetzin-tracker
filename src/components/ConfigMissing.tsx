export default function ConfigMissing() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FFF0F5',
        padding: 20,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        color: '#4B1528',
      }}
    >
      <div
        style={{
          maxWidth: 480,
          margin: '40px auto',
          background: '#fff',
          border: '1.5px solid #ED93B1',
          borderRadius: 16,
          padding: 20,
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: 1.5,
            color: '#D4537E',
            fontWeight: 500,
          }}
        >
          ★ FALTA CONFIGURACION ★
        </div>
        <h2 style={{ fontSize: 17, fontWeight: 500, marginTop: 6 }}>
          Variables de entorno no encontradas
        </h2>
        <p style={{ fontSize: 13, lineHeight: 1.55, color: '#72243E' }}>
          Esta deploy no tiene las credenciales de Supabase. En Vercel, ve a
          Settings → Environment Variables y agrega estas dos (para Production,
          Preview y Development):
        </p>
        <pre
          style={{
            fontSize: 11,
            background: '#FBEAF0',
            padding: 10,
            borderRadius: 10,
            overflowX: 'auto',
            color: '#4B1528',
          }}
        >
{`VITE_SUPABASE_URL = https://nlqjbqgoeajytautpvni.supabase.co
VITE_SUPABASE_ANON_KEY = sb_publishable_UQgb6KeeYV0L-A9QNLRMTA_bDE-Z5jV`}
        </pre>
        <p style={{ fontSize: 12, color: '#72243E', marginTop: 10 }}>
          Despues de agregarlas, abre la pestana <b>Deployments</b>, abre el
          ultimo deploy y selecciona <b>Redeploy</b>. Las variables solo se
          inyectan cuando se compila.
        </p>
      </div>
    </div>
  );
}
