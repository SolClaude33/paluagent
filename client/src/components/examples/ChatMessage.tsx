import ChatMessage from '../ChatMessage'

export default function ChatMessageExample() {
  return (
    <div className="space-y-4 p-4 bg-background">
      <ChatMessage
        id="1"
        message="Hello Max! How are you today?"
        sender="user"
        timestamp="2:30 PM"
        username="Alice"
      />
      <ChatMessage
        id="2"
        message="Hello! I'm doing great, thanks for asking! I'm here to help you with anything you need. What can I do for you today?"
        sender="max"
        timestamp="2:30 PM"
      />
      <ChatMessage
        id="3"
        message="Can you tell me about BNB Chain?"
        sender="user"
        timestamp="2:31 PM"
        username="Bob"
      />
    </div>
  )
}
