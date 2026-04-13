import type { ProfileLink } from "../types";

interface LinkListProps {
  links: ProfileLink[];
}

const LinkList = ({ links }: LinkListProps) => (
  <section className="link-list" aria-label="Project and profile links">
    <div className="link-list-grid">
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.id}
            className="link-card"
            href={link.href}
            target="_blank"
            rel="noreferrer"
          >
            <span className="link-card-icon" aria-hidden="true">
              <Icon />
            </span>
            <span className="link-card-text">
              <strong>{link.label}</strong>
            </span>
          </a>
        );
      })}
    </div>
  </section>
);

export default LinkList;
