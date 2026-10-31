"use client";

import { useState } from "react";
import styles from "@/app/contact/contact.module.css";

const KINDS = ["A house", "An apartment or interior", "A public building", "Something else"];

// The form is printed like a reservation card. There is no form backend, so sending
// opens the visitor's email with everything they wrote already filled in.
export default function ReservationCard() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    const subject = `Commission: ${get("kind") || "a new project"}${get("site") ? ` in ${get("site")}` : ""}`;
    const body = [
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      `Site: ${get("site")}`,
      `What: ${get("kind")}`,
      `When: ${get("when")}`,
      "",
      get("message"),
    ].join("\n");
    window.location.href = `mailto:contact@noctra.arch?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <form
      className={styles.card}
      onSubmit={onSubmit}
      action="mailto:contact@noctra.arch"
      method="post"
      encType="text/plain"
      aria-labelledby="card-title"
    >
      <h2 id="card-title" className={styles.cardTitle}>Reservation card</h2>
      <p className={styles.cardNote}>The studio, at your service</p>

      <div className={styles.fields}>
        <div className="field">
          <label htmlFor="name">Your name</label>
          <input id="name" name="name" autoComplete="name" required placeholder="Ada Lovelace…" />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" spellCheck={false} required placeholder="ada@example.com…" />
        </div>
        <div className="field">
          <label htmlFor="site">Where is the site?</label>
          <input id="site" name="site" autoComplete="off" placeholder="Sintra, Portugal…" />
        </div>
        <div className="field">
          <label htmlFor="kind">What would you like to build?</label>
          <select id="kind" name="kind" defaultValue={KINDS[0]}>
            {KINDS.map((k) => (
              <option key={k}>{k}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="when">When would you like to start?</label>
          <input id="when" name="when" autoComplete="off" placeholder="Spring 2027…" />
        </div>
        <div className={`field ${styles.wide}`}>
          <label htmlFor="message">Tell us about it</label>
          <textarea id="message" name="message" rows={4} placeholder="The plot, the people, the light you want at night…" />
        </div>
      </div>

      <div className={styles.cardFoot}>
        <button type="submit" className="btn-brass">
          Send to the studio <span aria-hidden>→</span>
        </button>
        <p className={styles.cardStatus} aria-live="polite">
          {sent ? "Your email app should now be open with the card filled in." : ""}
        </p>
      </div>
    </form>
  );
}
