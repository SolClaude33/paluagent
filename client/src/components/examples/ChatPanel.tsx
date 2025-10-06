import ChatPanel from '../ChatPanel'

export default function ChatPanelExample() {
  return (
    <div className="h-screen">
      <ChatPanel onMessageSent={(msg) => console.log('Message sent:', msg)} />
    </div>
  )
}
