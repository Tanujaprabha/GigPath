import { useState } from 'react'
import PageHeader from '../../components/ui/PageHeader'
import SurfaceCard from '../../components/ui/SurfaceCard'
import { quickPromptTemplates } from '../../data/mockData'
import { sendMessageToAI } from '../../ai/services/aiChatService'
import { useAppContext } from '../../context/AppContext'
import { useVoiceAssistant } from '../../hooks/useVoiceAssistant'
import { useTranslation } from 'react-i18next'

const generateId = (prefix) => `${Date.now()}-${prefix}-${Math.random()}`

export default function ChatPage() {
  const { t, i18n } = useTranslation()
  const { transactions, goals, recurringExpenses, totals, safeToSpendToday } = useAppContext()
  const [messages, setMessages] = useState([
    {
      id: 'msg-1',
      role: 'assistant',
      content: t('chat.welcomeMessage', 'Hi, I’m your GigPath assistant. Ask about cash flow, spending, or goal pacing.'),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [voiceError, setVoiceError] = useState('')

  const handleVoiceResult = (transcript) => {
    const fullText = (input ? `${input} ${transcript}` : transcript).trim()
    setInput(fullText)
    setVoiceError('')
    sendMessage(fullText)
  }

  const handleVoiceError = (errorMsg) => {
    setVoiceError(errorMsg)
  }

  const { isListening, supported, startListening, stopListening } = useVoiceAssistant({
    onResult: handleVoiceResult,
    onError: handleVoiceError,
    language: i18n.language
  })

  const sendMessage = async (content) => {
    if (!content.trim() || isLoading) {
      return
    }

    const userMsg = { id: generateId('user'), role: 'user', content }
    setMessages((current) => [...current, userMsg])
    setInput('')
    setIsLoading(true)

    const contextData = {
      transactions: transactions.slice(0, 15),
      goals,
      recurringExpenses,
      totals,
      safeToSpendToday
    }

    try {
      const response = await sendMessageToAI(content, contextData)
      setMessages((current) => [
        ...current,
        { id: generateId('assistant'), role: 'assistant', content: response },
      ])
    } catch (err) {
      console.error('Failed to send message to AI:', err)
      setMessages((current) => [
        ...current,
        { id: generateId('assistant'), role: 'assistant', content: t('chat.errorMessage', 'Sorry, I am having trouble connecting to AI.') },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    sendMessage(input)
  }

  return (
    <div className="page-stack">
      <PageHeader
        eyebrow="AI"
        title={t('chat.title', 'Chat')}
        description={t('chat.description', 'A real-time AI assistant for planning conversations using your actual data.')}
      />

      <SurfaceCard className="chat-shell">
        <div className="chat-log">
          {messages.map((message) => (
            <article key={message.id} className={`message message--${message.role}`}>
              <span>{message.role === 'assistant' ? t('chat.aiName', 'GigPath AI') : t('chat.you', 'You')}</span>
              <p>{message.content}</p>
            </article>
          ))}
        </div>

        <div className="quick-prompts">
          {quickPromptTemplates.map((prompt) => (
            <button key={prompt} type="button" className="chip" onClick={() => sendMessage(prompt)}>
              {prompt}
            </button>
          ))}
        </div>

        {voiceError && (
          <p style={{ color: 'var(--negative)', fontSize: '0.85rem', marginBottom: '10px' }}>
            {voiceError}
          </p>
        )}
        <form className="chat-form" onSubmit={handleSubmit}>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={t('chat.placeholder', 'Ask for a budget or spending suggestion...')}
          />
          {supported && (
            <button
              type="button"
              className={`button ${isListening ? 'button--outline' : 'button--secondary'}`}
              onClick={isListening ? stopListening : startListening}
              title={isListening ? t('chat.stopListening', 'Stop listening') : t('chat.startListening', 'Start voice input')}
              style={{
                padding: '0 16px',
                borderColor: isListening ? 'var(--negative)' : undefined,
                color: isListening ? 'var(--negative)' : undefined,
                background: isListening ? 'rgba(194, 65, 12, 0.05)' : undefined
              }}
            >
              {isListening ? t('chat.listening', '🛑 Listening...') : '🎤'}
            </button>
          )}
          <button type="submit" className="button button--primary" disabled={isLoading}>
            {isLoading ? t('chat.thinking', 'Thinking...') : t('chat.send', 'Send')}
          </button>
        </form>
      </SurfaceCard>
    </div>
  )
}
