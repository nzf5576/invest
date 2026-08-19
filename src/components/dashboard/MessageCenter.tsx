import { messages } from '../../data/mockData';

export default function MessageCenter() {
  const unreadCount = messages.filter((m) => m.unread).length;

  return (
    <div className="sidebar-card">
      <div className="sidebar-card-title">
        ✉️ Message Center{' '}
        {unreadCount > 0 && <span className="unread-badge" aria-label={`${unreadCount} unread messages`}>{unreadCount} unread</span>}
      </div>
      <div role="list" aria-label="Messages">
        {messages.slice(0, 2).map((msg) => (
          <div className="msg-item" role="listitem" tabIndex={0} key={msg.id}>
            <div className="msg-dot" aria-hidden="true" />
            <div>
              <div className="msg-text">{msg.text}</div>
              <div className="msg-date">{msg.date}</div>
            </div>
          </div>
        ))}
      </div>
      <button className="btn-view-all">View All Messages ({messages.length}) ▼</button>
    </div>
  );
}
