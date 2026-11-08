import Tags from "./Tags";
import styles from "./Timeline.module.css";

export default function Timeline({ items }) {
  return (
    <ol className={styles.timeline}>
      {items.map((job) => (
        <li key={`${job.company}-${job.start}`} className={styles.item}>
          <div className={styles.dot} aria-hidden="true" />
          <div className="card">
            <p className={`${styles.dates} muted`}>
              {job.start} – {job.end}
              {job.location && ` · ${job.location}`}
            </p>
            <h3 className={styles.role}>
              {job.role} <span className="muted">at {job.company}</span>
            </h3>
            <ul className={styles.highlights}>
              {job.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
            <Tags items={job.tech} />
          </div>
        </li>
      ))}
    </ol>
  );
}
