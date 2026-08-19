export default function GetGuidance() {
  return (
    <div className="sidebar-card">
      <div className="sidebar-card-title">🧭 Get Guidance</div>
      <p className="guidance-desc">
        Work with a licensed Wealth Specialist to be matched to a professionally managed portfolio solution.
      </p>
      <div className="guidance-phone">
        <span style={{ fontSize: 18 }} aria-hidden="true">📞</span>
        <div>
          <div className="guidance-phone-number">1-800-235-8396</div>
          <div className="guidance-phone-hours">Mon–Fri · 7:30 AM – 7:00 PM CT</div>
        </div>
      </div>
      <button className="btn-chat" aria-label="Start live chat with a Wealth Specialist">💬 Start Live Chat</button>
    </div>
  );
}
