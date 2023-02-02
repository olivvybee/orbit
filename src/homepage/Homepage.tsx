export const Homepage = () => (
  <div className="container d-flex flex-column align-items-center">
    <div className="col-10 col-lg-6">
      <h1>Orbit</h1>
      <span className="fs-3">See who's in your twitter orbit</span>

      <div className="border border-primary p-3 rounded-3 mt-5 mb-5">
        <strong>Orbit has closed down</strong>
        <br />
        As of February 9, the twitter API, which powered orbit, is no longer
        free.
        <br />
        Orbit doesn't make enough money to cover costs, so I cannot keep it
        going if the API is no longer free. Therefore orbit had to be shut down.
        <br />
        Thank you for using orbit, and extra thanks if you are one of the people
        who ever{' '}
        <a href="https://ko-fi.com/olivvybee" target="_blank" rel="noreferrer">
          donated
        </a>
        .
      </div>

      <p>
        Orbit was created by{' '}
        <a
          className="fw-bold"
          target="_blank"
          rel="noreferrer"
          href="https://tech.lgbt/@olivvybee">
          @olivvybee
        </a>{' '}
        out of frustration that other twitter circle generators weren't
        customisable.
      </p>
      <p>
        Now that twitter is determined to become a hostile social media
        platform, she has moved to Mastodon, and recommends you do as well.
      </p>
    </div>
  </div>
);

Homepage.displayName = 'Homepage';
