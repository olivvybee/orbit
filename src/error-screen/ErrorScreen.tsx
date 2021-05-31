export const ErrorScreen: React.FC = ({ children }) => (
  <div className='container d-flex flex-column align-items-center'>
    <div className='col-10 col-lg-6 d-flex flex-column align-items-center justify-content-center text-center'>
      <div className='border border-danger rounded-3 p-4 d-flex flex-column'>
        <span className='mb-3 fs-1'>Something went wrong</span>

        <span className='mb-2 fs-4'>{children}</span>

        <a href='/'>Return home</a>
      </div>
    </div>
  </div>
);

ErrorScreen.displayName = 'ErrorScreen';
