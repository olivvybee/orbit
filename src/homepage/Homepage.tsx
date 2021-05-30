import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

export const Homepage = () => {
  const [rateLimitResetTime, setRateLimitResetTime] =
    useState<number | undefined>(undefined);
  const [username, setUsername] = useState<string>('');
  const history = useHistory();

  console.log(rateLimitResetTime, new Date().getTime());
  const now = new Date().getTime();
  const minutesUntilRefresh = rateLimitResetTime
    ? Math.ceil((rateLimitResetTime - now) / (60 * 1000))
    : 0;
  const minutesUnit = minutesUntilRefresh === 1 ? 'minute' : 'minutes';

  const canGenerate = !!username && username.length > 0;

  const goToResults = async () => {
    if (!username) {
      return;
    }

    let shouldNavigate: boolean;
    try {
      const response = await axios.get('/.netlify/functions/check-rate-limit');
      const { available, resetTime } = response.data;
      if (available) {
        setRateLimitResetTime(undefined);
        shouldNavigate = true;
      } else {
        setRateLimitResetTime(resetTime);
        shouldNavigate = false;
      }
    } catch (error) {
      setRateLimitResetTime(undefined);
      console.error(error);
      shouldNavigate = false;
    }

    if (!shouldNavigate) {
      return;
    }

    const santisedUsername = username.startsWith('@')
      ? username.slice(1)
      : username;
    history.push(`/twitter/${santisedUsername}`);
  };

  return (
    <div className='container d-flex flex-column align-items-center'>
      <div className='col-10 col-lg-6'>
        <h1>Orbit</h1>
        <span className='fs-3'>See who's in your twitter orbit</span>

        {rateLimitResetTime === undefined && (
          <div className='mt-4 mb-5 d-flex align-items-end w-100'>
            <div className='flex-fill'>
              <label className='form-label' htmlFor='twitter-username'>
                Twitter username
              </label>
              <input
                className='form-control'
                id='twitter-username'
                placeholder='@somebody'
                autoComplete='off'
                autoCapitalize='off'
                autoCorrect='off'
                spellCheck='false'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={(e) => {
                  if (canGenerate && e.key === 'Enter') {
                    goToResults();
                  }
                }}
              />
            </div>
            <button
              className='btn btn-primary ms-2'
              type='button'
              onClick={goToResults}
              disabled={!canGenerate}>
              Create
            </button>
          </div>
        )}

        {!!rateLimitResetTime && rateLimitResetTime > -1 && (
          <div className='mt-4 mb-5 d-flex flex-column border border-danger rounded-3 p-4 d-flex flex-column'>
            <span className='mb-3 fs-3'>Orbit is overloaded</span>

            <p>
              Twitter limits the number of requests Orbit can make in a given
              time period.
            </p>

            <p>
              The limit will reset in {minutesUntilRefresh} {minutesUnit}. After
              that, please refresh the page to try again.
            </p>
          </div>
        )}
      </div>

      <div className='mt-5 col-10 col-lg-6'>
        <h2>How does it work?</h2>
        <p>
          Orbit uses <strong>publicly available</strong> twitter data to
          determine who you interact with the most. That's why there's{' '}
          <strong>no need to log in</strong> or provide your password.
        </p>
        <p>
          It fetches a number of your most recent tweets and likes. Then, it
          counts the number of interactions you've had with each person and
          assigns them a score.
        </p>
        <table className='table table-sm'>
          <thead>
            <tr>
              <th scope='col'>Interaction</th>
              <th scope='col'>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Like</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Retweet</td>
              <td>1</td>
            </tr>
            <tr>
              <td>Quote tweet</td>
              <td>2</td>
            </tr>
            <tr>
              <td>Mention</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>
        <p>
          People are sorted into circles by their total scores, with higher
          scores closer to the inner circle.
        </p>
        <p>
          It's important to note that{' '}
          <strong>
            people who mention you or like your tweets are not counted
          </strong>
          . That information would require you to log in. Orbit only uses{' '}
          <strong>your</strong> tweets and likes.
        </p>
        <p>
          Orbit also <strong>can't see private (locked) accounts</strong>, so
          they won't appear in your circles.
        </p>
        <p>
          Once your data has loaded, you are free to adjust the layout by
          changing the number of circles, as well as how many people appear in
          each circle.
        </p>
        <p>
          Orbit was created by{' '}
          <a
            className='fw-bold'
            target='_blank'
            rel='noreferrer'
            href='https://twitter.com/olivvysaur'>
            @olivvysaur
          </a>{' '}
          out of frustration that other twitter circle generators weren't
          customisable. If you like it, maybe{' '}
          <a
            href='https://ko-fi.com/olivvysaur'
            target='_blank'
            rel='noreferrer'>
            buy her a coffee
          </a>
          .
        </p>
      </div>
    </div>
  );
};

Homepage.displayName = 'Homepage';
