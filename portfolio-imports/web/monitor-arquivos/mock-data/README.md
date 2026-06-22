# Dados fictícios — HT Monitor Demo

Todos os arquivos desta pasta contêm **dados simulados** para a demonstração de portfólio. Nenhum dado real de clientes, servidores ou credenciais foi incluído.

## Arquivos

| Arquivo | Representa |
|---------|------------|
| `status.json` | Status em tempo real dos serviços (monitor, rename, move, banco) |
| `settings.json` | Configurações completas do sistema (MySQL, pastas, padrões, regras) |
| `rename-history.json` | Histórico de renomeações simuladas |
| `move-history.json` | Histórico de movimentações simuladas |
| `errors.json` | Log centralizado de erros fictícios |
| `rename-patterns.json` | Padrões de nomenclatura e variáveis built-in |
| `move-rules.json` | Regras de movimentação origem → destino |

## Implementação na demo

Na versão interativa (`source/` e `build/`), estes dados são carregados pelo arquivo `assets/js/demo-api.js` e persistidos em `localStorage` quando o visitante altera configurações.

Para restaurar o estado inicial, use o botão **"Reiniciar demo"** no banner superior ou execute no console:

```javascript
localStorage.removeItem('htmonitor_demo_state_v1');
location.reload();
```

## Personagens fictícios usados

- Cliente Alpha, Cliente Beta, Cliente Gamma
- Servidor `servidor-demo`
- Banco `file_monitor_demo` em `demo-mysql.empresa-demo.local`
