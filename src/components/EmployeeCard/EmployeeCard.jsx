import React, { useMemo } from 'react';
import './EmployeeCard.css';

const EmployeeCard = ({
  employee,
  onView,
  onBookmark,
  onPromote,
  bookmarked,
  promoted,
}) => {
  const {
    id,
    firstName,
    lastName,
    email,
    age,
    image,
    company,
    rating,
  } = employee;

  const name = `${firstName} ${lastName}`;
  const department = company?.department || 'N/A';
  const bio = company?.title || '';

  // Fallback: generate random rating once per render
  const performanceRating = useMemo(() => {
    return rating !== undefined ? rating : Math.floor(Math.random() * 5) + 1;
  }, [rating]);

  const renderStars = (count) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={`star ${i < count ? 'active' : ''}`}>★</span>
    ));
  };

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    onBookmark(id);
  };

  const handlePromoteClick = (e) => {
    e.stopPropagation();
    onPromote(id);
  };

  return (
    <div className="employee-card" role="region" aria-label={`Employee card for ${name}`}>
      <img className="employee-image" src={image} alt={name} />

      <div className="employee-details">
        <h2>{name}</h2>
        <p className="email">{email}</p>
        <p><strong>Age:</strong> {age}</p>
        <p><strong>Dept:</strong> {department}</p>
        <p className="bio">{bio}</p>

        <div className="stars" aria-label={`Rating: ${performanceRating} out of 5`}>
          <span className="label">Rating:</span>
          {renderStars(performanceRating)}
        </div>

        <div className="actions">
          <button
            type="button"
            className="view"
            onClick={() => onView(id)}
            aria-label={`View details of ${name}`}
          >
            View
          </button>

          <button
            type="button"
            className={`bookmark ${bookmarked ? 'active' : ''}`}
            onClick={handleBookmarkClick}
            aria-pressed={bookmarked}
            aria-label={bookmarked ? `Remove ${name} from bookmarks` : `Add ${name} to bookmarks`}
          >
            {bookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>

          <button
            type="button"
            className={`promote ${promoted ? 'active' : ''}`}
            onClick={handlePromoteClick}
            aria-pressed={promoted}
            aria-label={promoted ? `Remove ${name} from promoted` : `Promote ${name}`}
          >
            {promoted ? 'Promoted' : 'Promote'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCard;
