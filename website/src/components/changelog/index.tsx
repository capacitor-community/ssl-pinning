import React from "react";
import clsx from "clsx";
import styles from "./index.module.css";
import Admonition from "@theme/Admonition";

type Change = {
  type: "fix" | "fix!" | "feat" | "feat!" | "chore" | "docs";
  description: string;
  issue_key: string;
  issue_url: string;
};

type Release = {
  version: string;
  semver: "patch" | "minor" | "major";
  published_at: string;
  info?: string;
  changes: Change[];
  notes?: string;
};

function changeTypeToLabel(type: Change["type"]) {
  switch (type) {
    case "fix":
      return "Fix";
    case "feat":
      return "Feature";
    case "fix!":
    case "feat!":
      return "Breaking Change";
    case "chore":
      return "Chore";
    case "docs":
      return "Documentation";
  }
}

export default function ChangeLog({ releases }: { releases: Release[] }) {
  if (!releases || !releases.length) {
    return <p>Unable to load releases.</p>;
  }
  return (
    <div className={styles["release-notes"]}>
      {releases.map((release) => (
        <section
          key={release.version}
          className={clsx(
            styles["release-note"],
            styles[`release-note-${release.semver}`]
          )}
        >
          <div className={styles["release-info"]}>
            <div className={styles["release-header"]}>
              <a
                className={styles["header-link"]}
                href={`#release-${release.version}`}
              >
                <h2 id={`release-${release.version}`}>
                  <span className={styles["release-version"]}>
                    {release.version}
                  </span>
                </h2>
              </a>
              <span className={styles["release-badge"]}>{release.semver}</span>
            </div>
            <div className={styles["release-published"]}>
              <h3>{release.published_at}</h3>
            </div>
            <div>
              {release.info && (
                <div dangerouslySetInnerHTML={{ __html: release.info }} />
              )}
              <h3>What's Changed</h3>
              <ul>
                {release.changes.map((change, i) => (
                  <li key={i}>
                    <strong>{changeTypeToLabel(change.type)}:</strong>{" "}
                    <span
                      dangerouslySetInnerHTML={{ __html: change.description }}
                    />{" "}
                    {change.issue_url && change.issue_key && (
                      <span className={styles["issue-link"]}>
                        (<a href={change.issue_url}>{change.issue_key}</a>)
                      </span>
                    )}
                  </li>
                ))}
              </ul>
              {release.notes && (
                <Admonition type="info" title="Additional Notes">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: release.notes,
                    }}
                  />
                </Admonition>
              )}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
