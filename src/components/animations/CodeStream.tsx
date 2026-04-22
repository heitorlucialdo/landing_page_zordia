import { useState, useEffect, useRef, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import type { CodeSnippet, CodeToken, TokenType } from '@/types'

const TOKEN_COLORS: Record<TokenType, string> = {
  keyword:  'text-purple-400',
  string:   'text-green-400',
  function: 'text-blue-400',
  operator: 'text-[#CC00FF]',
  plain:    'text-gray-300',
  comment:  'text-gray-500',
}

const SNIPPETS: CodeSnippet[] = [
  {
    title: 'whatsapp-agent.ts',
    language: 'typescript',
    tokens: [
      { text: 'const',       type: 'keyword'   },
      { text: ' agent ',     type: 'plain'     },
      { text: '=',           type: 'operator'  },
      { text: ' new ',       type: 'plain'     },
      { text: 'WhatsAppAgent', type: 'function'},
      { text: '({\n  ',      type: 'plain'     },
      { text: 'name',        type: 'plain'     },
      { text: ': ',          type: 'operator'  },
      { text: "'ZordBot'",   type: 'string'    },
      { text: ',\n  ',       type: 'plain'     },
      { text: 'model',       type: 'plain'     },
      { text: ': ',          type: 'operator'  },
      { text: "'gpt-4o'",    type: 'string'    },
      { text: ',\n  ',       type: 'plain'     },
      { text: 'mode',        type: 'plain'     },
      { text: ': ',          type: 'operator'  },
      { text: "'24/7'",      type: 'string'    },
      { text: ',\n})\n\n',   type: 'plain'     },
      { text: 'await ',      type: 'keyword'   },
      { text: 'agent',       type: 'plain'     },
      { text: '.',           type: 'operator'  },
      { text: 'start',       type: 'function'  },
      { text: '()',          type: 'plain'     },
    ],
  },
  {
    title: 'webhook-ai.ts',
    language: 'typescript',
    tokens: [
      { text: '// ',              type: 'comment'  },
      { text: 'Webhook IA integrado\n', type: 'comment' },
      { text: 'async ',           type: 'keyword'  },
      { text: 'function ',        type: 'keyword'  },
      { text: 'handleLead',       type: 'function' },
      { text: '(payload: ',       type: 'plain'    },
      { text: 'Lead',             type: 'function' },
      { text: ') {\n  ',          type: 'plain'    },
      { text: 'const ',           type: 'keyword'  },
      { text: 'score ',           type: 'plain'    },
      { text: '=',                type: 'operator' },
      { text: ' await ',          type: 'keyword'  },
      { text: 'qualify',          type: 'function' },
      { text: '(payload)\n  ',    type: 'plain'    },
      { text: 'if',               type: 'keyword'  },
      { text: ' (score ',         type: 'plain'    },
      { text: '>',                type: 'operator' },
      { text: ' 0.8) {\n    ',    type: 'plain'    },
      { text: 'await ',           type: 'keyword'  },
      { text: 'crm',              type: 'plain'    },
      { text: '.',                type: 'operator' },
      { text: 'addHotLead',       type: 'function' },
      { text: '(payload)\n  }\n}', type: 'plain'   },
    ],
  },
  {
    title: 'lead-crm.ts',
    language: 'typescript',
    tokens: [
      { text: 'const ',           type: 'keyword'  },
      { text: 'pipeline ',        type: 'plain'    },
      { text: '=',                type: 'operator' },
      { text: ' await ',          type: 'keyword'  },
      { text: 'crm',              type: 'plain'    },
      { text: '.',                type: 'operator' },
      { text: 'getPipeline',      type: 'function' },
      { text: '({\n  ',           type: 'plain'    },
      { text: 'status',           type: 'plain'    },
      { text: ': ',               type: 'operator' },
      { text: "'qualified'",      type: 'string'   },
      { text: ',\n  ',            type: 'plain'    },
      { text: 'source',           type: 'plain'    },
      { text: ': ',               type: 'operator' },
      { text: "'whatsapp'",       type: 'string'   },
      { text: ',\n})\n\n',        type: 'plain'    },
      { text: 'for',              type: 'keyword'  },
      { text: ' (const lead of pipeline) {\n  ', type: 'plain' },
      { text: 'await ',           type: 'keyword'  },
      { text: 'sdr',              type: 'plain'    },
      { text: '.',                type: 'operator' },
      { text: 'contact',          type: 'function' },
      { text: '(lead)\n}',        type: 'plain'    },
    ],
  },
  {
    title: 'sdr-pipeline.ts',
    language: 'typescript',
    tokens: [
      { text: '// ',              type: 'comment'  },
      { text: 'SDR automatizado\n', type: 'comment' },
      { text: 'const ',           type: 'keyword'  },
      { text: 'sdr ',             type: 'plain'    },
      { text: '=',                type: 'operator' },
      { text: ' new ',            type: 'plain'    },
      { text: 'SDRAgent',         type: 'function' },
      { text: '({\n  ',           type: 'plain'    },
      { text: 'voice',            type: 'plain'    },
      { text: ': ',               type: 'operator' },
      { text: 'true',             type: 'keyword'  },
      { text: ',\n  ',            type: 'plain'    },
      { text: 'qualify',          type: 'plain'    },
      { text: ': ',               type: 'operator' },
      { text: 'true',             type: 'keyword'  },
      { text: ',\n  ',            type: 'plain'    },
      { text: 'handoff',          type: 'plain'    },
      { text: ': ',               type: 'operator' },
      { text: "'human'",          type: 'string'   },
      { text: ',\n})\n\n',        type: 'plain'    },
      { text: 'await ',           type: 'keyword'  },
      { text: 'sdr',              type: 'plain'    },
      { text: '.',                type: 'operator' },
      { text: 'startCampaign',    type: 'function' },
      { text: '()',               type: 'plain'    },
    ],
  },
]

function getTotalChars(tokens: CodeToken[]): number {
  return tokens.reduce((sum, t) => sum + t.text.length, 0)
}

function renderTokens(tokens: CodeToken[], charIndex: number): ReactNode {
  let rendered = 0
  return tokens.map((token, i) => {
    if (rendered >= charIndex) return null
    const available = charIndex - rendered
    const slice = token.text.slice(0, available)
    rendered += token.text.length
    return (
      <span key={i} className={TOKEN_COLORS[token.type]}>
        {slice}
      </span>
    )
  })
}

type Phase = 'typing' | 'waiting' | 'fading'

export default function CodeStream() {
  const [snippetIndex, setSnippetIndex] = useState(0)
  const [charIndex,    setCharIndex]    = useState(0)
  const [visible,      setVisible]      = useState(true)
  const [phase,        setPhase]        = useState<Phase>('typing')

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const currentSnippet = SNIPPETS[snippetIndex]

  useEffect(() => {
    if (!currentSnippet) return

    const totalChars = getTotalChars(currentSnippet.tokens)

    if (phase === 'typing') {
      if (charIndex < totalChars) {
        timeoutRef.current = setTimeout(
          () => setCharIndex((c) => c + 1),
          30 + Math.random() * 20
        )
      } else {
        setPhase('waiting')
      }
    } else if (phase === 'waiting') {
      timeoutRef.current = setTimeout(() => setPhase('fading'), 1500)
    } else if (phase === 'fading') {
      setVisible(false)
      timeoutRef.current = setTimeout(() => {
        setSnippetIndex((i) => (i + 1) % SNIPPETS.length)
        setCharIndex(0)
        setPhase('typing')
        setVisible(true)
      }, 400)
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [phase, charIndex, currentSnippet])

  return (
    <motion.div
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl overflow-hidden w-full max-w-lg"
      style={{ border: '1px solid rgba(204,0,255,0.4)' }}
    >
      <div className="flex items-center gap-2 px-4 py-3 bg-[#1a1a1a] border-b border-white/5">
        <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
        <span className="w-3 h-3 rounded-full bg-[#28CA41]" />
        <span className="ml-auto text-xs text-white/40 font-mono">
          {currentSnippet?.title ?? ''}
        </span>
      </div>
      <div className="p-5 bg-[#0d0d0d] min-h-[200px] font-mono text-[13px] leading-6 whitespace-pre-wrap">
        {currentSnippet ? renderTokens(currentSnippet.tokens, charIndex) : null}
        <span className="inline-block w-[2px] h-[1em] bg-brand-neon animate-blink align-middle ml-px" />
      </div>
    </motion.div>
  )
}
