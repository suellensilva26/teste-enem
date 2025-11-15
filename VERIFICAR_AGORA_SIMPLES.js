// COLE ESTE CÓDIGO NO CONSOLE (F12)
// Digite: allow pasting (se pedir)
// Depois cole este código e pressione Enter

console.log('🔍 VERIFICANDO LEADS...\n');

// 1. Verificar localStorage
console.log('1️⃣ LOCALSTORAGE:');
const leadData = localStorage.getItem('leadData');
if (leadData) {
  console.log('✅ leadData encontrado:', JSON.parse(leadData));
} else {
  console.log('❌ leadData NÃO encontrado');
}

const allLeads = localStorage.getItem('allLeads');
if (allLeads) {
  const parsed = JSON.parse(allLeads);
  console.log(`✅ allLeads: ${parsed.length} leads encontrados`);
  console.table(parsed);
} else {
  console.log('❌ allLeads NÃO encontrado');
}

// 2. Verificar Supabase
console.log('\n2️⃣ SUPABASE:');
fetch('https://tmhfqosgpmllabbizvxs.supabase.co/rest/v1/leads?select=*', {
  headers: {
    'apikey': 'sb_publishable_oMahW2x3-PlYe2V2au_wPQ_nEO_Vx5k',
    'Authorization': 'Bearer sb_publishable_oMahW2x3-PlYe2V2au_wPQ_nEO_Vx5k'
  }
})
.then(r => r.json())
.then(data => {
  if (data.length > 0) {
    console.log(`✅ ${data.length} leads encontrados no Supabase:`);
    console.table(data);
  } else {
    console.log('❌ NENHUM lead encontrado no Supabase!');
  }
})
.catch(err => console.error('❌ Erro:', err));

// 3. Verificar TODOS os itens do localStorage
console.log('\n3️⃣ TODOS OS ITENS DO LOCALSTORAGE:');
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  console.log(`${key}:`, localStorage.getItem(key));
}

