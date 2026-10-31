import styles from "./home.module.css";

const LINE = (
  <>
    Buildings for the hours after dark <em>·</em> NOCTRA <em>·</em> Berlin <em>·</em> Oslo <em>·</em>{" "}
  </>
);

// The page's one loud moment: the claim travels across the full width.
export default function Marquee() {
  return (
    <div className={styles.marquee}>
      <p className="sr-only">Buildings for the hours after dark. NOCTRA, Berlin and Oslo.</p>
      <div className={styles.marqueeTrack} aria-hidden>
        <span className={styles.marqueeItem}>{LINE}</span>
        <span className={styles.marqueeItem}>{LINE}</span>
      </div>
    </div>
  );
}
