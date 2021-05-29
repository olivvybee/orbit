import { ResultDetailsProps } from './interfaces';

export const ResultDetails: React.FC<ResultDetailsProps> = ({
  itemDistribution,
}) => {
  return (
    <div className='accordion-item'>
      <h2 className='accordion-header'>
        <button
          className='accordion-button collapsed'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#whos-in-my-circles'>
          Who's in my circles?
        </button>
      </h2>

      <div id='whos-in-my-circles' className='accordion-collapse collapse'>
        <div className='accordion-body'>
          {itemDistribution.map((circle, index) => (
            <div className='mb-2'>
              <span className='fw-bold fs-5'>Circle {index + 1}</span>
              <div className='d-flex flex-column align-items-start'>
                {circle.map((friend) => (
                  <span className='fw-bold'>
                    {!!friend.url ? (
                      <a
                        className='link-primary'
                        href={friend.url}
                        target='_blank'>
                        @{friend.username}
                      </a>
                    ) : (
                      <span>@{friend.username}</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

ResultDetails.displayName = 'ResultDetails';
