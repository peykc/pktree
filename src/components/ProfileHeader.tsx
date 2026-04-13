import type { ReactNode } from "react";

interface ProfileHeaderProps {
  name: string;
  tagline?: ReactNode;
  bio?: ReactNode;
  avatarUrl: string;
}

const ProfileHeader = ({ name, tagline, bio, avatarUrl }: ProfileHeaderProps) => (
  <header className="profile-header">
    <img
      className="profile-avatar"
      src={avatarUrl}
      alt={`${name} profile`}
      width={96}
      height={96}
      loading="eager"
    />
    {tagline && <p className="profile-tagline">{tagline}</p>}
    <h1>{name}</h1>
    {bio && <p className="profile-bio">{bio}</p>}
  </header>
);

export default ProfileHeader;
