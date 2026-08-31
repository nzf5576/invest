import { useState } from 'react';
import { messages as initialMessages } from '../data/mockData';
import type { Message } from '../types';

export default function Messages() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [openId, setOpenId] = useState<string | null>(null);

  const unreadCount = messages.filter((m) => m.unread).length;

  function openMessage(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, unread: false } : m)));
  }

  return (
    <div className="main" role="main">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Message Center</h2>
          {unreadCount > 0 && <span className="unread-badge">{unreadCount} unread</span>}
        </div>

        <div role="list">
          {messages.map((msg) => {
            const isOpen = openId === msg.id;
            return (
              <div key={msg.id} role="listitem">
                <button
                  className="msg-item"
                  style={{ width: '100%', textAlign: 'left', border: msg.unread ? undefined : '1px solid var(--border-lt)', background: msg.unread ? undefined : '#fff' }}
                  onClick={() => openMessage(msg.id)}
                  aria-expanded={isOpen}
                >
                  <div className="msg-dot" style={{ background: msg.unread ? 'var(--red)' : 'var(--border)' }} aria-hidden="true" />
                  <div style={{ flex: 1 }}>
                    <div className="msg-text">{msg.text}</div>
                    <div className="msg-date">{msg.date}</div>
                  </div>
                </button>
                {isOpen && msg.body && (
                  <div style={{ padding: '10px 16px 16px 34px', fontSize: 13.5, color: 'var(--text-2)', lineHeight: 1.6 }}>
                    {msg.body}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
