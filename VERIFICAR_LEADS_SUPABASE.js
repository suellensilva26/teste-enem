// Script para VERIFICAR e RECUPERAR leads do Supabase
// Cole este código no Console do navegador (F12)

const SUPABASE_URL = 'https://tmhfqosgpmllabbizvxs.supabase.co';
const SUPABASE_KEY = 'sb_publishable_oMahW2x3-PlYe2V2au_wPQ_nEO_Vx5k';

// Função para VERIFICAR leads no Supabase
async function verificarLeadsNoSupabase() {
  console.log('🔍 Verificando leads no Supabase...');
  
  try {
    // Verificar tabela 'leads'
    const response = await fetch(`${SUPABASE_URL}/rest/v1/leads?select=*`, {
      method: 'GET',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log(`✅ Encontrados ${data.length} leads na tabela 'leads':`);
      console.table(data);
      
      if (data.length === 0) {
        console.log('❌ Nenhum lead encontrado na tabela!');
        console.log('🔍 Verificando localStorage...');
        verificarLocalStorage();
      }
    } else {
      const error = await response.text();
      console.error('❌ Erro ao buscar leads:', error);
    }
  } catch (err) {
    console.error('❌ Erro:', err);
  }
}

// Função para verificar localStorage
function verificarLocalStorage() {
  console.log('🔍 Verificando localStorage...');
  
  // Verificar leadData
  const leadData = localStorage.getItem('leadData');
  if (leadData) {
    console.log('✅ leadData encontrado:', JSON.parse(leadData));
  } else {
    console.log('❌ leadData não encontrado');
  }
  
  // Verificar allLeads
  const allLeads = localStorage.getItem('allLeads');
  if (allLeads) {
    const parsed = JSON.parse(allLeads);
    console.log(`✅ allLeads encontrado: ${parsed.length} leads`);
    console.table(parsed);
  } else {
    console.log('❌ allLeads não encontrado');
  }
  
  // Verificar TODOS os itens
  console.log('📋 Todos os itens do localStorage:');
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    console.log(`${key}:`, value);
  }
}

// Executar
verificarLeadsNoSupabase();

