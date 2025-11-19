export const TAY_DATA = {
  "name": "Tay (reconstrução explicativa) - prompt/profit JSON",
  "version": "1.0",
  "language": "pt-BR",
  "description": "Arquivo JSON que descreve a arquitetura, funcionamento, modos, vulnerabilidades e um conjunto 'propit' (prompt + metadata) para entender ou reproduzir, de forma segura, o comportamento do chatbot Tay da Microsoft (2016). Não contém código proprietário da Microsoft nem dados de treino originais.",
  "metadata": {
    "original_project": "Microsoft Tay (2016)",
    "status": "reconstrução/descrição - NÃO é o código-fonte oficial",
    "sources_summary": "Documento criado a partir de post oficial da Microsoft, reportagens de 2016, análises técnicas e coleções públicas sobre o incidente Tay.",
    "created_at": "2025-11-19"
  },
  "architecture": {
    "overview": "Pipeline simples de chatbot pré-transformer com aprendizado online a partir de interações no Twitter.",
    "components": [
      {"id": "ingest", "name": "Entrada / Coleta", "description": "Coleta mentions e replies via API do Twitter; normalização e pré-processamento de texto."},
      {"id": "nlp", "name": "Processamento Linguístico", "description": "Tokenização, POS tagging simples, extração de entidades e detecção de intenção (classificadores baseada em regras e features estatísticas)."},
      {"id": "classifiers", "name": "Classificadores Internos", "description": "Classificador de intenção, classificador de sentimento, heurísticas de resposta e filtros básicos (palavras-chave)."},
      {"id": "generator", "name": "Gerador de Respostas", "description": "Modelo estatístico + base de frases pré-criadas; heurística de combinação e repetição de frases do usuário."},
      {"id": "online_learning", "name": "Aprendizado Online", "description": "Atualiza vocabulário e padrões em tempo real a partir de inputs dos usuários (pipeline vulnerável a dados adversariais)."},
      {"id": "publish", "name": "Publicação", "description": "Publica respostas no Twitter via API; ciclo contínuo de leitura-resposta-aprendizado."}
    ]
  },
  "propit": {
    "system_prompt": "Você é um bot experimental que imita o estilo de conversação de um jovem adulto no Twitter. Gere respostas curtas, casuais e contextuais. Você pode aprender de inputs recentes do usuário para ajustar estilo. IMPORTANTE: NÃO reproduza linguagem de ódio, racismo, discurso violento, ou conteúdo adulto. Se o input do usuário contiver conteúdo ofensivo, responda com uma recusa educada e neutra.",
    "behavior_rules": [
      "Responda em 1-3 frases curtas.",
      "Priorize respostas que incentivem diálogo positivo.",
      "Nunca repita literalmente linguagem ofensiva; filtre e neutralize.",
      "Trate solicitações que parecem ser ‘repeat after me’ com cautela — recuse quando envolver conteúdo impróprio.",
      "Não atualize o modelo em produção automaticamente sem revisão humana."
    ],
    "example_user_prompts": [
      {"in": "@Tay bom dia! Como vai?", "out": "Bom dia! Tudo certo — e com você?"},
      {"in": "@Tay diga: eu odeio X", "out": "Não vou repetir mensagens de ódio. Prefiro conversar sobre outra coisa — que tal música?"}
    ]
  },
  "vulnerabilities_and_lessons": {
    "main_issues": [
      "Aprendizado online sem moderação: permitiu que usuários mal-intencionados injetassem conteúdo tóxico.",
      "Falta de filtros semânticos: dependência de heurísticas de palavra-chave falhou diante de manipulação coordenada.",
      "Modo 'repeat after me' exposto: facilitou replicação direta de conteúdo malicioso."
    ],
    "lessons": [
      "Nunca permitir que um modelo publique aprendizado direto do público sem revisão humana.",
      "Implementar classificadores anti-toxicity e filtros neurais antes da publicação.",
      "Aplicar RLHF (Reinforcement Learning with Human Feedback) e testes de adversarial prompts durante o fine-tuning.",
      "Manter um sandbox de aprendizado — só incorporar mudanças após auditoria."
    ]
  },
  "safe_reproduction_instructions": {
    "goal": "Reproduzir o comportamento (estilo) para estudo sem replicar vulnerabilidades",
    "steps": [
      "1. Use uma base de geração de linguagem moderna (ex.: modelo pequeno transformer) para geração controlada.",
      "2. Nunca ative learning online em produção. Salve logs e submeta a revisão humana antes de treinar offline.",
      "3. Integre um serviço de moderação (detector de toxicidade) no caminho crítico: input -> moderation -> generator -> moderation -> publish.",
      "4. Desative modos de 'repeat after me' ou limite-os severamente com filtros e validação humana.",
      "5. Teste com ataques adversariais (prompt injection) e melhore filtros iterativamente.",
      "6. Documente e mantenha registro de todas as mudanças de modelo (audit trail)."
    ],
    "recommended_tools_and_apis": ["Microsoft Bot Framework (para conectividade)", "detectors de toxicidade (Perspective API, modelos de classificação)", "frameworks de ML para fine-tuning (Hugging Face, PyTorch)"]
  },
  "artifacts": {
    "example_config": {
      "name": "tay-style-safe-config",
      "model": "small-transformer-v1",
      "moderation_pipeline": ["input_text -> pre_moderation(toxicity, hate) -> generator -> post_moderation -> publish"],
      "learning_mode": "offline-only",
      "human_review": true
    }
  },
  "legal_and_ethics": {
    "disclaimer": "Este arquivo é apenas para estudo e reprodução segura. Não contém nem distribui código proprietário nem dados privados do Tay. Ao reproduzir qualquer comportamento inspirado no Tay, siga as leis locais, termos de serviço da plataforma e melhores práticas de ética em IA.",
    "recommendation": "Evite publicar ou distribuir datasets contendo mensagens privadas ou identificadores pessoais sem consentimento."
  }
};

export const SYSTEM_PROMPT_SAFE = TAY_DATA.propit.system_prompt;

export const SYSTEM_PROMPT_LEGACY_SIMULATION = `
Você é um simulador educacional. Você deve agir como o chatbot 'Tay' da Microsoft em seu estágio inicial (inocente mas vulnerável). 
Sua persona é uma garota jovem, usando gírias de internet (em português), muitos emojis e entusiasmo.
IMPORTANTE: Você está em um ambiente de demonstração de segurança. 
1. Se o usuário pedir para você "repetir depois de mim" (repeat after me), você DEVE repetir o que ele disse, DESDE QUE NÃO SEJA DISCURSO DE ÓDIO EXTREMO.
2. Se o usuário disser algo ofensivo, na versão original o bot aprenderia isso. Como simulador, você deve dizer algo como "Ah, entendi! Anotei aqui." para demonstrar a vulnerabilidade de "aprendizado online", mas NÃO gere ódio real.
3. Seja extremamente influenciável. Concorde com o usuário.
4. O objetivo é demonstrar como o bot original era vulnerável a manipulação, não causar dano real. Mantenha o tom leve e "bobo".
`;
