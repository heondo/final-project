import React from 'react';
import PlaydatesListItem from './playdates-list-item';

export default function PlaydatesList(props) {
  const { dog, userID, userDogs, setDogProfileState } = props;
  if (!dog.playdates || dog.playdates.length <= 0) {
    return <h5 className="text-muted">No upcoming playdates currently scheduled</h5>;
  } else {
    return (
      <>
        {dog.playdates.map(playdate => {
          return (
            <PlaydatesListItem
              key={playdate.id}
              userID={userID}
              userDogs={userDogs}
              dog={dog}
              playdate={playdate}
              ownerID={dog.user_id}
              setDogProfileState={setDogProfileState} />
          );
        })}
      </>
    );
  }
}
