
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
    feedback,
  } = employee;

  const name = `${firstName} ${lastName}`;
  const department = company?.department || 'N/A';
  const bio = company?.title || '';

  // ⬇️ Memoized average rating from feedback
  const feedbackRating = useMemo(() => {
    if (!feedback || feedback.length === 0) return null;

    const total = feedback.reduce((sum, item) => sum + (item.score || 0), 0);
    return Math.round(total / feedback.length);
  }, [feedback]);

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

        {feedbackRating !== null && (
          <div className="stars" aria-label={`Rating: ${feedbackRating} out of 5`}>
            <span className="label">Rating:</span>
            {renderStars(feedbackRating)}
          </div>
        )}

        {feedbackRating === null && (
          <div className="stars" aria-label="No feedback rating">
            <span className="label">Rating:</span> <em>No feedback</em>
          </div>
        )}

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

