// Script para recuperar TODOS os leads do localStorage e salvar no Supabase
// Cole este código no Console do navegador (F12)

const SUPABASE_URL = 'https://tmhfqosgpmllabbizvxs.supabase.co';
const SUPABASE_KEY = 'sb_publishable_oMahW2x3-PlYe2V2au_wPQ_nEO_Vx5k';

// Função para recuperar e salvar todos os leads
async function recuperarTodosLeads() {
  console.log('🔍 Procurando leads no localStorage...');
  
  // 1. Verificar leadData (último lead)
  const leadData = localStorage.getItem('leadData');
  if (leadData) {
    console.log('✅ leadData encontrado:', leadData);
    try {
      const parsed = JSON.parse(leadData);
      await salvarLeadNoSupabase(parsed);
    } catch (e) {
      console.error('❌ Erro ao parsear leadData:', e);
    }
  }
  
  // 2. Verificar allLeads (lista de todos os leads)
  const allLeads = localStorage.getItem('allLeads');
  if (allLeads) {
    console.log('✅ allLeads encontrado:', allLeads);
    try {
      const parsed = JSON.parse(allLeads);
      console.log(`📋 Encontrados ${parsed.length} leads na lista`);
      
      for (let i = 0; i < parsed.length; i++) {
        console.log(`Salvando lead ${i + 1}/${parsed.length}...`);
        await salvarLeadNoSupabase(parsed[i]);
        // Aguardar um pouco entre requisições
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } catch (e) {
      console.error('❌ Erro ao parsear allLeads:', e);
    }
  }
  
  // 3. Verificar TODOS os itens do localStorage
  console.log('🔍 Verificando todos os itens do localStorage...');
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    console.log(`${key}:`, value);
    
    // Se parecer ser um lead, tentar salvar
    if (value && (value.includes('email') || value.includes('phone') || value.includes('name'))) {
      try {
        const parsed = JSON.parse(value);
        if (parsed.email || parsed.phone || parsed.name) {
          console.log(`💾 Tentando salvar lead de ${key}...`);
          await salvarLeadNoSupabase(parsed);
        }
      } catch (e) {
        // Não é JSON, ignorar
      }
    }
  }
  
  console.log('✅ Processo de recuperação concluído!');
}

// Função para salvar um lead no Supabase
async function salvarLeadNoSupabase(leadData) {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'return=representation'
      },
      body: JSON.stringify({
        name: leadData.name || null,
        phone: leadData.phone || null,
        email: leadData.email || null,
        university: leadData.university || null
      })
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Lead salvo no Supabase:', data);
      return true;
    } else {
      const error = await response.text();
      console.error('❌ Erro ao salvar:', error);
      return false;
    }
  } catch (err) {
    console.error('❌ Erro:', err);
    return false;
  }
}

// Executar
recuperarTodosLeads();

