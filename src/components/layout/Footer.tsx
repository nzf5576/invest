export default function Footer() {
  return (
    <footer className="site-footer" role="contentinfo">
      <p>© 2026 Victory Capital Management Inc. All rights reserved.</p>
      <p style={{ marginTop: 6 }}>
        <a href="#">Privacy Policy</a> &nbsp;·&nbsp; <a href="#">Terms of Use</a> &nbsp;·&nbsp;{' '}
        <a href="#">Accessibility</a> &nbsp;·&nbsp; <a href="#">Disclosures</a>
      </p>
      <p style={{ marginTop: 8, fontSize: 11, opacity: 0.6 }}>
        Investing involves risk, including possible loss of principal. Prototype only — does not represent actual account data.
      </p>
    </footer>
  );
}
