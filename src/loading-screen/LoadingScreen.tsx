export const LoadingScreen = () => (
  <div className='d-flex flex-column align-items-center justify-content-center text-center'>
    <div className='border border-primary rounded-3 p-4'>
      <div className='mb-3'>
        <div className='spinner-border text-primary me-4'>
          <span className='visually-hidden'>Loading...</span>
        </div>
        <span className='fs-1'>Loading...</span>
      </div>

      <span className='fs-4'>Fetching the data can take a few seconds</span>
    </div>
  </div>
);

LoadingScreen.displayName = 'LoadingScreen';
