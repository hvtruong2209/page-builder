export const LoadingPage = () => {
  return (
    <div className="loading-page">
      <div className="loading-page__content">
        <div className="loading-page__spinner">
          <div className="loading-page__ring"></div>
          <div className="loading-page__ring"></div>
          <div className="loading-page__ring"></div>
        </div>
        <h2 className="loading-page__title">Loading ...</h2>
        <p className="loading-page__subtitle">Please wait a moment.</p>
        <div className="loading-page__dots">
          <span className="loading-page__dot"></span>
          <span className="loading-page__dot"></span>
          <span className="loading-page__dot"></span>
        </div>
      </div>
    </div>
  );
};
